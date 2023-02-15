//

import { useState } from "react";
import CAPOptionGroup from "./CAPOptionGroup";

function CAPSectionSelector(props) {
    //

    let [selected, setSelected] = useState(0);

    return (
        <div className="">
            <CAPOptionGroup
                labels={props.labels}
                selected={selected}
                setSelected={setSelected}
            />
            {props.sections[selected]}
        </div>
    );
}

export default CAPSectionSelector;
