//

import "./css/style.css";

import ComponentsEG from "./ComponentsEG";
import Title from "./sections/Title";
import Controls from "./sections/Controls";
import Settings from "./sections/Settings";
import Neighborhood from "./sections/Neighborhood";
import Footer from "./sections/Footer";
import Rules from "./sections/Rules";
import InitialState from "./sections/InitialState";


function App() {
    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}

            {/* <ComponentsEG /> */}

            <Title />
            <Controls />
            <Settings />
            <Neighborhood />
            <Rules />
            <InitialState />
            <Footer />
        </div>
    );
}

export default App;
