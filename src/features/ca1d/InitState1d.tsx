//

import React from "react";

import {
    faEquals,
    faRotate,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    DistributionType,
    reloadInitState,
    selectClusterSize,
    selectDistribution,
    selectInitState,
    selectLiveCells,
    setClusterSize,
    setDistribution,
    setLiveCells,
    toggleInitStateCell,
} from "src/app/slices/initState";
import { Box, FormControlLabel, Grid, RadioGroup } from "@mui/material";
import { StyledRadio } from "src/components/RadioGroup";
import { StyledInput, StyledSlider } from "src/components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectNumCells } from "src/app/slices/numCells";

export default function InitState1d() {
    //
    return (
        <Grid container rowSpacing={2}>
            {/* row 1 */}
            <Grid item container columnSpacing={3}>
                {/* live cells */}
                <Grid item md>
                    <LiveCells />
                </Grid>
                {/* clusters */}
                <Grid item md>
                    <Cluster />
                </Grid>
            </Grid>
            {/* row 2 */}
            <Grid item container>
                {/* initial state cells */}
                <Grid item xs={11}>
                    <Cells />
                </Grid>
                {/* reload button */}
                <Grid item xs={1}>
                    <ReloadBtn />
                </Grid>
            </Grid>
        </Grid>
    );
}

function LiveCells() {
    //
    const numCells = useAppSelector(selectNumCells);
    const liveCells = useAppSelector(selectLiveCells);

    const dispatch = useAppDispatch();

    return (
        <Grid container className="cap-component-container">
            <Grid container>
                <Box className="cap-component-label ms-2 my-2">Live cells</Box>
            </Grid>

            <Grid item md={9}>
                <StyledSlider
                    defaultValue={1}
                    min={1}
                    max={numCells}
                    value={liveCells}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => dispatch(setLiveCells(value as number))}
                    marks={[
                        {
                            value: 1,
                            label: 1,
                        },
                        {
                            value: numCells * (1 / 4),
                            label: "25%",
                        },
                        {
                            value: numCells * (1 / 2),
                            label: "50%",
                        },
                        {
                            value: numCells * (3 / 4),
                            label: "75%",
                        },
                        {
                            value: numCells,
                            label: numCells,
                        },
                    ]}
                />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                <StyledInput
                    className="h-fit"
                    value={liveCells}
                    size="small"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(
                            setLiveCells(
                                event.target.value === ""
                                    ? 0
                                    : Number(event.target.value)
                            )
                        )
                    }
                    onBlur={() => {
                        if (liveCells < 0) {
                            dispatch(setLiveCells(0));
                        } else if (liveCells > numCells) {
                            dispatch(setLiveCells(numCells));
                        }
                    }}
                    inputProps={{
                        step: 5,
                        min: 1,
                        max: numCells,
                        type: "number",
                    }}
                    disableUnderline
                />
            </Grid>
        </Grid>
    );
}

function Cluster() {
    //
    const clusterSize = useAppSelector(selectClusterSize);
    const distribution = useAppSelector(selectDistribution);
    const dispatch = useAppDispatch();

    return (
        <Grid container className="cap-component-container">
            <Grid container>
                <Box className="cap-component-label ms-2 my-2">Clusters</Box>
            </Grid>

            <Grid item md={9}>
                <StyledSlider
                    defaultValue={1}
                    min={1}
                    max={30}
                    value={clusterSize}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => dispatch(setClusterSize(value as number[]))}
                    marks={[
                        { value: 1, label: 1 },
                        { value: 5, label: 5 },
                        { value: 10, label: 10 },
                        { value: 15, label: 15 },
                        { value: 20, label: 20 },
                        { value: 25, label: 25 },
                        { value: 30, label: 30 },
                    ]}
                />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                <RadioGroup
                    aria-labelledby="cluster-dist-radio-group-label"
                    defaultValue="even"
                    name="cluster-dist-radio-group"
                    row
                    value={distribution}
                    onChange={(event: React.ChangeEvent, value: string) =>
                        dispatch(setDistribution(value as DistributionType))
                    }
                >
                    <FormControlLabel
                        key={1}
                        value="even"
                        control={<StyledRadio />}
                        label={<FontAwesomeIcon icon={faEquals} size="lg" />}
                    />
                    <FormControlLabel
                        key={2}
                        value="rand"
                        control={<StyledRadio />}
                        label={<FontAwesomeIcon icon={faShuffle} size="lg" />}
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

function Cells() {
    //
    const initState = useAppSelector(selectInitState);

    const dispatch = useAppDispatch();

    return (
        <div className="cap-component-container cells-container">
            {initState.map((e, i) => (
                <Box
                    key={i}
                    className={`cap-cell ${e ? "on" : "off"}`}
                    onClick={() => dispatch(toggleInitStateCell(i))}
                />
            ))}
        </div>
    );
}

function ReloadBtn() {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className="h-full relative">
            <Button
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                icon={faRotate}
                size="2xl"
                tooltipLabel="Reload init state"
                onClick={() => dispatch(reloadInitState())}
            />
        </Box>
    );
}
