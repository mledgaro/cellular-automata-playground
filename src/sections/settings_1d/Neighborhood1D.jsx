//

import { createContext, useContext } from "react";

import SectionSelector from "../../components/SectionSelector";
import { NbhdInput } from "../../components/CellGroup";
import NumberInput from "../../components/NumberInput";
import { useBoolArrState } from "../../components/CustomHooks";

const WidthCtx = createContext();
const TypeCtx = createContext();
const MainCellCtx = createContext();
const CellsNbhdsCtx = createContext();
const APICtx = createContext();

function Width() {
    //

    const width = useContext(WidthCtx);
    const api = useContext(APICtx);

    return (
        <NumberInput
            label="Width"
            value={{
                get: width,
                prev: api.width.prev,
                next: api.width.next,
                set: api.width.set,
            }}
            min={2}
            max={8}
            alignment="center"
        />
    );
}

function Type() {
    //

    const type = useContext(TypeCtx);
    const api = useContext(APICtx);

    return (
        <SectionSelector
            title="Type"
            sections={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            selected={{ get: type, set: api.type.set }}
            size="sm"
            alignment="center"
        />
    );
}

function MainCell() {
    //

    const width = useContext(WidthCtx);
    const type = useContext(TypeCtx);
    const mainCell = useContext(MainCellCtx);
    const api = useContext(APICtx);

    return (
        <NbhdInput
            type={type}
            nbhdWidth={width}
            selection={{ get: mainCell, set: api.mainCell.set }}
        />
    );
}

function Cell({ index, highlightedCells }) {
    //

    const cellsNbhds = useContext(CellsNbhdsCtx);

    const highlight = () => {
        cellsNbhds[index].forEach((e) => highlightedCells.toggle(e));
    };

    const classes = `cap-cell cap-cell-off ${
        highlightedCells.get[index] ? "cap-cell-high" : ""
    }`;

    return (
        <span
            className={classes}
            onMouseOver={highlight}
            onMouseOut={highlight}
            // onClick={() => highlightedCells.toggle(index)}
        />
    );
}

function NbhdsMap() {
    //

const cellsNbhds = useContext(CellsNbhdsCtx);
    const highlightedCells = useBoolArrState(cellsNbhds.length);

    // console.log(highlightedCells.get);

    return (
        <div className="row mx-auto ps-2 mt-2" style={{ width: "90%" }}>
            {highlightedCells.get.map((e, i) => (
                <Cell
                    key={i}
                    index={i}
                    highlightedCells={highlightedCells}
                />
            ))}
        </div>
    );
}

function Content() {
    //

    return (
        <div>
            <div className="row mx-auto" style={{ width: "80%" }}>
                {/* */}

                <div className="col d-flex align-items-center">
                    <Width />
                </div>

                <div className="col">
                    <Type />
                </div>

                <div className="col d-flex align-items-center">
                    <MainCell />
                </div>
            </div>

            <NbhdsMap />
        </div>
    );
}

export default function Neighborhood1D({ width, type, mainCell, cellsNbhds }) {
    //

    const api = {
        width: {
            next: width.next,
            prev: width.prev,
            set: width.set,
        },
        type: { set: type.set },
        mainCell: { set: mainCell.set },
        cellsNbhds: {
            set: cellsNbhds.set,
            setAt: cellsNbhds.setAt,
        },
    };

    return (
        <WidthCtx.Provider value={width.get}>
            <TypeCtx.Provider value={type.get}>
                <MainCellCtx.Provider value={mainCell.get}>
                    <CellsNbhdsCtx.Provider value={cellsNbhds.get}>
                        <APICtx.Provider value={api}>
                            <Content />
                        </APICtx.Provider>
                    </CellsNbhdsCtx.Provider>
                </MainCellCtx.Provider>
            </TypeCtx.Provider>
        </WidthCtx.Provider>
    );
}
