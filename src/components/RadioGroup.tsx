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
import React from "react";

const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    color: "#bbb5bd",
    "&.Mui-checked": {
        color: "#ffd166",
    },
}));

export default function CustomRadioGroup({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <FormControl className="bg-jet text-sunglow pl-3 pt-1 mt-2 rounded-md">
            <FormLabel
                id="demo-radio-buttons-group-label"
                className="text-sunglow font-black"
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="adjacent"
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
