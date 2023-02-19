//

import FAIcon from "../components/FAIcon";

export default function Title({ dimension }) {
    //

    const onClick = () => {
        dimension.set(dimension.get === 1 ? 2 : 1);
    };

    return (
        // <div className="row mt-3">
        <div className="input-group input-group-lg justify-content-center mt-2">
            <button type="button" className="btn cap-container-clear-1" onClick={onClick}>
                <FAIcon icon={{ id: `${dimension.get}`, size: "2xl" }} />
                <FAIcon icon={{ id: "d", size: "2xl" }} />
            </button>

            <span className="input-group-text cap-container-dark-1" id="app-title">
                Cellular Automata
            </span>
        </div>
        // </div>
    );
}
