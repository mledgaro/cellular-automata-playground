//

import { inputGroupClasses } from "../js/Utils";

function CAPOptionGroup(props) {
    //

    let options = props.labels.map((label, i) => {
        let selected =
            (i === props.selected.get) ? "cap-btn-group-select-active" : "";
        return (
            <button
                type="button"
                className={`btn cap-btn-group-select ${selected}`}
                onClick={() => props.selected.set(i)}
            >
                {label}
            </button>
        );
    });

    return (
        <div className={inputGroupClasses(props.size, props.alignment, "mb-3")}>
            {props.label != null && (
                <span className="input-group-text cap-text-label">
                    {props.label}
                </span>
            )}
            {options}
        </div>
    );
}

export default CAPOptionGroup;
