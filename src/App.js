//

import "./css/style.css";

import { useState } from "react";

import ComponentsEG from "./ComponentsEG";

import Title from "./sections/Title";
import Controls from "./sections/Controls";
import { Settings1D, Settings2D } from "./sections/Settings";
import Footer from "./sections/Footer";

function App() {
    //

    let [dimension, setDimension] = useState("1");

    let changeDimension = () => {
        setDimension(dimension === "1" ? "2" : "1");
    };

    let settings;

    if (dimension === "1") {
        settings = <Settings1D />;
    } else {
        settings = <Settings2D />;
    }

    return (
        <div className="App">
            
            {/* <ComponentsEG /> */}

            <Title dimension={dimension} onClick={changeDimension} />
            <Controls />
            
            {settings}

            <Footer />
        </div>
    );
}

export default App;
