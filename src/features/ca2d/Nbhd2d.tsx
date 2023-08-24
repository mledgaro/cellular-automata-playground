//
import React from "react";
import CustomRadioGroup from "src/components/RadioGroup";
import { Grid } from "@mui/material";
import Nbhd2dEditor from "./Nbhd2dEditor";
import { Nbhd2dHook } from "src/app/hooks/nbhd2d";
import { NbhdType2D } from "src/app/types";

export default function Neighborhood2D({ state }: { state: Nbhd2dHook }) {
    //
    return (
        <Grid container className="section-container">
            {/* row */}
            <Grid item container alignItems="center" className="">
                {/* type */}
                <Grid item xs className="flex justify-center">
                    <CustomRadioGroup
                        className="h-fit"
                        label="Type"
                        options={[
                            { label: "Moore", value: "moore" },
                            { label: "Von Neumann", value: "vonneumann" },
                            { label: "Custom", value: "custom" },
                        ]}
                        defaultVal="moore"
                        value={state.type}
                        onChange={(val: string) =>
                            state.setType(val as NbhdType2D)
                        }
                    />
                </Grid>
                {/* main cell selector */}
                <Grid item xs className="flex justify-center">
                    <Nbhd2dEditor
                        state={state}
                        editable={state.type === "custom"}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
