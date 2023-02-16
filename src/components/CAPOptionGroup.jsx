//

import { inputGroupClasses } from "../js/Utils";

export default function CAPOptionGroup({
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
