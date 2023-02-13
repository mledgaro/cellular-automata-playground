//

import "./css/style.css";

import ComponentsEG from "./ComponentsEG";
import Title from "./sections/Title";
import Controls from "./sections/Controls";
import Settings from "./sections/Settings";
import Footer from "./sections/Footer";

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
            <Footer />
        </div>
    );
}

export default App;
