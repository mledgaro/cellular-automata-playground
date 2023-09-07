import React from "react";
import { Box, TextField, TextFieldProps, styled } from "@mui/material";
import { StateObjHook } from "src/app/hooks";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    backgroundColor: "var(--secondary)",
    "& .MuiInputBase-input": {
        color: "var(--tertiary)",
        fontWeight: "600",
    },
    "& label": {
        color: "var(--primary)",
        "&.Mui-focused": {
            color: "var(--primary)",
        },
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "var(--tertiary)",
            color: "var(--tertiary)",
        },
        "&:hover fieldset": {
            borderColor: "var(--primary)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--primary)",
        },
    },
    "&:hover": {},
    "&.Mui-focused": {
        borderColor: "var(--primary)",
        borderWidth: "2px",
        borderStyle: "solid",
        outlineColor: "var(--primary)",
    },
    "&.Mui-focused:hover": {},
}));

export default function InputNumber({
    state,
    min,
    max,
    step = 1,
    ...props
}: TextFieldProps & {
    state: StateObjHook<number>;
    min: number;
    max: number;
    step?: number;
}) {
    return (
        <Box className="cap-component-container w-fit px-1 pb-1 pt-2">
            <StyledTextField
                variant="outlined"
                type="number"
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    step: step,
                    min: min,
                    max: max,
                }}
                value={state.get}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    state.set(Number(event.target.value))
                }
                onBlur={() => {
                    if (state.get < min) {
                        state.set(min);
                    } else if (state.get > max) {
                        state.set(max);
                    }
                }}
                {...props}
            />
        </Box>
    );
}
