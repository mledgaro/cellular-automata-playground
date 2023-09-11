//
import React, { useCallback } from "react";

import { Box, Grid } from "@mui/material";
import { faArrowRotateRight, faMap } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "src/components/Button";
import CustomRadioGroup from "src/components/RadioGroup";

import {
    useAppDispatch,
    useAppSelector,
    useBoolArr,
    useStateObj,
} from "src/app/hooks";
import { selectNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import {
    NbhdType,
    defaultVal as nbhdTypeDefault,
    selectNbhdType,
    setNbhdType,
} from "src/app/slices/ca1d/nbhdType";
import { selectMainCell } from "src/app/slices/ca1d/mainCell";
import {
    selectCellsNbhds,
    setCellsNbhds,
} from "src/app/slices/ca1d/cellsNbhds";

import { selectSceneCols } from "src/app/slices/sceneSize";
import { Nbhd1dEditor } from "./CellsGroups";
import { boolArray } from "src/ts/Utils";

export default function Nbhd1d() {
    //
    const nbhdsMap = useStateObj(false);

    return (
        <Box className="space-y-2">
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md="auto">
                    <Type />
                </Grid>

                <Grid item md={5} className="flex justify-center">
                    <Nbhd1dEditor />
                </Grid>

                <Grid item md="auto" className="space-x-2">
                    <Reload />
                    <IconButton
                        icon={faMap}
                        iconSize="2x"
                        tooltipLabel="Show neighborhoods map"
                        onClick={() => nbhdsMap.set(!nbhdsMap.get)}
                    />
                </Grid>
            </Grid>

            {nbhdsMap.get && <NbhdsMap />}
        </Box>
    );
}

function Type() {
    //
    const type = useAppSelector(selectNbhdType);
    const dispatch = useAppDispatch();
    return (
        <CustomRadioGroup
            label="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            defaultVal={nbhdTypeDefault}
            value={type}
            onChange={(val: string) => dispatch(setNbhdType(val as NbhdType))}
        />
    );
}

function NbhdsMap() {
    //
    const sceneCols = useAppSelector(selectSceneCols);
    const cellsNbhds = useAppSelector(selectCellsNbhds);

    const cells = useBoolArr(boolArray(sceneCols, false));

    const highlight = useCallback(
        (idx: number) => {
            //
            let highCells = Array(sceneCols).fill(false);
            cellsNbhds[idx].forEach(
                (neighboor) => (highCells[neighboor] = true)
            );
            cells.set(highCells);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cellsNbhds]
    );

    return (
        <Box className="">
            {cells.get.map((e, i) => (
                <Box
                    key={i}
                    className={`cap-cell ${e ? "on" : "off"}`}
                    onMouseOver={() => highlight(i)}
                />
            ))}
        </Box>
    );
}

function Reload() {
    //
    const params = {
        numCells: useAppSelector(selectSceneCols),
        width: useAppSelector(selectNbhdWidth),
        type: useAppSelector(selectNbhdType),
        mainCell: useAppSelector(selectMainCell),
    };

    const dispatch = useAppDispatch();

    return (
        <IconButton
            icon={faArrowRotateRight}
            iconSize="2x"
            tooltipLabel="Reload neighborhoods"
            onClick={() => dispatch(setCellsNbhds(params))}
        />
    );
}
