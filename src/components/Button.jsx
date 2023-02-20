//

import FAIcon from "./FAIcon";

export default function Button({ icon, tooltipLabel, enabled, onClick }) {
    //

    tooltipLabel = tooltipLabel == null ? "" : tooltipLabel;

    enabled = enabled == null ? true : enabled;

    return (
        <button
            type="button"
            title={tooltipLabel}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-original-title={tooltipLabel}
            className="btn cap-container-clear-1"
            onClick={onClick}
            disabled={!enabled}
        >
            <FAIcon icon={icon} />
        </button>
    );
}
