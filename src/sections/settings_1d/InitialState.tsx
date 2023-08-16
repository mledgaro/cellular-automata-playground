//

import React, { useEffect } from "react";

import {
    faEquals,
    faHashtag,
    faPercent,
    faRotate,
    faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { DistributionType } from "src/app/slices/distributionType";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { LiveCellsType, setLiveCellsType } from "src/app/slices/liveCellsType";
import { setLiveCells } from "src/app/slices/liveCells";
import { setGroupMaxSize } from "src/app/slices/groupMaxSize";
import { setGroupMinSize } from "src/app/slices/groupMinSize";
import { setDistributionType } from "src/app/slices/distributionType";
import { setInitState } from "src/app/slices/initState";
import {
    Box,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
} from "@mui/material";
import { StyledRadio } from "src/components/RadioGroup";
import CustomSlider from "src/components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CellsSet } from "src/features/InitialStateCells";

export default function InitialState() {
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
                    <CellsSet />
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
    const numCells = useAppSelector((state) => state.numCells.value);
    const type = useAppSelector((state) => state.liveCellsType.value);
    const liveCells = useAppSelector((state) => state.liveCells.value);

    const dispatch = useAppDispatch();

    return (
        <Box className="cap-component-container p-2">
            <FormLabel
                id="live-cells-type-radio-group-label"
                className="cap-component-label"
            >
                Live cells
            </FormLabel>
            <RadioGroup
                aria-labelledby="live-cells-type-radio-group-label"
                defaultValue="num"
                name="live-cells-type-radio-group"
                row
                value={type}
                onChange={(event: React.ChangeEvent, value: string) =>
                    dispatch(setLiveCellsType(value as LiveCellsType))
                }
            >
                <FormControlLabel
                    key={1}
                    value="num"
                    control={<StyledRadio />}
                    label={<FontAwesomeIcon icon={faHashtag} size="xl" />}
                />
                <FormControlLabel
                    key={2}
                    value="perc"
                    control={<StyledRadio />}
                    label={<FontAwesomeIcon icon={faPercent} size="xl" />}
                />
            </RadioGroup>

            <CustomSlider
                minVal={1}
                maxVal={type === "num" ? numCells : 100}
                defaultVal={1}
                step={1}
                value={liveCells}
                onChange={(val: number) => dispatch(setLiveCells(val))}
            />
        </Box>
    );
}

function Cluster() {
    //
    const numCells = useAppSelector((state) => state.numCells.value);
    const minSize = useAppSelector((state) => state.groupMinSize.value);
    const maxSize = useAppSelector((state) => state.groupMaxSize.value);
    const distr = useAppSelector((state) => state.distributionType.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (maxSize < minSize) {
            dispatch(setGroupMaxSize(minSize));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSize, minSize]);

    return (
        <Box className="cap-component-container p-2">
            <FormLabel
                id="cluster-dist-radio-group-label"
                className="cap-component-label"
            >
                Clusters
            </FormLabel>
            <RadioGroup
                aria-labelledby="cluster-dist-radio-group-label"
                defaultValue="even"
                name="cluster-dist-radio-group"
                row
                value={distr}
                onChange={(event: React.ChangeEvent, value: string) =>
                    dispatch(setDistributionType(value as DistributionType))
                }
            >
                <FormControlLabel
                    key={1}
                    value="even"
                    control={<StyledRadio />}
                    label={<FontAwesomeIcon icon={faEquals} size="xl" />}
                />
                <FormControlLabel
                    key={2}
                    value="rand"
                    control={<StyledRadio />}
                    label={<FontAwesomeIcon icon={faShuffle} size="xl" />}
                />
            </RadioGroup>

            <CustomSlider
                minVal={1}
                maxVal={numCells}
                defaultVal={1}
                value={[minSize, maxSize]}
                onChange={(value: number | number[]) => {
                    let [min, max] = value as number[];
                    dispatch(setGroupMinSize(min));
                    dispatch(setGroupMaxSize(max));
                }}
            />
        </Box>
    );
}

function ReloadBtn() {
    //

    const liveCells = useAppSelector((state) => state.liveCells.value);
    const liveCellsType = useAppSelector((state) => state.liveCellsType.value);

    const params = {
        numCells: useAppSelector((state) => state.numCells.value),
        liveCells: liveCellsType === "perc" ? liveCells / 100 : liveCells,
        groupMinSize: useAppSelector((state) => state.groupMinSize.value),
        groupMaxSize: useAppSelector((state) => state.groupMaxSize.value),
        distribution: useAppSelector((state) => state.distributionType.value),
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        //
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
