//

import CAPNumberInput from "../components/CAPNumberInput";
import CAPSelector from "../components/CAPSelector";

function Neighborhood() {
    //

    const d1 = (
        <div className="row">
            <div class="col-lg">
                <CAPNumberInput label="Size" value={3} min={1} max={8} />
            </div>

            <div class="col-lg">
                <CAPSelector
                    label="Type"
                    maxWidth={10}
                    options={["In situ", "Scattered", "Grouped"]}
                />
            </div>

            <div class="col-lg">
                <CAPSelector
                    label="Alignment"
                    maxWidth={8}
                    options={["Left", "Right"]}
                />
            </div>
        </div>
    );

    const d2 = (
        <div className="row">
            <div class="col-lg">
                <CAPNumberInput label="Size" value={3} min={1} max={8} />
            </div>

            <div class="col-lg">
                <CAPSelector
                    label="Type"
                    maxWidth={12}
                    options={["Moore", "Von Neumann", "Diagonal"]}
                />
            </div>

            <div class="col-lg">
                <CAPSelector
                    label="Alignment"
                    maxWidth={12}
                    options={[
                        "Top Left",
                        "Top Right",
                        "Bottom Left",
                        "Bottom Right",
                    ]}
                />
            </div>
        </div>
    );

    return (
        <div>
            {d1}
            {d2}
        </div>
    );
}

export default Neighborhood;
