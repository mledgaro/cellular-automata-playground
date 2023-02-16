//

import FAIcon from "./FAIcon";

export default function CAPButton({
    icon,
    tooltipLabel,
    onClick,
}) {
    //

    tooltipLabel = tooltipLabel == null ? "" : tooltipLabel;

    return (
        <button
            type="button"
            title={tooltipLabel}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-original-title={tooltipLabel}
            className="btn cap-btn"
            onClick={onClick}
        >
            <FAIcon icon={icon} />
        </button>
    );
}
