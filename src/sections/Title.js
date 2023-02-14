//

import FAIcon from "../components/FAIcon";

function Title(props) {
    //

    return (
        <div class="row mt-3">
            <div class="input-group input-group-lg d-flex justify-content-center">
                <button
                    type="button"
                    className="btn cap-btn"
                    onClick={props.onClick}
                >
                    <FAIcon iconId={props.dimension} iconStyle="solid" iconSize="2xl" />
                    <FAIcon iconId="d" iconStyle="solid" iconSize="2xl" />
                </button>

                <span class="input-group-text cap-text-label" id="title-page">
                    Cellular Automata
                </span>
            </div>
        </div>
    );
}

export default Title;
