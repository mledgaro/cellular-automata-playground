//

function CAPNumberInput(props) {
    return (
        <div class="input-group input-group-lg d-flex justify-content-center">
            <span class="input-group-text cap-text-label">{props.label}</span>

            <input
                type="number"
                class="form-control rounded-end cap-input"
                value={props.value}
                min={props.min}
                max={props.max}
                step="1"
                style={{maxWidth: "5rem"}}
            />
        </div>
    );
}

export default CAPNumberInput;
