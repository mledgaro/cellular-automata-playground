//

import CAPButton from "../components/CAPButton";
import CAPCellButton from "../components/CAPCellButton";
import { inputGroupClasses } from "../js/Utils";

function InitialState(props) {
    //

    let cells = [];

    for (let i = 0; i < props.cellsNumber; i++) {
        cells.push(<CAPCellButton index={i} />);
    }

    return (
        <div>
            <div className="row mb-2">
                <div className="col-lg">
                    <div className={inputGroupClasses(props.size, props.alignment, "")}>
                        <CAPButton label="Clear" iconId="broom" />

                        {/* <!-- Random density --> */}
                        <input
                            type="number"
                            className="form-control cap-section-initial-state"
                            value="0,3"
                            min="0,1"
                            max="1"
                            step="0.1"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            style={{ maxWidth: "6rem" }}
                            data-bs-original-title="Density"
                            aria-label="Density"
                        />

                        <CAPButton label="Random" iconId="shuffle" />

                        <CAPButton
                            label="Neighborhoods"
                            iconId="circle-nodes"
                        />
                    </div>
                </div>
            </div>

            {/* <!-- Initial state cells --> */}
            <div className="row px-5" style={{ textAlign: "center" }}>
                {cells}
            </div>
        </div>
    );
}

export default InitialState;
