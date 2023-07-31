//

import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    icon,
    tooltipLabel = "",
    enabled = true,
    onClick = () => {},
}: {
    icon: IconDefinition;
    tooltipLabel?: string;
    enabled?: boolean;
    onClick?: () => void;
}): JSX.Element {
    //

    return (
        <button
            type="button"
            className="btn cap-btn"
            title={tooltipLabel}
            data-bs-original-title={tooltipLabel}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            onClick={onClick}
            disabled={!enabled}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
