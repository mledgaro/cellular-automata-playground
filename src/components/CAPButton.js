//

import FAIcon from "./FAIcon";

function CAPButton(props) {
    return (
        <button type="button"
            title={props.title}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-original-title={props.label}
            className="btn cap-btn">
                <FAIcon iconId={props.iconId} iconStyle="solid" iconSize={props.iconSize} />
        </button>
    );
}

export default CAPButton;
