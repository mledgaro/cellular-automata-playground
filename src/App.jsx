//

import "./css/App.css";

import { useRangeReducer, useStateObj } from "./components/CustomHooks";
import { buildState, intToBoolArray } from "./js/Utils";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";
import { Settings1D, Settings2D } from "./sections/settings/Settings";
import Footer from "./sections/Footer";

const numCells = 256;

export default function App() {
    //

    const dimension = useRangeReducer(1, 2, 1, true);

    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const mainCell = useStateObj(1);

    const includeMainCell = useStateObj("cellin");
    const nbhdType = useStateObj("contiguos");

    const rulesState = useStateObj(
        intToBoolArray(90, Math.pow(2, nbhdWidth.get))
    );

    const initState = useStateObj(
        buildState("perc", "rand", numCells, 10, 1, 1)
    );

    let settings;

    if (dimension.get === 1) {
        settings = (
            <Settings1D
                numCells={numCells}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
                includeMainCell={includeMainCell}
                nbhdType={nbhdType}
                rulesState={rulesState}
                initState={initState}
            />
        );
    } else {
        // dimension.get === 2
        settings = <Settings2D />;
    }

    return (
        <div className="App">
            <Title dimension={dimension} />

            <Canvas />

            <Controls />

            {settings}

            <Footer />
        </div>
    );
}
