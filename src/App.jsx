//

import "./css/App.css";

import {
    useArrayState,
    useBoolArrState,
    useRangeReducer,
    useStateObj,
} from "./components/CustomHooks";
import { intToBoolArray } from "./js/Utils";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";

import Footer from "./sections/Footer";
import CellularAutomaton from "./js/CellularAutomaton";
import Settings1D from "./sections/settings_1d/Settings1D";
import Settings2D from "./sections/settings_2d/Settings2D";

const numCells = 256;

export default function App() {
    //

    const dimension = useRangeReducer(1, 2, 1, true);

    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdType = useStateObj("none");
    const mainCell = useStateObj(1);
    const cellsNbhds = useArrayState(
        CellularAutomaton.cellsNbhds(
            nbhdType.get,
            numCells,
            nbhdWidth.get,
            mainCell.get
        )
    );

    const rules = useStateObj(intToBoolArray(90, Math.pow(2, nbhdWidth.get)));

    const initState = useBoolArrState(numCells);

    let settings;

    if (dimension.get === 1) {
        settings = (
            <Settings1D
                numCells={numCells}
                nbhdWidth={nbhdWidth}
                nbhdType={nbhdType}
                mainCell={mainCell}
                cellsNbhds={cellsNbhds}
                rules={rules}
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
