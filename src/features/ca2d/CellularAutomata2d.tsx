//
import React, { useEffect, useRef } from "react";

import { useAppSelector } from "src/app/hooks";

import { Box } from "@mui/material";
import { selectNumCells } from "src/app/slices/numCells";
import CustomTabs from "src/components/Tabs";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import useNbhd2d from "src/app/hooks/nbhd2d";
import { useRules2d } from "src/app/hooks/rules2d";
import useInitState2d from "src/app/hooks/initState2d";
import InitState2d from "src/features/ca2d/InitState2d";
import Scene from "src/features/Scene";
import CanvasCntrl from "src/ts/CanvasCntrl";
import { CellularAutomaton2d } from "src/ts/CellularAutomaton2d";

export default function CellularAutomata2d() {
    //
    const numCells = useAppSelector(selectNumCells);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const initState = useInitState2d(64, numCells);

    const automaton = useRef(new CellularAutomaton2d());

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        automaton.current.state = initState.get;
        // canvas?.paintScene(automaton.current.state);
        // canvas?.clear();
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState();
        canvas?.paintScene(automaton.current.state);
        return automaton.current.state;
    };

    const toggle = (canvas: CanvasCntrl | undefined, r: number, c: number) => {
        canvas?.paintCell(r, c, initState.toggle(r, c));
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
            <Scene
                init={init}
                next={next}
                cells={initState.get}
                toggle={toggle}
            />
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
