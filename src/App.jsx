//

import "./css/App.css";

import { createContext, useState } from "react";

import Title from "./sections/Title";
import Controls from "./sections/Controls";
import Settings from "./sections/settings/Settings";
import Footer from "./sections/Footer";

function App() {
    //

    // const AppContext = createContext();

    let [dimension, setDimension] = useState(1);

    return (
        // <AppContext value={{ numCells: numCells, mainCell: mainCell }}>
        <div className="App">
            <Title dimension={{ get: dimension, set: setDimension }} />
            
            <Controls />

            <Settings dimension={dimension} />

            <Footer />
        </div>
        // </AppContext>
    );
}

export default App;
