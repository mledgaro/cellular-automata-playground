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
import SceneSettingsModal from "./SceneSettingsModal";
import { cellSizeVal } from "./MainFrame";

export default function SpaceEditionTools({
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

    const editSceneModal = useStateObj(false);

    const pos = `(${cursorPosition.r + 1}, ${cursorPosition.c + 1})`;

    return (
        <Box className="flex flex-col h-full items-center justify-center space-y-2">
            <LabelButton
                icon={faGlobe}
                tooltipLabel="World settings"
                content={`${sceneSize.rows} x ${sceneSize.cols}`}
                size="sm"
                onClick={() => editSceneModal.set(true)}
            />

            <Label
                icon={faLocationDot}
                tooltipLabel="Current coordinates"
                content={<Box className="flex justify-center">{pos}</Box>}
                textSize="lg"
                iconSize="xl"
                className="w-[7rem]"
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

            <SceneSettingsModal
                show={editSceneModal.get}
                hide={() => editSceneModal.set(false)}
            />
        </Box>
    );
}
