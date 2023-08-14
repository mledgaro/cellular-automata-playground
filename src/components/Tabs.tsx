import React from "react";
import { Box, Tab, TabProps, Tabs, TabsProps, styled } from "@mui/material";
import { useStateObj } from "src/app/hooks";

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        backgroundColor: "#323031",
        marginBottom: "2vh",
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
        <Box
            sx={{
                width: "80vw",
                // borderColor: "#323031",
                // borderWidth: "2px",
                // borderStyle: "solid",
            }}
            className="mx-auto"
        >
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
                                key={i}
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
                        key={i}
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
