//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";

import { selectSceneSize } from "src/app/slices/sceneSize";
import Nbhd1d from "src/features/ca1d/Nbhd1d";
import Rules1d from "src/features/ca1d/Rules1d";
import {
    randomRules,
    resizeRules,
    selectRules,
    setRules,
} from "src/app/slices/ca1d/rules";
import {
    selectCellsNbhds,
    buildCellsNbhds,
    setCellsNbhds,
} from "src/app/slices/ca1d/cellsNbhds";
import { selectNbhdWidth, setNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import {
    NbhdType,
    selectNbhdType,
    setNbhdType,
} from "src/app/slices/ca1d/nbhdType";
import { selectMainCell, setMainCell } from "src/app/slices/ca1d/mainCell";
import useCellsState from "src/app/hooks/cellsState";
import InitStateEditor from "src/features/InitStateEditor";
import MainFrame from "../mainFrame/MainFrame";
import {
    boolArrayToInt,
    countTrueArray,
    createArray,
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
    const initState = useRef<boolean[] | null>(null);
    const currState = useRef<boolean[] | null>(null);
    const density = useStateObj(0.1);
    const liveCells = useRef(0);

    const canvasOnClick = (r: number, c: number) => {
        let nval = cellsState.toggle(0, c);
        liveCells.current += nval ? 1 : -1;
    };

    const init = () => {
        initState.current = cellsState.get[0];
        currState.current = cellsState.get[0];
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
        currState.current = nstate;
        liveCells.current = countTrueArray(nstate);
    };

    const stop = () => {
        cellsState.set(
            [initState.current ?? createArray(sceneSize.cols, false)].concat(
                createArray2d(sceneSize.rows - 1, sceneSize.cols, false)
            )
        );
        liveCells.current = countTrueArray(initState.current ?? []);
        initState.current = null;
        currState.current = null;
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

    const setDensity = (nval: number) => {
        density.set(nval);
        rand();
    };

    const getData = () => {
        let data = {
            type: "1d cellular automaton",
            nbhdType: nbhdType,
            nbhdWidth: nbhdWidth,
            mainCell: mainCell,
            neighborhoods: cellsNbhds,
            rules: rules,
            initialState: initState.current ?? cellsState.get[0],
            currentState: currState.current ?? cellsState.get[0],
        };
        return data;
    };

    const onLoad = (data: object) => {
        if ("nbhdType" in data) {
            dispatch(setNbhdType(data.nbhdType as NbhdType));
        }
        if ("nbhdWidth" in data) {
            dispatch(setNbhdWidth(data.nbhdWidth as number));
        }
        if ("mainCell" in data) {
            dispatch(setMainCell(data.mainCell as number));
        }
        if ("neighborhoods" in data) {
            dispatch(setCellsNbhds(data.neighborhoods as number[][]));
        }
        if ("rules" in data) {
            dispatch(setRules(data.rules as boolean[]));
        }
        if ("initialState" in data) {
            cellsState.set(
                [data.initialState as boolean[]].concat(
                    createArray2d(sceneSize.rows - 1, sceneSize.cols, false)
                )
            );
        }
        // if ("currentState" in data) {
        //     cellsState.set(
        //         [data.currentState as boolean[]].concat(
        //             createArray2d(sceneSize.rows - 1, sceneSize.cols, false)
        //         )
        //     );
        // }
    };

    useEffect(() => {
        dispatch(
            buildCellsNbhds({
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
        dispatch(randomRules());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

    // useEffect(() => {

    // }, [cellsState.get]);

    return (
        <MainFrame
            init={init}
            next={next}
            stop={stop}
            cellsState={cellsState.get}
            canvasOnClick={canvasOnClick}
            neighborhood={<Nbhd1d />}
            rules={<Rules1d />}
            initialState={
                <InitStateEditor
                    density={density.get}
                    setDensity={setDensity}
                    setRandom={rand}
                    setClear={clear}
                />
            }
            liveCells={liveCells.current}
            getData={getData}
            onLoad={onLoad}
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
