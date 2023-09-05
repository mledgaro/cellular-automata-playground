//
import "./css/App.css";

import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateObj } from "src/app/hooks";

import { Button, Menu, MenuItem, MenuProps, styled } from "@mui/material";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box } from "@mui/material";
import CellularAutomata2d from "./features/ca2d/CellularAutomata2d";
import CellularAutomata1d from "./features/ca1d/CellularAutomata1d";

export default function App() {
    //
    return (
        <BrowserRouter>
            <Box>
                <Box className="mx-auto mt-4 w-fit">
                    <TitleMenu
                        items={[
                            { title: "Cellular Automata 1D", link: "ca1d" },
                            { title: "Cellular Automata 2D", link: "ca2d" },
                        ]}
                        selected={1}
                    />
                </Box>
                <Routes>
                    <Route index element={<CellularAutomata2d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<CellularAutomata2d />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: 10,
        minWidth: 180,
        "& .MuiMenu-list": {
            padding: "8px",
            a: {
                color: "var(--primary)",
            },
        },
        backgroundColor: "var(--secondary)",
    },
}));

function TitleMenu({
    items,
    selected,
}: {
    items: { title: string; link: string }[];
    selected: number;
}) {
    //
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const title = useStateObj(items[selected].title ?? "");

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorEl(event.currentTarget);
                }}
                className="bg-secondary text-primary text-4xl font-bold rounded-[8px]"
            >
                {title.get}
                <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {items.map((item) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                title.set(item.title);
                                setAnchorEl(null);
                            }}
                        >
                            <Link to={item.link}>{item.title}</Link>
                        </MenuItem>
                    );
                })}
                {/* <Divider sx={{ my: 0.5 }} /> */}
            </StyledMenu>
        </div>
    );
}
