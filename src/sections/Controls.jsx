//

import CAPButton from "../components/CAPButton";
import CAPLevelSelector from "../components/CAPLevelSelector";
import { inputGroupClasses } from "../js/Utils";

function Controls() {
    return (
        <div className="row mt-0">
            {/* <!-- Flow --> */}
            <div className="col-lg my-2">
                <div
                    className={inputGroupClasses("", "center", "")}
                >
                    <CAPButton label="Next" iconId="forward-step" />

                    <CAPButton label="Run" iconId="play" />

                    <CAPButton label="Pause" iconId="pause" />

                    <CAPButton label="Stop" iconId="stop" />
                </div>
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg my-2">
                <div
                    className={inputGroupClasses("", "center", "")}
                    id="controls-canvas-container"
                >
                    <CAPButton label="Clear" iconId="broom" />

                    <CAPButton label="Screenshot" iconId="camera-retro" />
                </div>
            </div>

            {/* <!-- Speed --> */}
            <div className="col-lg my-2" id="speed-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabels="Speed"
                    iconId="gauge-high"
                    alignment="center"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg my-2" id="zoom-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabels="Zoom"
                    iconId="magnifying-glass"
                    alignment="center"
                />
            </div>
        </div>
    );
}

export default Controls;
