//

import FAIcon from "../components/FAIcon";

export default function Title({ dimension }) {
    //

    return (
        <div className="input-group input-group-lg justify-content-center mt-2">
            <button type="button" className="btn cap-container-clear-1" onClick={dimension.next}>
                <FAIcon icon={{ id: `${dimension.get}`, size: "2xl" }} />
                <FAIcon icon={{ id: "d", size: "2xl" }} />
            </button>

            <span className="input-group-text cap-container-dark-1" id="app-title">
                Cellular Automata
            </span>
        </div>
    );
}
