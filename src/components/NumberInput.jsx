//

import { useState } from "react";
import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";

export default function NumberInput({
    value,
    min,
    max,
    label,
    size,
    alignment,
    extraClasses,
}) {
    //

    let [tmp, setTmp] = useState(value.get);

    return (
        <div className={inputGroupClasses(size, alignment, ` ${extraClasses}`)}>
            {label != null && (
                <span className="input-group-text cap-container-dark-1">
                    {label}
                </span>
            )}

            <Button
                icon={{ id: "minus" }}
                enabled={value.get > min}
                onClick={() => {
                    value.set(value.get - 1);
                    setTmp(tmp - 1);
                }}
            />

            <input
                type="text"
                className=" cap-container-dark-1 cap-input-text"
                value={tmp}
                onChange={(e) => setTmp(e.target.value)}
                onBlur={(e) => {
                    if (!isNaN(tmp)) {
                        let val = Number(tmp);
                        val = val < min ? min : val > max ? max : val;
                        setTmp(val);
                        value.set(val);
                    } else {
                        setTmp(min);
                        value.set(min);
                    }
                }}
                size={1}
            />

            <Button
                icon={{ id: "plus" }}
                enabled={value.get < max}
                onClick={() => {
                    value.set(value.get + 1);
                    setTmp(tmp + 1);
                }}
            />
        </div>
    );
}
