//

import "./css/App.css";

import React, { createContext, useEffect, useRef } from "react";
import { useBoolState, useRangeReducer } from "./ts/CustomHooks";

import Canvas from "./sections/Canvas";
import Settings1D from "./sections/settings_1d/Settings1D";
import Settings2D from "./sections/settings_2d/Settings2D";

import CellularAutomaton, {
    DistributionType,
    NbhdType,
} from "./ts/CellularAutomaton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "./app/hooks";
import { setMainCell } from "./features/mainCell";
import { dataStore } from "./app/store";

export type RulesCtxType = {
    update: boolean;
    get: (index: number) => boolean;
    asNum: number;
    num: number;
};

export type InitStateCtxType = { update: boolean; arr: boolean[] };

export type APICtxType = {
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

export const RulesCtx = createContext<RulesCtxType | null>(null);
export const InitStateCtx = createContext<InitStateCtxType | null>(null);
export const APICtx = createContext<APICtxType | null>(null);

export default function App() {
    //

    const dimension = useRangeReducer(1, 2, 1, true);

    const numCells = dataStore.numCells();
    const nbhdWidth = dataStore.nbhdWidth();
    const nbhdType = dataStore.nbhdType();
    const mainCell = dataStore.mainCell();

    const dispatch = useAppDispatch();

    const automaton1d = useRef(new CellularAutomaton(numCells));

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
        if (mainCell >= nbhdWidth) {
            dispatch(setMainCell(nbhdWidth - 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainCell, nbhdWidth]);

    useEffect(() => {
        automaton1d.current.setCellsNbhds(nbhdWidth, nbhdType, mainCell);
        rulesUpdate.toggle();
    }, [nbhdWidth, nbhdType, mainCell, rulesUpdate]);

    let settings;

    if (dimension.get === 1) {
        settings = <Settings1D />;
    } else {
        // dimension.get === 2
        settings = <Settings2D />;
    }

    return (
        <div className="App">
            <RulesCtx.Provider value={rulesCtx}>
                <InitStateCtx.Provider value={initStateCtx}>
                    <APICtx.Provider value={apiCtx}>
                        {/* Title */}
                        <div className="input-group input-group-lg justify-content-center mt-2">
                            <button
                                type="button"
                                className="btn cap-container-clear-1"
                                onClick={dimension.next}
                            >
                                <FontAwesomeIcon
                                    icon={dimension.get === 1 ? fa1 : fa2}
                                    size="2xl"
                                />
                                <FontAwesomeIcon icon={faD} size="2xl" />
                            </button>

                            <span
                                className="input-group-text cap-container-dark-1"
                                id="app-title"
                            >
                                Cellular Automata
                            </span>
                        </div>

                        <Canvas />

                        {settings}

                        {/* Footer */}
                        <div id="footer" className="mt-5 mb-3">
                            Universidad Nacional Autónoma de México - Facultad
                            de Ciencias
                            <br />
                            Ciencias de la Computación - Vida Artificial 2022-2
                            <br />
                            Edgar Mendoza
                            <br />
                            mledgaro@ciencias.unam.mx
                        </div>
                    </APICtx.Provider>
                </InitStateCtx.Provider>
            </RulesCtx.Provider>
        </div>
    );
}
