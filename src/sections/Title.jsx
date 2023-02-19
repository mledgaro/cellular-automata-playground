//

import FAIcon from "../components/FAIcon";

function Title({ dimension }) {
    //

    const onClick = () => {
        dimension.set(dimension.get === 1 ? 2 : 1);
    };

    return (
        <div className="row mt-3">
            <div className="input-group input-group-lg d-flex justify-content-center">
                <button type="button" className="btn cap-btn" onClick={onClick}>
                    <FAIcon icon={{ id: `${dimension.get}`, size: "2xl" }} />
                    <FAIcon icon={{ id: "d", size: "2xl" }} />
                </button>

                <span
                    className="input-group-text cap-text-label"
                    id="title-page"
                >
                    Cellular Automata
                </span>
            </div>
        </div>
    );
}

export default Title;
