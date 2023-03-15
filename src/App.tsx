//

import "./css/App.css";

import React, { createContext, useEffect, useRef } from "react";
import {
    useArrayState,
    useBoolArrState,
    useBoolState,
    useRangeReducer,
    useStateObj,
} from "./ts/CustomHooks";
import { intToBoolArray, randomBoolArray } from "./ts/Utils";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";
import Settings1D from "./sections/settings_1d/Settings1D";
import Settings2D from "./sections/settings_2d/Settings2D";
import Footer from "./sections/Footer";

import CellularAutomaton, {
    DistributionType,
    NbhdType,
} from "./ts/CellularAutomaton";

export type RulesCtxType = {
    update: boolean;
    get: (index: number) => boolean;
    asNum: number;
    num: number;
};

export type InitStateCtxType = { update: boolean; arr: boolean[] };

export type APICtxType = {
    nbhdWidth: {
        set: (val: number) => void;
        prev: () => void;
        next: () => void;
    };
    setNbhdType: (val: NbhdType) => void;
    setMainCell: (val: number) => void;
    automaton: {
        cellsNbhds: {
            set: (width: number, type: NbhdType, mainCell: number) => void;
            get: (index: number) => number[];
        };
        rules: {
            toggle: (index: number) => void;
            setRandom: () => void;
            setInverse: () => void;
            setAlive: () => void;
            setDead: () => void;
        };
        state: {
            set: (
                liveCells: number,
                groupMinSize: number,
                groupMaxSize: number,
                distributionType: DistributionType
            ) => void;
            toggleCell: (index: number) => void;
            next: () => boolean[];
            get: () => boolean[];
        };
    };
};

export const NbhdWidthCtx = createContext(3);
export const NbhdTypeCtx = createContext<NbhdType>("adjacent");
export const MainCellCtx = createContext(1);

export const NumCellsCtx = createContext(256);
export const RulesCtx = createContext<RulesCtxType | null>(null);
export const InitStateCtx = createContext<InitStateCtxType | null>(null);

export const APICtx = createContext<APICtxType | null>(null);

export default function App() {
    //

    const dimension = useRangeReducer(1, 2, 1, true);

    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdType = useStateObj("adjacent");
    const mainCell = useStateObj(1);

    const automaton1d = useRef(new CellularAutomaton(256));

    const rulesUpdate = useBoolState(false);
    const initStateUpdate = useBoolState(false);

    let rulesCtx = {
        update: rulesUpdate.get,
        get: (index: number) => automaton1d.current.getRule(index),
        asNum: automaton1d.current.rulesAsNum,
        num: automaton1d.current.numRules,
    };

    let initStateCtx = {
        update: initStateUpdate.get,
        arr: automaton1d.current.cellsState,
    };

    const apiCtx = {
        nbhdWidth: {
            set: nbhdWidth.set,
            prev: nbhdWidth.prev,
            next: nbhdWidth.next,
        },
        setNbhdType: nbhdType.set,
        setMainCell: mainCell.set,
        automaton: {
            cellsNbhds: {
                set: (width: number, type: NbhdType, mainCell: number) =>
                    automaton1d.current.setCellsNbhds(width, type, mainCell),
                get: (index: number) => automaton1d.current.getCellNbhd(index),
            },
            rules: {
                toggle: (index: number) => {
                    automaton1d.current.toggleRule(index);
                    rulesUpdate.toggle();
                },
                setRandom: () => {
                    automaton1d.current.setRulesRandom();
                    rulesUpdate.toggle();
                },
                setInverse: () => {
                    automaton1d.current.setRulesInverse();
                    rulesUpdate.toggle();
                },
                setAlive: () => {
                    automaton1d.current.setRulesAlive();
                    rulesUpdate.toggle();
                },
                setDead: () => {
                    automaton1d.current.setRulesDead();
                    rulesUpdate.toggle();
                },
            },
            state: {
                set: (
                    liveCells: number,
                    groupMinSize: number,
                    groupMaxSize: number,
                    distribution: DistributionType
                ) => {
                    automaton1d.current.setCellsState(
                        liveCells,
                        groupMinSize,
                        groupMaxSize,
                        distribution
                    );
                    initStateUpdate.toggle();
                },
                toggleCell: (index: number) => {
                    automaton1d.current.toggleCellState(index);
                    initStateUpdate.toggle();
                },
                get: () => automaton1d.current.cellsState,
                next: () => automaton1d.current.nextCellsState(),
            },
        },
    };

    useEffect(() => {
        if (mainCell.get >= nbhdWidth.get) {
            mainCell.set(nbhdWidth.get - 1);
        }
    }, [nbhdWidth.get]);

    useEffect(() => {
        automaton1d.current.setCellsNbhds(
            nbhdWidth.get,
            nbhdType.get,
            mainCell.get
        );
        rulesUpdate.toggle();
    }, [nbhdWidth.get, nbhdType.get, mainCell.get]);

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
                            value={automaton1d.current.cellsNumber}
                        >
                            <RulesCtx.Provider value={rulesCtx}>
                                <InitStateCtx.Provider value={initStateCtx}>
                                    <APICtx.Provider value={apiCtx}>
                                        {/*  */}

                                        <Title dimension={dimension} />

                                        <Canvas />

                                        {settings}

                                        <Footer />
                                    </APICtx.Provider>
                                </InitStateCtx.Provider>
                            </RulesCtx.Provider>
                        </NumCellsCtx.Provider>
                    </MainCellCtx.Provider>
                </NbhdTypeCtx.Provider>
            </NbhdWidthCtx.Provider>
        </div>
    );
}
