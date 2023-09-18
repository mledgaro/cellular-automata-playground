import {
    faArrowDownUpAcrossLine,
    faArrowsLeftRightToLine,
    faClose,
    faGlobe,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
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
import {
    selectWorldLimits,
    setWorldLimits,
} from "src/app/slices/mainFrame/worldLimits";
import FloatingMenuButton from "src/components/FloatingMenuButton";
import { resizeCellsArr } from "src/app/slices/mainFrame/cells";

const titleStyle = {
    paddingBottom: "10px",
    fontWeight: "700",
    fontSize: "1.2rem",
};

export default function CanvasSettings() {
    //
    const size = useAppSelector(selectWorldSize);
    const limits = useAppSelector(selectWorldLimits);
    const dispatch = useAppDispatch();

    const rows = useStateObj(size.rows);
    const cols = useStateObj(size.cols);
    const horizontal = useStateObj<Limit>(limits.horizontal);
    const vertical = useStateObj<Limit>(limits.vertical);

    const closeHandler = () => {
        dispatch(setWorldSize({ rows: rows.get, cols: cols.get }));
        dispatch(resizeCellsArr({ rows: rows.get, cols: cols.get }));
        dispatch(
            setWorldLimits({
                horizontal: horizontal.get,
                vertical: vertical.get,
            })
        );
    };

    useEffect(() => {
        rows.set(size.rows);
        cols.set(size.cols);
        horizontal.set(limits.horizontal);
        vertical.set(limits.vertical);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FloatingMenuButton
            icon={faGlobe}
            iconOnShow={faClose}
            iconSize="lg"
            content={
                <Box className="flex flex-col w-[18rem] space-y-3">
                    <SizeSelector rows={rows} cols={cols} />
                    <LimitSelector
                        horizontal={horizontal}
                        vertical={vertical}
                    />
                </Box>
            }
            onClose={closeHandler}
            boxProps="top-0 left-0 translate-x-[3rem] -translate-y-[3rem]-"
        />
    );
}

function SizeSelector({
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

function LimitSelector({
    horizontal,
    vertical,
}: {
    horizontal: StateObjHook<Limit>;
    vertical: StateObjHook<Limit>;
}) {
    //
    return (
        <Box className="w-full">
            <Box style={titleStyle}>Limits</Box>
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
