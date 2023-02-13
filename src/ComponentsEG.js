//

import CAPButton from "./components/CAPButton";
import CAPButtonGroupSelector from "./components/CAPButtonGroupSelector";
import CAPStateButton from "./components/CAPStateButton";
import CAPCellButton from "./components/CAPCellButton";
import CAPLevelSelector from "./components/CAPLevelSelector";
import { CAPRuleSwitch1D, CAPRuleSwitch2D } from "./components/CAPRuleSwitches";
import CAPNumberInput from "./components/CAPNumberInput";
import CAPSelector from "./components/CAPSelector";


function ComponentsEG() {
    return (
        <div>
            <h3>CAPButton</h3>

            <CAPButton
                title="Button"
                label="Label"
                iconId="play"
                iconSize="xl"
            />

            <h3>CAPButtonGroupSelector</h3>

            <CAPButtonGroupSelector
                labels={["Section A", "Section B", "Section C"]}
            />

            <h3>CAPCellButton</h3>

            <CAPCellButton index="0" />

            <h3>CAPStateButton</h3>

            <CAPStateButton
                icons={["square-minus", "square", "square-check"]}
                iconStyle="solid"
                iconSize="xl"
            />

            <h3>CAPLevelSelector</h3>

            <CAPLevelSelector
                numLevels={5}
                tooltipLabels="Zoom"
                iconId="magnifying-glass"
            />

            <h3>CAPRuleSwitch1D</h3>

            <CAPRuleSwitch1D index={5} labelWidth={4} />

            <h3>CAPRuleSwitch2D</h3>

            <CAPRuleSwitch2D index={0} />

            <h3>CAPNumberInput</h3>

            <CAPNumberInput label="Size" value={3} min={1} max={8} />

            <h3>CAPSelector</h3>

            <CAPSelector
                label="Options"
                maxWidth={10}
                options={["Option A", "Option B", "Option C"]}
            />
        </div>
    );
}

export default ComponentsEG;
