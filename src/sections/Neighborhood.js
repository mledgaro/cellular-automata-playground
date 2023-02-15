//

import { CAPNeighborhood1D } from "../components/CAPNeighborhood";
import CAPNumberInput from "../components/CAPNumberInput";
import CAPSelector from "../components/CAPSelector";
import CAPSectionSelector from "../components/CAPSectionSelector";

export function Neighborhood1D() {
    //

    return (
        <CAPSectionSelector
            labels={["In situ", "Scattered", "Grouped"]}
            sections={[
                <CAPNeighborhood1D />,
                <div>Scattered</div>,
                <div>Grouped</div>,
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
            sections={[
                component,
                <div>Von Neumann</div>,
                <div>Diagonal</div>,
            ]}
        />
    );
}
