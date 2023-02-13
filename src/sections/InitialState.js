//

import CAPButton from "../components/CAPButton";
import CAPCellButton from "../components/CAPCellButton";

function InitialState() {
    let cells = [];

    for (let i = 0; i < 100; i++) {
        cells.push(<CAPCellButton index={i} />);
    }

    return (
        <div>
            <div className="row mb-2">
                <div class="col-lg">
                    <div class="input-group input-group-lg d-flex justify-content-center">
                        <CAPButton
                            title="Clear"
                            label="Clear"
                            iconId="broom"
                            iconSize="lg"
                        />

                        {/* <!-- Random density --> */}
                        <input
                            type="number"
                            class="form-control cap-section-initial-state"
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

                        <CAPButton
                            title="Random"
                            label="Random"
                            iconId="shuffle"
                            iconSize="lg"
                        />

                        <CAPButton
                            title="Neighborhoods"
                            label="Neighborhoods"
                            iconId="circle-nodes"
                            iconSize="lg"
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
