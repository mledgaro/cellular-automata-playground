import React from "react";
import {
    faBorderAll,
    faBorderNone,
    faCameraRetro,
    faGlobe,
    faLocationDot,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { selectSceneSize } from "src/app/slices/sceneSize";
import { IconButton } from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";
import Label, { LabelButton } from "src/components/Label";
import CanvasSettings from "./CanvasSettings";
import { cellSizeVal } from "./MainFrame";
import { FloatMenu } from "src/components/Menu";

export default function CanvasTools({
    cursorPosition,
    cellsSize,
    showGrid,
    screenshot,
    className = "",
    sliderMarks = [],
}: {
    cursorPosition: { r: number; c: number };
    cellsSize: StateObjHook<number>;
    showGrid: StateObjHook<boolean>;
    screenshot: () => void;
    className?: string;
    sliderMarks?: { value: number; label: string }[];
}) {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const pos = `(${cursorPosition.r + 1}, ${cursorPosition.c + 1})`;

    return (
        <Box className="flex flex-col h-full items-center justify-center space-y-3">
            <Box className="flex flex-row space-x-2 items-center select-none">
                <Box>
                    <FloatMenu
                        icon={faGlobe}
                        iconSize="lg"
                        content={<CanvasSettings />}
                        boxProps="top-0 left-0 translate-x-[3rem] -translate-y-[3rem]-"
                    />
                </Box>
                <Box className="text-tertiary text-xl">
                    {`${sceneSize.rows} x ${sceneSize.cols}`}
                </Box>
            </Box>

            <Label
                icon={faLocationDot}
                tooltipLabel="Current coordinates"
                content={<Box className="flex justify-center">{pos}</Box>}
                textSize="lg"
                iconSize="xl"
                className="w-full"
            />

            <VerticalSlider
                icon={faMagnifyingGlass}
                tooltipLabel="Zoom"
                min={cellSizeVal.minVal}
                max={cellSizeVal.maxVal}
                defaultValue={cellSizeVal.defaultVal}
                state={cellsSize}
                marks={sliderMarks}
            />

            <IconButton
                tooltipLabel={`${showGrid.get ? "Hide" : "Show"} grid`}
                icon={showGrid.get ? faBorderNone : faBorderAll}
                iconSize="xl"
                onClick={() => showGrid.set(!showGrid.get)}
            />

            <IconButton
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                iconSize="xl"
                onClick={screenshot}
            />
        </Box>
    );
}
