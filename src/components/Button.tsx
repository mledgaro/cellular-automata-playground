//

import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    icon,
    tooltipLabel,
    enabled = true,
    onClick,
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
            title={tooltipLabel || ""}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-original-title={tooltipLabel || ""}
            className="btn cap-container-clear-1"
            onClick={onClick || (() => {})}
            disabled={!enabled || false}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
