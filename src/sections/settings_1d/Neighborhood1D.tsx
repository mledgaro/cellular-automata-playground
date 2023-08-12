//

import React, { useEffect } from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import Button from "src/components/Button";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setNbhdWidth } from "src/app/slices/nbhdWidth";
import { NbhdType, setNbhdType } from "src/app/slices/nbhdType";
import { setCellsNbhds } from "src/app/slices/cellsNbhds";
import { Box } from "@mui/material";
import CustomSlider from "src/components/Slider";
import CustomRadioGroup from "src/components/RadioGroup";
import MainCellSelector from "src/features/MainCellSelector";
import NbhdsMap from "src/features/NbhdsMap";

export default function Neighborhood1D() {
    return (
        <Box className="section-container">
            <Width />
            <Type />
            <MainCellSelector />
            <UpdateNbhds />
            <NbhdsMap />
        </Box>
    );
}

function Width() {
    //
    const width = useAppSelector((state) => state.nbhdWidth.value);

    const dispatch = useAppDispatch();

    return (
        <CustomSlider
            label="Width"
            minVal={2}
            maxVal={8}
            defaultVal={3}
            step={1}
            value={width}
            marks={true}
            onChange={(val: number) => dispatch(setNbhdWidth(val))}
        />
    );
}

function Type() {
    //
    const type = useAppSelector((state) => state.nbhdType.value);

    const dispatch = useAppDispatch();

    return (
        <CustomRadioGroup
            label="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            defaultVal="adjacent"
            value={type}
            onChange={(val: string) => dispatch(setNbhdType(val as NbhdType))}
        />
    );
}

function UpdateNbhds() {
    //
    const params = {
        numCells: useAppSelector((state) => state.numCells.value),
        width: useAppSelector((state) => state.nbhdWidth.value),
        type: useAppSelector((state) => state.nbhdType.value),
        mainCell: useAppSelector((state) => state.mainCell.value),
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
        //
        dispatch(setCellsNbhds(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Button
            icon={faRotate}
            size="2xl"
            tooltipLabel="Reload neighborhoods"
            onClick={() => dispatch(setCellsNbhds(params))}
        />
    );
}
