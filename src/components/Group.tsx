//

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Position } from "src/ts/Utils";

export type Size = "sm" | "md" | "lg";
export type Alignment = "none" | "start" | "center" | "end";

export default function Group({
    icon,
    label = "",
    tooltipLabel = "",
    tooltipPlacement = "none",
    size = "md",
    alignment = "center",
    additionalClasses = "",
    elements,
}: {
    icon?: IconDefinition;
    label?: string;
    tooltipLabel?: string;
    tooltipPlacement?: Position;
    size?: Size;
    alignment?: Alignment;
    additionalClasses?: string;
    elements: JSX.Element[];
}) {
    //

    let size_;
    if (size !== "md") {
        size_ = `input-group-${size}`;
    } else {
        size_ = "";
    }

    let alignment_;
    if (alignment !== "none") {
        alignment_ = `d-flex justify-content-${alignment}`;
    } else {
        alignment_ = "";
    }

    let classes = `input-group ${size_} ${alignment_} ${additionalClasses}`;

    return (
        <div className={classes}>
            {(icon != null || label !== "") && (
                <span
                    className="input-group-text cap-container-dark-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement={tooltipPlacement}
                    title={tooltipLabel}
                >
                    {icon && <FontAwesomeIcon icon={icon} />}
                    {label != null && label}
                </span>
            )}
            {elements}
        </div>
    );
}
