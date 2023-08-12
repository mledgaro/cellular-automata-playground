//

import React, { useEffect } from "react";

import {
    faHashtag,
    faPercent,
    faRotate,
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
import { Box, FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import CustomRadioGroup, { StyledRadio } from "src/components/RadioGroup";
import CustomSlider from "src/components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CellsSet } from "src/features/InitialStateCells";

export default function InitialState() {
    //
    return (
        <Box className="section-container">
            <LiveCellsSelector />
            <GroupSize />
            <DistributionSelector />
            <ReloadBtn />
            <CellsSet />
        </Box>
    );
}

function LiveCellsSelector() {
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

function GroupSize() {
    //

    const numCells = useAppSelector((state) => state.numCells.value);
    const minSize = useAppSelector((state) => state.groupMinSize.value);
    const maxSize = useAppSelector((state) => state.groupMaxSize.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (maxSize < minSize) {
            dispatch(setGroupMaxSize(minSize));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSize, minSize]);

    return (
        <CustomSlider
            label="Groups size"
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
    );
}

function DistributionSelector() {
    //

    const distr = useAppSelector((state) => state.distributionType.value);

    const dispatch = useAppDispatch();

    return (
        <CustomRadioGroup
            label="Type"
            options={[
                { label: "Even", value: "even" },
                { label: "Random", value: "rand" },
            ]}
            value={distr}
            defaultVal="even"
            onChange={(val: string) =>
                dispatch(setDistributionType(val as DistributionType))
            }
        />
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
        <Button
            icon={faRotate}
            size="2xl"
            tooltipLabel="Reload init state"
            onClick={() => dispatch(setInitState(params))}
        />
    );
}
