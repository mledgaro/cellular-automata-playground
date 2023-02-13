//

function CAPSelector(props) {
    return (
        <div className="input-group input-group-lg d-flex justify-content-center">
            <span class="input-group-text cap-text-label">{props.label}</span>

            <select
                className="rounded-end cap-input form-select cap-section-neighborhood"
                style={{ maxWidth: `${props.maxWidth}rem` }}
            >
                {props.options.map((opt) => (
                    <option value={opt.toLowerCase()}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

export default CAPSelector;
