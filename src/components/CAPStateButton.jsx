//

import { useState } from "react";
import FAIcon from "./FAIcon";

export default function CAPStateButton({ icons }) {
    //

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
