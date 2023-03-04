//

import React from "react";

import {
    faBroom,
    faCameraRetro,
    faForwardStep,
    faGaugeHigh,
    faMagnifyingGlass,
    faPause,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import LevelSelector from "../components/LevelSelector";

import { inputGroupClasses } from "../ts/Utils";

function FlowCtrls() {
    //

    return (
        <div className={inputGroupClasses("md", "center", "")}>
            <Button tooltipLabel="Next" icon={faForwardStep} />

            <Button tooltipLabel="Run" icon={faPlay} />

            <Button tooltipLabel="Pause" icon={faPause} />

            {/* <Button tooltipLabel="Stop" icon={{ id: "stop" }} /> */}
        </div>
    );
}

function CanvasCtrls() {
    //

    return (
        <div className={inputGroupClasses("md", "center", "")}>
            <Button tooltipLabel="Clear" icon={faBroom} />

            <Button tooltipLabel="Screenshot" icon={faCameraRetro} />
        </div>
    );
}

export default function Controls() {
    //

    return (
        <div className="row my-3">
            {/* <!-- Flow --> */}
            <div className="col-lg">
                <FlowCtrls />
            </div>

            {/* <!-- Speed --> */}
            <div className="col-lg">
                <LevelSelector
                    numLevels={5}
                    tooltipLabel="Speed"
                    icon={faGaugeHigh}
                    alignment="center"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg">
                <LevelSelector
                    numLevels={5}
                    tooltipLabel="Zoom"
                    icon={faMagnifyingGlass}
                    alignment="center"
                />
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg">
                <CanvasCtrls />
            </div>
        </div>
    );
}
