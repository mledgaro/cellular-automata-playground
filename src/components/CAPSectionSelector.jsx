//

import { inputGroupClasses } from "../js/Utils";


function CAPOptionGroup({
    labels,
    selected,
    size,
    alignment,
    bs5Class,
}) {
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

    return (
        <div className={inputGroupClasses(size, alignment, `my-3 ${bs5Class}`)}>
            {options}
        </div>
    );
}
export default function CAPSectionSelector({
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
