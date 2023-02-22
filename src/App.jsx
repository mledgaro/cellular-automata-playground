//

import "./css/App.css";

import { useRef, useState } from "react";

import Title from "./sections/Title";
import Canvas from "./sections/Canvas";
import Controls from "./sections/Controls";
import Settings from "./sections/settings/Settings";
import Footer from "./sections/Footer";
import CanvasCntrl from "./js/CanvasCntrl";

export default function App() {
    //

    let [dimension, setDimension] = useState(1);

    return (
        <div className="App">
            <Title dimension={{ get: dimension, set: setDimension }} />

            <Canvas />

            <Controls />

            <Settings dimension={dimension} />

            <Footer />
        </div>
    );
}
