//

import FAIcon from "./FAIcon";

function CAPButton(props) {

    let label = props.label == null ? "" : props.label;
    
    return (
        <button type="button"
            title={label}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-original-title={label}
            className="btn cap-btn"
            onClick={props.onClick}>
                <FAIcon iconId={props.iconId} iconStyle={props.iconStyle} iconSize={props.iconSize} />
        </button>
    );
}

export default CAPButton;
