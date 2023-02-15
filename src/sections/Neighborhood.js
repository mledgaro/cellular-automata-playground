//

import { CAPNeighborhood1D } from "../components/CAPNeighborhood";
import CAPNumberInput from "../components/CAPNumberInput";
import CAPSelector from "../components/CAPSelector";
import CAPSectionSelector from "../components/CAPSectionSelector";

export function Neighborhood1D() {
    //

    return (
        <CAPSectionSelector
            labels={["In situ", "Grouped", "Scattered"]}
            sections={[
                <CAPNeighborhood1D type="insitu" />,
                <CAPNeighborhood1D type="grouped" />,
                <CAPNeighborhood1D type="scattered" />,
            ]}
        />
    );
}

export function Neighborhood2D() {
    //

    let component = (
        <div className="row">
            <div className="col">
                <CAPNumberInput label="Size" value={3} min={1} max={8} />
            </div>

            <div className="col">
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
        <CAPSectionSelector
            labels={["Moore", "Von Neumann", "Diagonal"]}
            sections={[component, <div>Von Neumann</div>, <div>Diagonal</div>]}
        />
    );
}
