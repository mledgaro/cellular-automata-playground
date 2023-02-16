//

import CAPButton from "../components/CAPButton";
import CAPLevelSelector from "../components/CAPLevelSelector";
import { inputGroupClasses } from "../js/Utils";

export default function Controls() {
    //

    return (
        <div className="row mt-0">
            {/* <!-- Flow --> */}
            <div className="col-lg my-2">
                <div className={inputGroupClasses("", "center", "")}>
                    <CAPButton
                        tooltipLabel="Next"
                        icon={{ id: "forward-step" }}
                    />

                    <CAPButton tooltipLabel="Run" icon={{ id: "play" }} />

                    <CAPButton tooltipLabel="Pause" icon={{ id: "pause" }} />

                    <CAPButton tooltipLabel="Stop" icon={{ id: "stop" }} />
                </div>
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg my-2">
                <div
                    className={inputGroupClasses("", "center", "")}
                    id="controls-canvas-container"
                >
                    <CAPButton tooltipLabel="Clear" icon={{ id: "broom" }} />

                    <CAPButton
                        tooltipLabel="Screenshot"
                        icon={{ id: "camera-retro" }}
                    />
                </div>
            </div>

            {/* <!-- Speed --> */}
            <div className="col-lg my-2" id="speed-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabel="Speed"
                    iconId="gauge-high"
                    alignment="center"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg my-2" id="zoom-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabel="Zoom"
                    iconId="magnifying-glass"
                    alignment="center"
                />
            </div>
        </div>
    );
}
