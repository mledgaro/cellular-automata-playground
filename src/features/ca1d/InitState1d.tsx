//

import React, { useEffect } from "react";

import {
    faEquals,
    faRotate,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";

import {
    StateObjHook,
    useAppDispatch,
    useAppSelector,
    useStateObj,
} from "src/app/hooks";
import {
    DistributionType,
    selectInitState,
    setInitState,
    toggleInitStateCell,
} from "src/app/slices/initState";
import { Box, FormControlLabel, Grid, RadioGroup } from "@mui/material";
import { StyledRadio } from "src/components/RadioGroup";
import { StyledInput, StyledSlider } from "src/components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectNumCells } from "src/app/slices/numCells";

export default function InitState1d() {
    //
    const liveCells = useStateObj<number>(1);
    const clusterMin = useStateObj<number>(1);
    const clusterMax = useStateObj<number>(1);
    const clusterDist = useStateObj<DistributionType>("even");

    return (
        <Grid container rowSpacing={2}>
            {/* row 1 */}
            <Grid item container columnSpacing={3}>
                {/* live cells */}
                <Grid item md>
                    <LiveCells state={liveCells} />
                </Grid>
                {/* clusters */}
                <Grid item md>
                    <Cluster
                        minState={clusterMin}
                        maxState={clusterMax}
                        distState={clusterDist}
                    />
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
                    <ReloadBtn
                        liveCells={liveCells.get}
                        clusterMin={clusterMin.get}
                        clusterMax={clusterMax.get}
                        clusterDist={clusterDist.get}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

function LiveCells({ state }: { state: StateObjHook<number> }) {
    //
    const numCells = useAppSelector(selectNumCells);

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
                    value={state.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state.set(value as number)}
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
                    value={state.get}
                    size="small"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        state.set(
                            event.target.value === ""
                                ? 0
                                : Number(event.target.value)
                        )
                    }
                    onBlur={() => {
                        if (state.get < 0) {
                            state.set(0);
                        } else if (state.get > numCells) {
                            state.set(numCells);
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

function Cluster({
    minState,
    maxState,
    distState,
}: {
    minState: StateObjHook<number>;
    maxState: StateObjHook<number>;
    distState: StateObjHook<DistributionType>;
}) {
    //
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
                    value={[minState.get, maxState.get]}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => {
                        let [min, max] = value as number[];
                        minState.set(min);
                        maxState.set(max);
                    }}
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
                    value={distState.get}
                    onChange={(event: React.ChangeEvent, value: string) =>
                        distState.set(value as DistributionType)
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

function ReloadBtn({
    liveCells,
    clusterMin,
    clusterMax,
    clusterDist,
}: {
    liveCells: number;
    clusterMin: number;
    clusterMax: number;
    clusterDist: DistributionType;
}) {
    //
    const dispatch = useAppDispatch();

    const params = {
        numCells: useAppSelector(selectNumCells),
        liveCells: liveCells,
        groupMinSize: clusterMin,
        groupMaxSize: clusterMax,
        distribution: clusterDist,
    };

    useEffect(() => {
        dispatch(setInitState(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Box className="h-full relative">
            <Button
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                icon={faRotate}
                size="2xl"
                tooltipLabel="Reload init state"
                onClick={() => dispatch(setInitState(params))}
            />
        </Box>
    );
}
