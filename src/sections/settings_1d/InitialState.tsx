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

import {
    StateHookObj,
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
import { selectNumCells } from "src/app/slices/numCells";

type LiveCellsType = "num" | "perc";

export default function InitialState() {
    //
    const liveCellsType = useStateObj<LiveCellsType>("num");
    const liveCellsNum = useStateObj<number>(1);
    const clusterMin = useStateObj<number>(1);
    const clusterMax = useStateObj<number>(1);
    const clusterDist = useStateObj<DistributionType>("even");

    return (
        <Grid container rowSpacing={2}>
            {/* row 1 */}
            <Grid item container columnSpacing={3}>
                {/* live cells */}
                <Grid item md>
                    <LiveCells
                        numberState={liveCellsNum}
                        typeState={liveCellsType}
                    />
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
                        liveCells={liveCellsNum.get}
                        liveCellsType={liveCellsType.get}
                        clusterMin={clusterMin.get}
                        clusterMax={clusterMax.get}
                        clusterDist={clusterDist.get}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

function LiveCells({
    numberState,
    typeState,
}: {
    numberState: StateHookObj<number>;
    typeState: StateHookObj<LiveCellsType>;
}) {
    //
    const numCells = useAppSelector(selectNumCells);

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
                value={typeState.get}
                onChange={(event: React.ChangeEvent, value: string) =>
                    typeState.set(value)
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
                maxVal={typeState.get === "num" ? numCells : 100}
                defaultVal={1}
                value={numberState.get}
                onChange={numberState.set}
            />
        </Box>
    );
}

function Cluster({
    minState,
    maxState,
    distState,
}: {
    minState: StateHookObj<number>;
    maxState: StateHookObj<number>;
    distState: StateHookObj<DistributionType>;
}) {
    //
    const numCells = useAppSelector(selectNumCells);

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
                value={distState.get}
                onChange={(event: React.ChangeEvent, value: string) =>
                    distState.set(value as DistributionType)
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
                maxVal={numCells / 2}
                defaultVal={1}
                value={[minState.get, maxState.get]}
                onChange={(value: number | number[]) => {
                    let [min, max] = value as number[];
                    minState.set(min);
                    maxState.set(max);
                }}
            />
        </Box>
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
    liveCellsType,
    clusterMin,
    clusterMax,
    clusterDist,
}: {
    liveCells: number;
    liveCellsType: LiveCellsType;
    clusterMin: number;
    clusterMax: number;
    clusterDist: DistributionType;
}) {
    //
    const dispatch = useAppDispatch();

    const params = {
        numCells: useAppSelector(selectNumCells),
        liveCells: liveCellsType === "perc" ? liveCells / 100 : liveCells,
        groupMinSize: clusterMin,
        groupMaxSize: clusterMax,
        distribution: clusterDist,
    };

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
