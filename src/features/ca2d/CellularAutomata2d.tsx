//
import React, { useEffect, useRef } from "react";

import { useAppSelector, useStateObj } from "src/app/hooks";

import { selectSceneSize } from "src/app/slices/sceneSize";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import useNbhd2d from "src/app/hooks/ca2d/nbhd2d";
import { useRules2d } from "src/app/hooks/ca2d/rules2d";
import useCellsState from "src/app/hooks/cellsState";
import InitStateEditor from "src/features/InitStateEditor";
import { CellularAutomaton2d } from "src/ts/CellularAutomaton2d";
import MainFrame from "../mainFrame/MainFrame";
import { countTrueArray2d, randomBoolArray2d } from "src/ts/Utils";
import { NbhdType2D, Position } from "src/app/types";

export default function CellularAutomata2d() {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const cellsState = useCellsState(sceneSize.rows, sceneSize.cols);

    const initState = useRef<boolean[][] | null>(null);
    const automaton = useRef(new CellularAutomaton2d());

    const density = useStateObj(0.1);
    const liveCells = useRef(0);

    const canvasOnClick = (r: number, c: number) => {
        let nval = cellsState.toggle(r, c);
        liveCells.current += nval ? 1 : -1;
    };

    const init = () => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        automaton.current.state = cellsState.get;
        initState.current = cellsState.get;
    };

    const next = () => {
        cellsState.set(automaton.current.nextState());
        liveCells.current = countTrueArray2d(cellsState.get);
    };

    const stop = () => {
        cellsState.set(initState.current ?? [[false]]);
        liveCells.current = countTrueArray2d(initState.current ?? [[false]]);
        initState.current = null;
    };

    const rand = () => {
        let st = randomBoolArray2d(sceneSize.rows, sceneSize.cols, density.get);
        cellsState.set(st);
        liveCells.current = countTrueArray2d(st);
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
            type: "2d cellular automaton",
            nbhdType: nbhd.type,
            mainCell: nbhd.mainCell,
            neighborhood: nbhd.nbhd,
            rules: rules.get,
            initialState: initState.current ?? cellsState.get,
            currentState: cellsState.get,
        };
        return data;
    };

    const onLoad = (data: object) => {
        if ("nbhdType" in data) {
            nbhd.setType((data.nbhdType as NbhdType2D) ?? "moore");
        }
        if ("mainCell" in data) {
            nbhd.setMainCellPos((data.mainCell as Position) ?? { r: 1, c: 1 });
        }
        if ("neighborhood" in data) {
            nbhd.setNbhd(data.neighborhood as boolean[][]);
        }
        if ("rules" in data) {
            rules.set(data.rules as (boolean | null)[]);
        }
        if ("initialState" in data) {
            cellsState.set(data.initialState as boolean[][]);
        }
        // if ("currentState" in data) {
        //     cellsState.set(data.currentState as boolean[][]);
        // }
    };

    // useEffect(() => {
    //     liveCells.current = countTrueArray2d(cellsState.get);
    // }, [cellsState.get]);

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
        <MainFrame
            init={init}
            next={next}
            stop={stop}
            cellsState={cellsState.get}
            canvasOnClick={canvasOnClick}
            neighborhood={<Nbhd2d state={nbhd} />}
            rules={<Rules2d state={rules} />}
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
