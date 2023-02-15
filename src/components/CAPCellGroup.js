//

import FAIcon from "./FAIcon";

function CAPCellGroup(props) {
    //

    // let [index, setIndex] = useState(1);

    // let [numCells, setNumCells] = useState(props.cells);

    let cells = [];

    for (let i = 0, icon; i < props.numCells; i++) {
        icon = props.selected === i ? "square-check" : "square";
        cells.push(
            <span
                className="input-group-text cap-text-label px-1"
                onClick={() => props.setSelected(i)}
            >
                &nbsp;
                <FAIcon iconId={icon} iconStyle="regular" iconSize="2xl" />
            </span>
        );
    }

    return (
        <div className="input-group d-flex justify-content-start">{cells}</div>
    );
}

export default CAPCellGroup;
