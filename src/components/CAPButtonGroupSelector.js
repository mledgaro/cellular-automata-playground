//

import { useState } from "react";

function CAPButtonGroupSelector(props) {
    let [selected, setSelected] = useState(0);

    return (
        <div className="input-group input-group-lg d-flex justify-content-center">
            {props.labels.map((item, idx) => (
                <button
                    type="button"
                    className={
                        "btn cap-btn-group-select " +
                        (idx == selected ? "cap-btn-group-select-active" : "")
                    }
                    onClick={() => setSelected(idx)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default CAPButtonGroupSelector;
