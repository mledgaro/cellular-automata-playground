//

import { useState } from "react";
import FAIcon from "./FAIcon.js";

function CAPStateButton(props) {
    //
    let lastState = props.icons.length - 1;

    const [index, setIndex] = useState(0);

    const nextIndex = () => {
        setIndex(index === lastState ? 0 : index + 1);
    };

    let icon = props.icons[index];
    let style = props.styles[index];

    return (
        <button type="button" className="btn cap-btn" onClick={nextIndex}>
            <FAIcon iconId={icon} iconStyle={style} iconSize={props.iconSize} />
        </button>
    );
}

export default CAPStateButton;
