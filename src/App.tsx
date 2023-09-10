//
import "./css/App.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateObj } from "src/app/hooks";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Box } from "@mui/material";
import CellularAutomata2d from "./features/ca2d/CellularAutomata2d";
import CellularAutomata1d from "./features/ca1d/CellularAutomata1d";
import { FloatMenu } from "./components/Menu";

export default function App() {
    //

    const items = [
        { title: "Cellular Automata 1D", link: "ca1d" },
        { title: "Cellular Automata 2D", link: "ca2d" },
    ];

    return (
        <BrowserRouter>
            <Box className="space-y-4">
                <Title items={items} selected={0} />
                <Routes>
                    <Route index element={<CellularAutomata1d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<CellularAutomata2d />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

function Title({
    items,
    selected,
}: {
    items: { title: string; link: string }[];
    selected: number;
}) {
    //
    const title = useStateObj(items[selected].title ?? "n/a");

    return (
        <Box className="cap-component-container mx-auto mt-4 w-fit flex flex-row items-center space-x-2 p-2">
            <Box className="text-3xl">{title.get}</Box>
            <FloatMenu
                icon={faChevronDown}
                iconOnShow={faChevronUp}
                content={
                    <Box className="flex flex-col space-y-1 text-xl">
                        {items.map((item) => (
                            <Link
                                to={item.link}
                                onClick={() => title.set(item.title)}
                                className="text-[--primary]"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                }
                boxProps="top-0 right-0 translate-y-[3rem] w-[12.5rem] p-3"
            />
        </Box>
    );
}
