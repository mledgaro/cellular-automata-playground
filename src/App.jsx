//

import "./css/App.css";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";
import Settings from "./sections/settings/Settings";
import Footer from "./sections/Footer";
import { useRangeReducer } from "./components/CustomHooks";

export default function App() {
    //

    let dimension = useRangeReducer(1, 2, 1, true);

    return (
        <div className="App">
            <Title dimension={dimension} />

            <Canvas />

            <Controls />

            <Settings dimension={dimension.get} />

            <Footer />
        </div>
    );
}
