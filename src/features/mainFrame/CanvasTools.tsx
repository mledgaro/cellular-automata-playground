import React, { useMemo } from "react";
import {
    faBorderAll,
    faBorderNone,
    faCameraRetro,
    faGlobe,
    faLocationDot,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { selectWorldSize } from "src/app/slices/mainFrame/worldSize";
import { IconButton } from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";
import Label from "src/components/Label";
import CanvasSettings from "./CanvasSettings";
import { FloatMenu } from "src/components/Menu";
import {
    selectCellsSize,
    setCellsSize,
} from "src/app/slices/mainFrame/cellsSize";
import {
    minValue as cellsSizeMin,
    maxValue as cellsSizeMax,
} from "src/app/slices/mainFrame/cellsSize";
import { selectCursorPosition } from "src/app/slices/mainFrame/cursorPosition";
import {
    selectGridVisibility,
    toggleGridVisibility,
} from "src/app/slices/mainFrame/gridVisibility";

export default function CanvasTools({
    screenshot,
    className = "",
    containerWidth,
    containerHeight,
}: {
    screenshot: () => void;
    className?: string;
    containerWidth: number;
    containerHeight: number;
}) {
    //
    const sceneSize = useAppSelector(selectWorldSize);
    const cellsSize = useAppSelector(selectCellsSize);
    const cursorPos = useAppSelector(selectCursorPosition);
    const gridVisibility = useAppSelector(selectGridVisibility);

    const dispatch = useAppDispatch();

    const pos = `(${cursorPos.r + 1}, ${cursorPos.c + 1})`;

    const zoomMarks = useMemo(() => {
        return [
            {
                value: Math.floor(containerHeight / sceneSize.rows),
                label: "v",
            },
            {
                value: Math.floor((containerWidth * 0.94) / sceneSize.cols),
                label: "h",
            },
        ];
    }, [containerWidth, containerHeight, sceneSize]);

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
                min={cellsSizeMin}
                max={cellsSizeMax}
                state={{
                    get: cellsSize,
                    set: (nval: number) => dispatch(setCellsSize(nval)),
                }}
                marks={zoomMarks}
            />

            <IconButton
                tooltipLabel={`${gridVisibility ? "Hide" : "Show"} grid`}
                icon={gridVisibility ? faBorderNone : faBorderAll}
                iconSize="xl"
                onClick={() => dispatch(toggleGridVisibility())}
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
