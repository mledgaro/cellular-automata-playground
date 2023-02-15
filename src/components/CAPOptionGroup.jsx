//

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
        <div className="input-group input-group-lg d-flex justify-content-center mb-3">
            {options}
        </div>
    );
}

export default CAPOptionGroup;