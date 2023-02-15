//

import CAPSectionSelector from "../components/CAPSectionSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";

export function Settings1D(props) {
    //

    return (
        <CAPSectionSelector
            labels={["Neighborhood", "Rules", "Initial state"]}
            sections={[
                <Neighborhood1D
                    nbhdWidth={props.nbhdWidth}
                    mainCell={props.mainCell}
                />,
                <Rules1D />,
                <InitialState cellsNumber={100} />,
            ]}
        />
    );
}

export function Settings2D() {
    //

    return (
        <CAPSectionSelector
            labels={["Neighborhood", "Rules"]}
            sections={[<Neighborhood2D />, <Rules2D />]}
        />
    );
}
