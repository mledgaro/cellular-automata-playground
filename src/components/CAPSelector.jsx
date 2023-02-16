//

export default function CAPSelector({ label, options, maxWidth }) {
    //
    // deprecate

    return (
        <div className="input-group input-group-lg d-flex justify-content-center">
            <span className="input-group-text cap-text-label">{label}</span>

            <select
                className="rounded-end cap-input form-select cap-section-neighborhood"
                style={{ maxWidth: `${maxWidth}rem` }}
            >
                {options.map((opt) => (
                    <option value={opt.toLowerCase()}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
