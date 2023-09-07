//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";

import { selectSceneSize } from "src/app/slices/sceneSize";
import Nbhd1d from "src/features/ca1d/Nbhd1d";
import Rules1d from "src/features/ca1d/Rules1d";
import { resizeRules, selectRules } from "src/app/slices/rules";
import { selectCellsNbhds, setCellsNbhds } from "src/app/slices/cellsNbhds";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import { selectNbhdType } from "src/app/slices/nbhdType";
import { selectMainCell } from "src/app/slices/mainCell";
import useCellsState from "src/app/hooks/cellsState";
import InitStateEditor from "src/features/InitStateEditor";
import CAComponents from "../CAComponents";
import {
    boolArrayToInt,
    countTrueArray,
    createArray2d,
    randomBoolArray,
} from "src/ts/Utils";

export default function CellularAutomata1d() {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdType = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const cellsState = useCellsState(sceneSize.rows, sceneSize.cols);
    const initState = useRef(cellsState.get[0]);
    const density = useStateObj(0.1);
    const liveCells = useRef(0);

    const canvasOnClick = (r: number, c: number) => {
        let nval = cellsState.toggle(0, c);
        liveCells.current += nval ? 1 : -1;
    };

    const init = () => {
        initState.current = cellsState.get[0];
    };

    const next = (iteration: number) => {
        const nstate = nextState(cellsNbhds, rules, cellsState.get[iteration]);
        if (iteration >= sceneSize.rows) {
            cellsState.set(cellsState.get.slice(1).concat([nstate]));
        } else {
            cellsState.set(
                cellsState.get.map((r, i) => (i === iteration + 1 ? nstate : r))
            );
        }
        liveCells.current = countTrueArray(nstate);
    };

    const stop = () => {
        cellsState.set(
            [initState.current].concat(
                createArray2d(sceneSize.rows - 1, sceneSize.cols, false)
            )
        );
        liveCells.current = countTrueArray(initState.current);
    };

    const rand = () => {
        let st = randomBoolArray(sceneSize.cols, density.get);
        let arr = [st].concat(
            createArray2d(sceneSize.rows - 1, sceneSize.cols, false)
        );
        cellsState.set(arr);
        liveCells.current = countTrueArray(st);
    };

    const clear = () => {
        cellsState.clear();
        liveCells.current = 0;
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

    // useEffect(() => {

    // }, [cellsState.get]);

    return (
        <CAComponents
            init={init}
            next={next}
            stop={stop}
            cellsState={cellsState.get}
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
                    content: (
                        <InitStateEditor
                            density={density.get}
                            setDensity={density.set}
                            setRandom={rand}
                            setClear={clear}
                        />
                    ),
                },
            ]}
            liveCells={liveCells.current}
        />
    );
}

function nextState(
    cellsNbhds: number[][],
    rules: boolean[],
    state: boolean[]
): boolean[] {
    //
    let nState = state.map(
        (_, i, row) =>
            rules[
                boolArrayToInt(
                    cellsNbhds[i].map((e) => row[e]),
                    false
                )
            ]
    );
    return nState;
}
