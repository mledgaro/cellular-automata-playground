//
import React, { useCallback, useEffect } from "react";

import { Box, Grid } from "@mui/material";
import { faArrowRotateRight, faMap } from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "src/components/Button";
import CustomRadioGroup from "src/components/RadioGroup";

import {
    useAppDispatch,
    useAppSelector,
    useBool,
    useBoolArr,
} from "src/app/hooks";

import {
    selectWorldCols,
    selectWorldSize,
} from "src/app/slices/mainFrame/worldSize";
import { Nbhd1dEditor } from "./CellsGroups";
import { NbhdType1D } from "src/app/types";
import {
    reloadCellsNbhd,
    selectCellsNbhd,
} from "src/app/slices/ca1d/cellsNbhd";
import { selectNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import { selectNbhdType, setNbhdType } from "src/app/slices/ca1d/nbhdType";
import { selectNbhdCenter } from "src/app/slices/ca1d/nbhdCenter";

export default function Nbhd1d() {
    //
    const worldSize = useAppSelector(selectWorldSize);
    const nbhdType = useAppSelector(selectNbhdType);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdCenter = useAppSelector(selectNbhdCenter);
    // const cellsNbhd = useAppSelector(selectCellsNbhd);
    // const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const showNbhdsMap = useBool(false);

    const reloadParams = {
        numCells: worldSize.cols,
        nbhdWidth: nbhdWidth,
        nbhdType: nbhdType,
        nbhdCenter: nbhdCenter,
    };

    const reloadNbhds = () => dispatch(reloadCellsNbhd(reloadParams));

    useEffect(() => {
        reloadNbhds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worldSize.cols, nbhdWidth, nbhdType, nbhdCenter]);

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
                    <IconButton
                        icon={faArrowRotateRight}
                        iconSize="2x"
                        tooltipLabel="Reload neighborhoods"
                        onClick={reloadNbhds}
                    />
                    <IconButton
                        icon={faMap}
                        iconSize="2x"
                        tooltipLabel="Show neighborhoods map"
                        onClick={showNbhdsMap.toggle}
                    />
                </Grid>
            </Grid>

            {showNbhdsMap.get && <NbhdsMap />}
        </Box>
    );
}

function Type() {
    //
    const nbhdType = useAppSelector(selectNbhdType);
    const dispatch = useAppDispatch();

    return (
        <CustomRadioGroup
            label="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            defaultVal={"adjacent"}
            value={nbhdType}
            onChange={(val: string) => dispatch(setNbhdType(val as NbhdType1D))}
        />
    );
}

function NbhdsMap() {
    //
    const sceneCols = useAppSelector(selectWorldCols);
    const cellsNbhd = useAppSelector(selectCellsNbhd);

    const cells = useBoolArr(sceneCols);

    const highlight = useCallback(
        (idx: number) => {
            let highCells = Array(sceneCols).fill(false);
            cellsNbhd[idx].forEach(
                (neighboor: number) => (highCells[neighboor] = true)
            );
            cells.set(highCells);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cellsNbhd]
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
