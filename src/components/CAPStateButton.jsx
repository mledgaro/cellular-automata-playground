//

import { useState } from "react";
import FAIcon from "./FAIcon";

export default function CAPStateButton({ icons }) {
    //
    // TODO - Receive state as parameter. Receive an array of icon objects instead of separated array of properties.

    let lastState = icons.length - 1;

    const [index, setIndex] = useState(0);

    const nextIndex = () => {
        setIndex(index === lastState ? 0 : index + 1);
    };

    return (
        <button type="button" className="btn cap-btn" onClick={nextIndex}>
            <FAIcon icon={icons[index]} />
        </button>
    );
}
