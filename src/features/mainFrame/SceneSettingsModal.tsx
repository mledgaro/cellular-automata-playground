import {
    faArrowDownUpAcrossLine,
    faArrowsLeftRightToLine,
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
import { selectSceneSize, setSceneSize } from "src/app/slices/sceneSize";
import InputNumber from "src/components/InputNumber";
import RadioGroup from "src/components/RadioGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BoundaryType } from "src/app/types";
import { setSceneBoundaries } from "src/app/slices/sceneBoundaries";

const titleStyle = {
    paddingBottom: "10px",
    fontWeight: "700",
    fontSize: "1.2rem",
};

export default function SceneSettingsModal({
    show,
    hide,
}: {
    show: boolean;
    hide: () => void;
}) {
    //
    const sceneSize = useAppSelector(selectSceneSize);
    const dispatch = useAppDispatch();

    const rows = useStateObj(sceneSize.rows);
    const cols = useStateObj(sceneSize.cols);
    const horizontal = useStateObj<BoundaryType>("continuous");
    const vertical = useStateObj<BoundaryType>("continuous");

    const closeHandler = () => {
        dispatch(setSceneSize({ rows: rows.get, cols: cols.get }));
        dispatch(
            setSceneBoundaries({
                horizontal: horizontal.get,
                vertical: vertical.get,
            })
        );
        hide();
    };

    return (
        <Modal
            open={show}
            onClose={closeHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="cap-modal">
                <SizeControls rows={rows} cols={cols} />
                <BoundariesControls
                    horizontal={horizontal}
                    vertical={vertical}
                />
            </Box>
        </Modal>
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
        <Box
            className="cap-component-container"
            style={{
                padding: "8px",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            <Box style={titleStyle}>Size</Box>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                columnSpacing={1}
            >
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
    horizontal: StateObjHook<BoundaryType>;
    vertical: StateObjHook<BoundaryType>;
}) {
    //
    return (
        <Box
            className="cap-component-container"
            style={{
                paddingTop: "8px",
                paddingLeft: "8px",
                marginTop: "8px",
                width: "fit-content",
            }}
        >
            <Box style={titleStyle}>Boundaries</Box>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                columnSpacing={1}
            >
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
                            horizontal.set(nval as BoundaryType)
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
                        onChange={(nval: string) =>
                            vertical.set(nval as BoundaryType)
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
