//

import { inputGroupClasses } from "../js/Utils";

function CAPOptionGroup({ labels, selected, title, size, alignment, bs5Class }) {
    //

    let options = labels.map((label, i) => {
        //

        let selectedClass =
            i === selected.get ? "cap-btn-group-select-active" : "";

        return (
            <button
                type="button"
                className={`btn cap-btn-group-select ${selectedClass}`}
                onClick={() => selected.set(i)}
            >
                {label}
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
                {options}
            </div>
        </div>
    );
}
export default function CAPSectionSelector({
    title,
    sections,
    selected,
    size,
    alignment,
    bs5Class,
}) {
    //

    const labels = sections.map((e) => e.label);

    return (
        <div className="">
            <CAPOptionGroup
                title={title}
                labels={labels}
                selected={selected}
                size={size}
                alignment={alignment}
                bs5Class={bs5Class}
            />
            {sections[selected.get].component}
        </div>
    );
}
