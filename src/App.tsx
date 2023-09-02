//
import "./css/App.css";

import React, { useEffect, useRef } from "react";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
    StateObjHook,
    useAppDispatch,
    useAppSelector,
    useStateObj,
} from "./app/hooks";

import {
    Box,
    Button,
    Menu,
    MenuItem,
    MenuProps,
    alpha,
    styled,
} from "@mui/material";
import { selectNumCells } from "./app/slices/numCells";
import CustomTabs from "./components/Tabs";
import Nbhd1d from "./features/ca1d/Nbhd1d";
import Rules1d from "./features/ca1d/Rules1d";
import InitState1d from "./features/ca1d/InitState1d";
import Nbhd2d from "./features/ca2d/Nbhd2d";
import Rules2d from "./features/ca2d/Rules2d";
import CellularAutomaton1d from "./ts/CellularAutomaton1d";
import useNbhd2d from "./app/hooks/nbhd2d";
import { useRules2d } from "./app/hooks/rules2d";
import useInitState2d from "./app/hooks/initState2d";
import InitState2d from "./features/ca2d/InitState2d";
import Scene from "./features/Scene";
import CanvasCntrl from "./ts/CanvasCntrl";
import { resizeInitState, selectInitState } from "./app/slices/initState";
import { resizeRules, selectRules } from "./app/slices/rules";
import { selectCellsNbhds, setCellsNbhds } from "./app/slices/cellsNbhds";
import { selectNbhdWidth } from "./app/slices/nbhdWidth";
import { selectNbhdType } from "./app/slices/nbhdType";
import { selectMainCell } from "./app/slices/mainCell";
import { CellularAutomaton2d } from "./ts/CellularAutomaton2d";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
    //
    return (
        <BrowserRouter>
            <Box>
                <Box className="mx-auto mt-4 w-fit">
                    <CustomizedMenus />
                </Box>
                <Routes>
                    <Route index element={<CellularAutomata2d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<CellularAutomata2d />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: 10,
        minWidth: 180,
        "& .MuiMenu-list": {
            padding: "8px",
            a: {
                color: "var(--primary)",
            },
        },
        backgroundColor: "var(--secondary)",
    },
}));

function CustomizedMenus() {
    //
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const title = useStateObj<string>("2D Cellular Automata");
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                onClick={handleClick}
                className="bg-secondary text-primary text-4xl font-bold"
            >
                {title.get}
                <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem
                    onClick={() => {
                        title.set("1D Cellular Automata");
                        setAnchorEl(null);
                    }}
                >
                    <Link to="ca1d">1D Cellular Automata</Link>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        title.set("2D Cellular Automata");
                        setAnchorEl(null);
                    }}
                >
                    <Link to="ca2d">2D Cellular Automata</Link>
                </MenuItem>
                {/* <Divider sx={{ my: 0.5 }} /> */}
            </StyledMenu>
        </div>
    );
}

function CellularAutomata1d() {
    //
    const numCells = useAppSelector(selectNumCells);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdType = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

    const dispatch = useAppDispatch();

    const automaton = useRef(new CellularAutomaton1d());

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.initState = initState;
        canvas!.paintRow(automaton.current.ticks, automaton.current.state);
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState(cellsNbhds, rules);
        canvas!.paintRow(automaton.current.ticks, automaton.current.state);
    };

    useEffect(() => {
        dispatch(
            setCellsNbhds({
                numCells: numCells,
                width: nbhdWidth,
                type: nbhdType,
                mainCell: mainCell,
            })
        );
    }, [numCells, nbhdWidth, nbhdType, mainCell]);

    useEffect(() => {
        dispatch(resizeRules(Math.pow(2, nbhdWidth)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

    useEffect(() => {
        dispatch(resizeInitState(numCells));
    }, [numCells]);

    return (
        <Box className="space-y-6 my-5">
            <Scene init={init} next={next} />
            <CustomTabs
                tabs={[
                    {
                        title: "Neighborhood",
                        content: <Nbhd1d />,
                    },
                    {
                        title: "Rules",
                        content: <Rules1d />,
                    },
                    {
                        title: "Initial state",
                        content: <InitState1d />,
                    },
                ]}
            />
        </Box>
    );
}

function CellularAutomata2d() {
    //
    const numCells = useAppSelector(selectNumCells);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const initState = useInitState2d(64, numCells);

    const automaton = useRef(new CellularAutomaton2d());

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        // automaton.current.state = initState.get;
        automaton.current.state = canvas?.buffer ?? [];
        canvas?.paintScene(automaton.current.state);
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState();
        canvas?.paintScene(automaton.current.state);
    };

    useEffect(() => {
        rules.resize(nbhd.size);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhd.size]);

    useEffect(() => {
        if (nbhd.type === "moore") {
            rules.set([
                false,
                false,
                null,
                true,
                false,
                false,
                false,
                false,
                false,
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhd.type]);

    return (
        <Box className="space-y-6 my-5">
            <Scene init={init} next={next} state={initState.get} />
            <CustomTabs
                tabs={[
                    {
                        title: "Neighborhood",
                        content: <Nbhd2d state={nbhd} />,
                    },
                    {
                        title: "Rules",
                        content: <Rules2d state={rules} />,
                    },
                    {
                        title: "Init state",
                        content: <InitState2d state={initState} />,
                    },
                ]}
            />
        </Box>
    );
}
