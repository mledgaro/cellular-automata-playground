//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { selectSceneSize } from "src/app/slices/sceneSize";
import Nbhd1d from "src/features/ca1d/Nbhd1d";
import Rules1d from "src/features/ca1d/Rules1d";
import CellularAutomaton1d from "src/ts/CellularAutomaton1d";
import { resizeRules, selectRules } from "src/app/slices/rules";
import { selectCellsNbhds, setCellsNbhds } from "src/app/slices/cellsNbhds";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import { selectNbhdType } from "src/app/slices/nbhdType";
import { selectMainCell } from "src/app/slices/mainCell";
import useCellsState from "src/app/hooks/cellsState";
import InitStateEditor from "src/features/InitStateEditor";
import CAComponents from "../CAComponents";

export default function CellularAutomata1d() {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdType = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const cellsState = useCellsState(1, sceneSize.cols);
    const automaton = useRef(new CellularAutomaton1d());
    const initState = useRef(cellsState.get[0]);
    const buffer = useRef([[false]]);

    const canvasOnClick = (r: number, c: number) => {
        cellsState.toggle(0, c);
    };

    const init = () => {
        automaton.current.initState = cellsState.get[0];
        initState.current = cellsState.get[0];
        buffer.current = [cellsState.get[0]];
    };

    const next = (iteration: number) => {
        const nstate = automaton.current.nextState(cellsNbhds, rules);
        if (iteration >= sceneSize.rows) {
            buffer.current = buffer.current.slice(1).concat([nstate]);
        } else {
            buffer.current = buffer.current.concat([nstate]);
        }
        cellsState.set(buffer.current);
    };

    const stop = () => {
        cellsState.set([initState.current]);
        buffer.current = [];
    };

    useEffect(() => {
        dispatch(
            setCellsNbhds({
                numCells: sceneSize.cols,
                width: nbhdWidth,
                type: nbhdType,
                mainCell: mainCell,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sceneSize.cols, nbhdWidth, nbhdType, mainCell]);

    useEffect(() => {
        dispatch(resizeRules(Math.pow(2, nbhdWidth)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

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
                    content: <Nbhd1d />,
                },
                {
                    title: "Rules",
                    content: <Rules1d />,
                },
                {
                    title: "Initial state",
                    // content: <InitState1d />,
                    content: <InitStateEditor state={cellsState} />,
                },
            ]}
            liveCells={cellsState.liveCellsLastRow}
        />
    );
}
