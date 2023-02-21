//

import Button from "../components/Button";
import LevelSelector from "../components/LevelSelector";

import { inputGroupClasses } from "../js/Utils";

function FlowCtrls() {
    //

    return (
        <div className={inputGroupClasses("", "center", "")}>
            <Button tooltipLabel="Next" icon={{ id: "forward-step" }} />

            <Button tooltipLabel="Run" icon={{ id: "play" }} />

            <Button tooltipLabel="Pause" icon={{ id: "pause" }} />

            {/* <Button tooltipLabel="Stop" icon={{ id: "stop" }} /> */}
        </div>
    );
}

function CanvasCtrls() {
    //

    return (
        <div className={inputGroupClasses("", "center", "")}>
            <Button tooltipLabel="Clear" icon={{ id: "broom" }} />

            <Button tooltipLabel="Screenshot" icon={{ id: "camera-retro" }} />
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
                    iconId="gauge-high"
                    alignment="center"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg">
                <LevelSelector
                    numLevels={5}
                    tooltipLabel="Zoom"
                    iconId="magnifying-glass"
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
