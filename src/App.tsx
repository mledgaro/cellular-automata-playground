//

import "./css/App.css";

import React, { createContext, useEffect, useRef } from "react";
import {
    useArrayState,
    useBoolArrState,
    useRangeReducer,
    useStateObj,
} from "./CustomHooks";
import { intToBoolArray, randomBoolArray } from "./ts/Utils";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";
import Settings1D from "./sections/settings_1d/Settings1D";
import Settings2D from "./sections/settings_2d/Settings2D";
import Footer from "./sections/Footer";

import CellularAutomaton, { NbhdType } from "./ts/CellularAutomaton";

export const NbhdWidthCtx = createContext(3);
export const NbhdTypeCtx = createContext("adjacent");
export const MainCellCtx = createContext(1);

export const NumCellsCtx = createContext(256);
export const CellsNbhdsCtx = createContext((index: number) => [0]);
export const RulesCtx = createContext({
    get: (index: number): boolean => false,
    asNum: 0,
    num: 0,
});
export const InitStateCtx = createContext([false]);

export const APICtx = createContext({
    nbhdWidth: {
        next: () => {},
        prev: () => {},
        set: (val: number) => {},
    },
    nbhdType: { set: (val: any) => {} },
    mainCell: { set: (val: any) => {} },
    cellsNbhds: {
        set: (width: number, type: NbhdType, mainCell: number) => {},
    },
    rules: {
        toggle: (index: number) => {},
        random: () => {},
        invert: () => {},
        allAlive: () => {},
        allDead: () => {},
    },
    initState: {
        set: (
            liveCells: number,
            groupMinSize: number,
            groupMaxSize: number,
            distributionType: "rand" | "even"
        ) => {},
        toggleCell: (index: number) => {},
    },
});

export default function App() {
    //

    const caModel1d = useRef(new CellularAutomaton(256));

    const dimension = useRangeReducer(1, 2, 1, true);

    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdType = useStateObj("adjacent");
    const mainCell = useStateObj(1);

    const apiCtx = {
        nbhdWidth: {
            next: nbhdWidth.next,
            prev: nbhdWidth.prev,
            set: nbhdWidth.set,
        },
        nbhdType: {
            set: nbhdType.set,
        },
        mainCell: {
            set: mainCell.set,
        },
        cellsNbhds: {
            set: caModel1d.current.setCellsNbhds,
        },
        rules: {
            toggle: caModel1d.current.toggleRule,
            random: caModel1d.current.setRandomRules,
            invert: caModel1d.current.setInvertRules,
            allAlive: caModel1d.current.setRulesAlive,
            allDead: caModel1d.current.setRulesDead,
        },
        initState: {
            set: caModel1d.current.setInitState,
            toggleCell: caModel1d.current.toggleCell,
        },
    };

    useEffect(() => {
        if (mainCell.get >= nbhdWidth.get) {
            mainCell.set(nbhdWidth.get - 1);
        }

        rules.set(randomBoolArray(Math.pow(2, nbhdWidth.get)));
    }, [nbhdWidth.get]);

    let settings;

    if (dimension.get === 1) {
        settings = <Settings1D />;
    } else {
        // dimension.get === 2
        settings = <Settings2D />;
    }

    return (
        <div className="App">
            <NbhdWidthCtx.Provider value={nbhdWidth.get}>
                <NbhdTypeCtx.Provider value={nbhdType.get}>
                    <MainCellCtx.Provider value={mainCell.get}>
                        <NumCellsCtx.Provider
                            value={caModel1d.current.cellsNumber}
                        >
                            <CellsNbhdsCtx.Provider
                                value={(index: number) =>
                                    caModel1d.current.getCellNbhd(index)
                                }
                            >
                                <RulesCtx.Provider
                                    value={{
                                        get: (index: number) =>
                                            caModel1d.current.getRule(index),
                                        asNum: caModel1d.current.ruleAsNum,
                                        num: caModel1d.current.numRules,
                                    }}
                                >
                                    <InitStateCtx.Provider
                                        value={caModel1d.current.initState}
                                    >
                                        <APICtx.Provider value={apiCtx}>
                                            {/*  */}

                                            <Title dimension={dimension} />

                                            <Canvas />

                                            <Controls />

                                            {settings}

                                            <Footer />
                                        </APICtx.Provider>
                                    </InitStateCtx.Provider>
                                </RulesCtx.Provider>
                            </CellsNbhdsCtx.Provider>
                        </NumCellsCtx.Provider>
                    </MainCellCtx.Provider>
                </NbhdTypeCtx.Provider>
            </NbhdWidthCtx.Provider>
        </div>
    );
}
