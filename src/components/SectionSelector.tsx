//

import React from "react";

import { Alignment, inputGroupClasses, Size } from "../ts/Utils";
import { StateObjHook } from "../CustomHooks";

export function OptionGroup({
    title,
    options,
    selected,
    size,
    alignment,
    bs5Class,
}: {
    title: string;
    options: { label: string; value: string }[];
    selected: StateObjHook;
    size: Size;
    alignment: Alignment;
    bs5Class?: string;
}) {
    //

    let options_ = options.map((opt, i) => {
        //

        let selectedClass =
            opt.value === selected.get ? "cap-btn-group-select-active" : "";

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
    });

    let titleSize =
        size === "sm" ? "small" : size === "lg" ? "large" : "medium";

    return (
        <div className={`my-2 ${bs5Class || ""}`}>
            {title != null && (
                <div
                    className="cap-section-selector-title cap-container-dark-1 mx-auto mb-2"
                    style={{ fontSize: titleSize }}
                >
                    {title}
                </div>
            )}

            <div className={inputGroupClasses(size, alignment, "")}>
                {options_}
            </div>
        </div>
    );
}

export default function SectionSelector({
    title,
    sections,
    selected,
    size,
    alignment,
    bs5Class,
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
            <OptionGroup
                title={title}
                options={options}
                selected={selected}
                size={size}
                alignment={alignment}
                bs5Class={bs5Class || ""}
            />
            {visibleSection}
        </div>
    );
}
