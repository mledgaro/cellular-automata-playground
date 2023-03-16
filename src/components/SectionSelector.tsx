//

import React from "react";

import { Alignment, inputGroupClasses, Size } from "../ts/Utils";
import { StateObjHook } from "../ts/CustomHooks";
import Title from "./Title";

export function OptionGroup({
    options,
    selected,
    size,
    alignment,
    bs5Class = "",
}: {
    options: { label: string; value: string }[];
    selected: StateObjHook;
    size: Size;
    alignment: Alignment;
    bs5Class?: string;
}) {
    //

    return (
        <div className={inputGroupClasses(size, alignment, `${bs5Class}`)}>
            {options.map((opt, i) => {
                //

                let selectedClass =
                    opt.value === selected.get
                        ? "cap-btn-group-select-active"
                        : "";

                return (
                    <button
                        key={i}
                        type="button"
                        className={`btn cap-btn-group-select ${selectedClass}`}
                        onClick={() => selected.set(opt.value)}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

export default function SectionSelector({
    title,
    sections,
    selected,
    size,
    alignment,
    bs5Class = "",
}: {
    title: string;
    sections: { label: string; value: string; component: JSX.Element }[];
    selected: StateObjHook;
    size: Size;
    alignment: Alignment;
    bs5Class?: string;
}) {
    //

    const options = sections.map((e) => {
        return { label: e.label, value: e.value };
    });

    let visibleSection = sections[0].component;

    for (let i = 0; i < sections.length; i++) {
        if (sections[i].value === selected.get) {
            visibleSection = sections[i].component;
            break;
        }
    }

    return (
        <div className="">
            <Title text={title} />
            <OptionGroup
                options={options}
                selected={selected}
                size={size}
                alignment={alignment}
                bs5Class={bs5Class}
            />
            {visibleSection}
        </div>
    );
}
