//
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    RadioProps,
    styled,
} from "@mui/material";
import React, { useId } from "react";

export const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    color: "#bbb5bd",
    "&.Mui-checked": {
        color: "#ffd166",
    },
}));

export default function CustomRadioGroup({
    label,
    options,
    value,
    defaultVal,
    onChange,
}: {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    defaultVal: string;
    onChange: (val: string) => void;
}) {
    const id = useId();

    return (
        <FormControl className="cap-component-container pl-3 pt-1">
            <FormLabel id={id} className="cap-component-label">
                {label}
            </FormLabel>
            <RadioGroup
                aria-labelledby={id}
                defaultValue={defaultVal}
                name="radio-buttons-group"
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
                            label={e.label}
                        />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
}
