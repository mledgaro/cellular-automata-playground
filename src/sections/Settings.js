//

import CAPButtonGroupSelector from "../components/CAPButtonGroupSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";

export function Settings1D() {
    return (
        <div className="mt-5 mb-3">
            <CAPButtonGroupSelector
                labels={["Neighborhood", "Rules", "Initial state"]}
                components={[
                    <Neighborhood1D />,
                    <Rules1D />,
                    <InitialState cellsNumber={100} />,
                ]}
            />
        </div>
    );
}

export function Settings2D() {
    return (
        <div className="mt-5 mb-3">
            <CAPButtonGroupSelector
                labels={["Neighborhood", "Rules"]}
                components={[<Neighborhood2D />, <Rules2D />]}
            />
        </div>
    );
}
