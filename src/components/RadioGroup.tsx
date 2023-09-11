//
import {
    Box,
    FormControl,
    FormControlLabel,
    FormControlProps,
    FormLabel,
    Radio,
    RadioGroup,
    RadioGroupProps,
    RadioProps,
    styled,
} from "@mui/material";
import React, { useId } from "react";

export const StyledFormControl = styled(FormControl)<FormControlProps>(
    ({ theme }) => ({
        "& label": {
            color: "var(--primary)",
            fontWeight: "600",
            "&.Mui-focused": {
                color: "var(--primary)",
                fontWeight: "600",
            },
        },
    })
);

export const StyledRadioGroup = styled(RadioGroup)<RadioGroupProps>(
    ({ theme }) => ({
        color: "var(--tertiary)",
        "& label": {
            color: "var(--tertiary)",
            "& .Mui-checked": {
                color: "var(--primary)",
            },
            "& .Mui-checked + span": {
                color: "var(--primary)",
                fontWeight: "600",
            },
        },
    })
);

export const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    color: "var(--tertiary)",
}));

export default function CustomRadioGroup({
    label,
    options,
    value,
    defaultVal,
    onChange,
}: // className = "",
{
    label: string;
    options: { label: JSX.Element | string; value: string }[];
    value: string;
    defaultVal: string;
    onChange: (val: string) => void;
    // className?: string;
}) {
    const id = useId();

    return (
        <StyledFormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <StyledRadioGroup
                aria-labelledby={id}
                defaultValue={defaultVal}
                row
                value={value}
                onChange={(event: React.ChangeEvent, value: string) =>
                    onChange(value)
                }
            >
                {options.map((e, i) => {
                    return (
                        <FormControlLabel
                            key={i}
                            value={e.value}
                            control={<StyledRadio />}
                            label={<Box>{e.label}</Box>}
                        />
                    );
                })}
            </StyledRadioGroup>
        </StyledFormControl>
    );
}
