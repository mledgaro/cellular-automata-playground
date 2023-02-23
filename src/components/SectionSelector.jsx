//

import { inputGroupClasses } from "../js/Utils";

function OptionGroup({ title, options, selected, size, alignment, bs5Class }) {
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
        <div className={`my-2 ${bs5Class}`}>
            {title != null && (
                <div
                    className="cap-section-selector-title cap-container-dark-1 mx-auto mb-1"
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
                bs5Class={bs5Class}
            />
            {visibleSection}
        </div>
    );
}
