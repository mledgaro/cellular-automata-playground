import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import {
    faChevronDown,
    faChevronUp,
    faGears,
} from "@fortawesome/free-solid-svg-icons";

import { selectWorldSize } from "src/app/slices/mainFrame/worldSize";
import { useAppDispatch, useAppSelector, useBool } from "src/app/hooks";

import CustomTabs from "src/components/Tabs";
import { IconButton } from "src/components/Button";
import CanvasCntrl from "src/ts/CanvasCntrl";

import FlowControlTools from "src/features/mainFrame/FlowControlTools";
import CanvasTools from "src/features/mainFrame/CanvasTools";
import Canvas from "src/features/mainFrame/Canvas";
import Info from "src/features/mainFrame/Info";
import Files from "src/features/mainFrame/Files";
import { DataFileObj, Section } from "src/app/types";
import { selectCellsSize } from "src/app/slices/mainFrame/cellsSize";
import FloatingMenuButton from "src/components/FloatingMenuButton";

import { models } from "src/App";
import { Link, useNavigate } from "react-router-dom";
import { selectData, setData } from "src/app/slices/mainFrame/data";

type MainFrameParams = {
    title: string;
    slug: string;
    liveCells: number;
    neighborhood: JSX.Element;
    rules: JSX.Element;
    initialState: JSX.Element;
    onCellClick: (r: number, c: number) => void;
    init: () => void;
    next: () => void;
    stop: () => void;
    exportData: () => DataFileObj;
    importData: (data: DataFileObj) => void;
};

export default function MainFrame({
    title,
    slug,
    liveCells,
    neighborhood,
    rules,
    initialState,
    onCellClick,
    init,
    next,
    stop,
    exportData,
    importData,
}: MainFrameParams) {
    //
    const worldSize = useAppSelector(selectWorldSize);
    const cellsSize = useAppSelector(selectCellsSize);
    const data = useAppSelector(selectData);

    const dispatch = useAppDispatch();

    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const navigate = useNavigate();

    const importData_ = (data_: DataFileObj) => {
        if (data_?.type === slug) {
            console.log("correct slug", data_.type);
            importData(data_);
        } else {
            console.log("redirect loading", data_?.type);
            dispatch(setData(data_));
            navigate(`/${data_?.type}`);
        }
    };

    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            worldSize.rows,
            worldSize.cols,
            cellsSize
        );
        canvasCntrl.current.clear();

        if (data) {
            importData_(data);
            dispatch(setData(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box className="mt-3 space-y-3">
            <Title title={title} />

            <Grid
                container
                className="w-screen h-[70vh]"
                justifyContent="space-evenly"
            >
                {/* left panel */}
                <Grid item xs="auto">
                    <CanvasTools
                        screenshot={() =>
                            canvasCntrl.current?.saveScene("cellular_automaton")
                        }
                        containerWidth={container.current?.clientWidth ?? 1}
                        containerHeight={container.current?.clientHeight ?? 1}
                    />
                </Grid>

                {/* canvas */}
                <Grid
                    item
                    xs={6}
                    sm={7}
                    md={9}
                    className="flex items-center justify-center h-full"
                    ref={container}
                >
                    <Canvas
                        clickHandler={onCellClick}
                        canvas={canvas}
                        canvasCntrl={canvasCntrl.current}
                    />
                </Grid>

                {/* right panel */}
                <Grid item xs="auto">
                    <FlowControlTools init={init} next={next} stop={stop} />
                </Grid>
            </Grid>

            {/* iteration count and live cells */}
            <Info liveCells={liveCells} historySize={150} />

            {/* settings */}
            <Settings
                sections={[
                    { title: "Neighborhood", content: neighborhood },
                    { title: "Rules", content: rules },
                    { title: "Initial state", content: initialState },
                    {
                        title: "Import / Export",
                        content: (
                            <Files
                                exportData={exportData}
                                importData={importData_}
                            />
                        ),
                    },
                ]}
            />
        </Box>
    );
}

function Title({ title }: { title: string }) {
    //
    return (
        <Box className="text-primary mx-auto w-fit flex flex-row items-center space-x-3">
            <Box className="text-4xl">{title}</Box>
            <FloatingMenuButton
                icon={faChevronDown}
                iconOnShow={faChevronUp}
                content={
                    <Box className="flex flex-col space-y-1 text-xl">
                        {models.map((item, idx) => (
                            <Link
                                key={idx}
                                to={`/${item.link}`}
                                className="text-primary"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                }
                hideDoneButton
                boxProps="top-0 right-0 translate-y-[3rem] w-[12.5rem]"
            />
        </Box>
    );
}

function Settings({ sections }: { sections: Section[] }) {
    //
    const show = useBool(false);

    return (
        <Box className="space-y-2">
            <Box className="w-full flex justify-center">
                <IconButton
                    tooltipLabel={!show.get ? "Configuration" : ""}
                    icon={!show.get ? faGears : faChevronUp}
                    iconSize={!show.get ? "2xl" : "lg"}
                    onClick={show.toggle}
                    className="w-[10rem]"
                />
            </Box>
            {show.get && <SettingsTabs sections={sections} />}
        </Box>
    );
}

function SettingsTabs({ sections }: { sections: Section[] }) {
    //
    useEffect(() => {
        window.scroll(0, document.body.scrollHeight);
    }, []);

    return (
        <Box className="pb-6">
            <CustomTabs tabs={sections} />
            {/* {sections[1].content} */}
        </Box>
    );
}
