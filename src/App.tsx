//
import "./css/App.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import CellularAutomata2d from "./features/ca2d/CellularAutomata2d";
import CellularAutomata1d from "./features/ca1d/CellularAutomata1d";

export const models = [
    { title: "1D Cellular Automata", link: "ca1d" },
    { title: "2D Cellular Automata", link: "ca2d" },
];

export default function App() {
    //
    return (
        <BrowserRouter>
            <Box className="">
                <Routes>
                    <Route index element={<CellularAutomata1d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<CellularAutomata2d />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}
