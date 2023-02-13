//

import CAPButton from "../components/CAPButton";
import CAPLevelSelector from "../components/CAPLevelSelector";

function Controls() {
    return (
        <div class="row mt-0">
            {/* <!-- Flow --> */}
            <div class="col-lg my-2">
                <div
                    class="input-group d-flex justify-content-center"
                    id="controls-flow-container"
                >
                    <CAPButton
                        title="Next"
                        label="Next"
                        iconId="forward-step"
                        iconSize="lg"
                    />

                    <CAPButton
                        title="Run"
                        label="Run"
                        iconId="play"
                        iconSize="lg"
                    />

                    <CAPButton
                        title="Pause"
                        label="Pause"
                        iconId="pause"
                        iconSize="lg"
                    />

                    <CAPButton
                        title="Stop"
                        label="Stop"
                        iconId="stop"
                        iconSize="lg"
                    />
                </div>
            </div>

            {/* <!-- Canvas --> */}
            <div class="col-lg my-2">
                <div
                    class="input-group d-flex justify-content-center"
                    id="controls-canvas-container"
                >
                    <CAPButton
                        title="Clear"
                        label="Clear"
                        iconId="broom"
                        iconSize="lg"
                    />

                    <CAPButton
                        title="Screenshot"
                        label="Screenshot"
                        iconId="camera-retro"
                        iconSize="lg"
                    />
                </div>
            </div>

            {/* <!-- Speed --> */}
            <div class="col-lg my-2" id="speed-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabels="Speed"
                    iconId="gauge-high"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div class="col-lg my-2" id="zoom-level-container">
                <CAPLevelSelector
                    numLevels={5}
                    tooltipLabels="Zoom"
                    iconId="magnifying-glass"
                />
            </div>
        </div>
    );
}

export default Controls;
