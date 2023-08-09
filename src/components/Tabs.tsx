import React from "react";
import { Box, Tab, TabProps, Tabs, TabsProps, styled } from "@mui/material";
import { useStateObj } from "src/app/hooks";

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        backgroundColor: "#323031",
        marginBottom: "1rem",
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#ffd166",
        height: "5px",
    },
}));

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
    fontWeight: "200",
    color: "#bbb5bd",
    "&.Mui-selected": {
        color: "#ffd166",
        fontWeight: "900",
    },
}));

export default function CustomTabs({
    tabs,
}: {
    tabs: { title: string; content: JSX.Element }[];
}) {
    //
    const selected = useStateObj(0);

    return (
        <Box sx={{ width: "80vw" }} className="mx-auto mt-3">
            <Box>
                <StyledTabs
                    value={selected.get}
                    onChange={(e, idx) => selected.set(idx)}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                >
                    {tabs.map((e, i) => {
                        return (
                            <StyledTab
                                label={e.title}
                                id={`cstm-tab-${i}`}
                                aria-controls={`cstm-tabpanel-${i}`}
                            />
                        );
                    })}
                </StyledTabs>
            </Box>
            {tabs.map((e, i) => {
                return (
                    <div
                        role="tabpanel"
                        hidden={selected.get !== i}
                        id={`cstm-tabpanel-${i}`}
                        aria-labelledby={`cstm-tab-${i}`}
                    >
                        {selected.get === i && e.content}
                    </div>
                );
            })}
        </Box>
    );
}
