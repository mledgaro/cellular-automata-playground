//

import { useState } from "react";

function CAPButtonGroupSelector(props) {

    let [index, setIndex] = useState(0);
    let [component, setComponent] = useState(props.components[index]);

    return (
        <div className="mt-5 mb-3">
            <div className="input-group input-group-lg d-flex justify-content-center mb-3">
                {props.labels.map((item, idx) => (
                    <button
                        type="button"
                        className={
                            "btn cap-btn-group-select " +
                            (idx == index ? "cap-btn-group-select-active" : "")
                        }
                        onClick={() => {
                            setIndex(idx);
                            setComponent(props.components[idx]);
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {component}
        </div>
    );
}

export default CAPButtonGroupSelector;
