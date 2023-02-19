//

import "./css/App.css";

import { useState } from "react";

import Title from "./sections/Title";
import Controls from "./sections/Controls";
import Settings from "./sections/settings/Settings";
import Footer from "./sections/Footer";

export default function App() {
    //

    let [dimension, setDimension] = useState(1);

    return (
        <div className="App">
            <Title dimension={{ get: dimension, set: setDimension }} />
            
            <Controls />

            <Settings dimension={dimension} />

            <Footer />
        </div>
    );
}
