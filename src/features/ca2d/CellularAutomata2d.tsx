//
import React, { useEffect, useRef } from "react";

import { useAppSelector } from "src/app/hooks";

import { selectSceneSize } from "src/app/slices/sceneSize";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import useNbhd2d from "src/app/hooks/nbhd2d";
import { useRules2d } from "src/app/hooks/rules2d";
import useCellsState from "src/app/hooks/cellsState";
import InitStateEditor from "src/features/ca2d/InitState2d";
import { CellularAutomaton2d } from "src/ts/CellularAutomaton2d";
import CAComponents from "../CAComponents";

export default function CellularAutomata2d() {
    //
    const sceneSize = useAppSelector(selectSceneSize);

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
    };

    const next = () => {
        cellsState.set(automaton.current.nextState());
    };

    const stop = () => {
        cellsState.set(initState.current);
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
        <CAComponents
            init={init}
            next={next}
            stop={stop}
            cellsState={cellsState}
            canvasOnClick={canvasOnClick}
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
                    content: <InitStateEditor state={cellsState} />,
                },
            ]}
            liveCells={cellsState.liveCells}
        />
    );
}
