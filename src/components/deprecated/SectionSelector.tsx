//

import React from "react";

import Group, { Alignment, Size } from "./Group";
import Title from "../Title";
import { StateHookObj } from "src/app/hooks";

export function OptionGroup({
    options,
    selected,
    size,
    alignment,
    additionalClasses,
}: {
    options: { label: string; value: string }[];
    selected: StateHookObj;
    size?: Size;
    alignment?: Alignment;
    additionalClasses?: string;
}) {
    //

    return (
        <Group
            size={size}
            alignment={alignment}
            additionalClasses={additionalClasses}
            elements={options.map((opt, i) => {
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
        />
    );
}

export default function SectionSelector({
    title,
    sections,
    selected,
    size,
    alignment,
    additionalClasses = "",
}: {
    title: string;
    sections: { label: string; value: string; component: JSX.Element }[];
    selected: StateHookObj;
    size?: Size;
    alignment?: Alignment;
    additionalClasses?: string;
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
                additionalClasses={additionalClasses}
            />
            {visibleSection}
        </div>
    );
}
