//

import React from "react";

export default function Title({
    text,
    size = "large",
}: {
    text: string;
    size?: "small" | "medium" | "large";
}) {
    return (
        <div
            className="cap-title cap-container-dark-1 mx-auto"
            style={{ fontSize: size }}
        >
            {text}
        </div>
    );
}
