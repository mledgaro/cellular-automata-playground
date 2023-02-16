//

import "./css/style.css";

import { createContext, useState } from "react";

import Title from "./sections/Title";
import Controls from "./sections/Controls";
import { Settings1D, Settings2D } from "./sections/settings/Settings";
import Footer from "./sections/Footer";

function App() {
    //

    // const AppContext = createContext();

    let [dimension, setDimension] = useState("1");
    let [nbhdWidth, setNbhdWidth] = useState(3);
    let [mainCell, setMainCell] = useState(1);

    let changeDimension = () => {
        setDimension(dimension === "1" ? "2" : "1");
    };

    let settings;

    if (dimension === "1") {
        settings = (
            <Settings1D
                nbhdWidth={{ get: nbhdWidth, set: setNbhdWidth }}
                mainCell={{ get: mainCell, set: setMainCell }}
            />
        );
    } else {
        settings = <Settings2D />;
    }

    return (
        // <AppContext value={{ numCells: numCells, mainCell: mainCell }}>
        <div className="App">
            <Title dimension={dimension} onClick={changeDimension} />
            <Controls />

            {settings}

            <Footer />
        </div>
        // </AppContext>
    );
}

export default App;
