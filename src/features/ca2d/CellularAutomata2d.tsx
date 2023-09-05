//
import React, { useEffect, useRef } from "react";

import { useAppSelector, useStateObj } from "src/app/hooks";

import { Box } from "@mui/material";
import { selectSceneSize } from "src/app/slices/sceneSize";
import CustomTabs from "src/components/Tabs";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import useNbhd2d from "src/app/hooks/nbhd2d";
import { useRules2d } from "src/app/hooks/rules2d";
import useCellsState from "src/app/hooks/cellsState";
import InitState2d from "src/features/ca2d/InitState2d";
import { CellularAutomaton2d } from "src/ts/CellularAutomaton2d";
import Canvas from "../Canvas";
import Info from "../Info";
import Controllers from "../Controllers";

export default function CellularAutomata2d() {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const iterations = useStateObj(0);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const cellsState = useCellsState(sceneSize.rows, sceneSize.cols);

    const initState = useRef(cellsState.get);
    const automaton = useRef(new CellularAutomaton2d());

    const canvasOnClick = (r: number, c: number) => {
        cellsState.toggle(r, c);
    };

    const init = () => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        automaton.current.state = cellsState.get;
        initState.current = cellsState.get;
        iterations.set(0);
    };

    const next = () => {
        cellsState.set(automaton.current.nextState());
        iterations.set(iterations.get + 1);
    };

    const stop = () => {
        cellsState.set(initState.current);
        iterations.set(0);
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
            <Canvas cellsState={cellsState.get} clickHandler={canvasOnClick} />

            <Info
                iterations={iterations.get}
                liveCells={cellsState.liveCells}
            />

            <Controllers init={init} next={next} stop={stop} />

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
                        content: <InitState2d state={cellsState} />,
                    },
                ]}
            />
        </Box>
    );
}
