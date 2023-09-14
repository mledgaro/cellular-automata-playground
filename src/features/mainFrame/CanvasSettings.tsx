import {
    faArrowDownUpAcrossLine,
    faArrowsLeftRightToLine,
    faCheck,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, Modal } from "@mui/material";
import React from "react";
import {
    StateObjHook,
    useAppDispatch,
    useAppSelector,
    useStateObj,
} from "src/app/hooks";
import {
    selectWorldSize,
    setWorldSize,
} from "src/app/slices/mainFrame/worldSize";
import InputNumber from "src/components/InputNumber";
import RadioGroup from "src/components/RadioGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Limit } from "src/app/types";
import { setWorldLimits } from "src/app/slices/mainFrame/worldLimits";
import { IconButton } from "src/components/Button";

const titleStyle = {
    paddingBottom: "10px",
    fontWeight: "700",
    fontSize: "1.2rem",
};

export default function CanvasSettings({
    onDone = () => {},
}: {
    onDone?: () => void;
}) {
    //
    const sceneSize = useAppSelector(selectWorldSize);
    const dispatch = useAppDispatch();

    const rows = useStateObj(sceneSize.rows);
    const cols = useStateObj(sceneSize.cols);
    const horizontal = useStateObj<Limit>("continuous");
    const vertical = useStateObj<Limit>("continuous");

    const closeHandler = () => {
        dispatch(setWorldSize({ rows: rows.get, cols: cols.get }));
        dispatch(
            setWorldLimits({
                horizontal: horizontal.get,
                vertical: vertical.get,
            })
        );
        onDone();
    };

    return (
        <Box className="flex flex-col w-[18rem] space-y-3">
            <SizeControls rows={rows} cols={cols} />
            <BoundariesControls horizontal={horizontal} vertical={vertical} />
            <Box className="flex justify-center">
                <IconButton
                    icon={faCheck}
                    iconSize="xl"
                    tooltipLabel="Apply"
                    onClick={closeHandler}
                />
            </Box>
        </Box>
    );
}

function SizeControls({
    rows,
    cols,
}: {
    rows: StateObjHook<number>;
    cols: StateObjHook<number>;
}) {
    //
    return (
        <Box className="w-full">
            <Box style={titleStyle}>Size</Box>
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md="auto">
                    <InputNumber state={rows} min={4} max={1024} label="Rows" />
                </Grid>
                <Grid item md="auto">
                    <FontAwesomeIcon icon={faXmark} size="2x" />
                </Grid>
                <Grid item md="auto">
                    <InputNumber state={cols} min={4} max={1024} label="Cols" />
                </Grid>
            </Grid>
        </Box>
    );
}

function BoundariesControls({
    horizontal,
    vertical,
}: {
    horizontal: StateObjHook<Limit>;
    vertical: StateObjHook<Limit>;
}) {
    //
    return (
        <Box className="w-full">
            <Box style={titleStyle}>Boundaries</Box>
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md="auto">
                    <RadioGroup
                        label="Horizontal"
                        options={[
                            {
                                label: (
                                    <FontAwesomeIcon
                                        icon={faArrowDownUpAcrossLine}
                                    />
                                ),
                                value: "continuous",
                            },
                            {
                                label: (
                                    <FontAwesomeIcon
                                        icon={faArrowsLeftRightToLine}
                                        rotation={90}
                                    />
                                ),
                                value: "bounded",
                            },
                        ]}
                        defaultVal={"continuous"}
                        value={horizontal.get}
                        onChange={(nval: string) =>
                            horizontal.set(nval as Limit)
                        }
                    />
                </Grid>
                <Grid item md="auto">
                    <RadioGroup
                        label="Vertical"
                        options={[
                            {
                                label: (
                                    <FontAwesomeIcon
                                        icon={faArrowDownUpAcrossLine}
                                        rotation={90}
                                    />
                                ),
                                value: "continuous",
                            },
                            {
                                label: (
                                    <FontAwesomeIcon
                                        icon={faArrowsLeftRightToLine}
                                    />
                                ),
                                value: "bounded",
                            },
                        ]}
                        defaultVal={"continuous"}
                        value={vertical.get}
                        onChange={(nval: string) => vertical.set(nval as Limit)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
