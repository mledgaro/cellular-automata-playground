//

import FAIcon from "../components/FAIcon";

function Title(props) {
    //

    return (
        <div className="row mt-3">
            <div className="input-group input-group-lg d-flex justify-content-center">
                <button
                    type="button"
                    className="btn cap-btn"
                    onClick={props.onClick}
                >
                    <FAIcon iconId={props.dimension} iconSize="2xl" />
                    <FAIcon iconId="d" iconSize="2xl" />
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
