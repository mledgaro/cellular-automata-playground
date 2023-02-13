//

import { useState } from "react";
import FAIcon from "./FAIcon.js";

function CAPStateButton(props) {
    //
    let lastState = props.icons.length - 1;

    const [iconIdx, setIconIdx] = useState(0);

    const nextIndex = () => {
        setIconIdx(iconIdx === lastState ? 0 : iconIdx + 1);
    };

    let icon = props.icons[iconIdx];

    return (
        <button type="button" className="btn cap-btn" onClick={nextIndex}>
            <FAIcon
                iconId={icon}
                iconStyle={props.iconStyle}
                iconSize={props.iconSize}
            />
        </button>
    );
}

export default CAPStateButton;
