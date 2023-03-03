//

import { createContext, useContext } from "react";
import { Cell, DeactivatedCell } from "../../components/Cells";
import NumberInput from "../../components/NumberInput";
import SectionSelector from "../../components/SectionSelector";

const NbhdContext2D = createContext();

function CellGroup2D({ type, width, height, selected, extraClasses }) {
    //

    let isActive;

    switch (type) {
        case "vonneumann":
            isActive = (r, c) => selected.get.r === r || selected.get.c === c;
            break;

        case "diagonal":
            isActive = (r, c) =>
                Math.abs(selected.get.r - r) === Math.abs(selected.get.c - c);
            break;

        default:
            isActive = (r, c) => true;
    }

    let cells = [];

    for (let r = 0, row, sel; r < height; r++) {
        row = [];
        for (let c = 0; c < width; c++) {
            sel = r === selected.get.r && c === selected.get.c;
            row.push(
                <td style={{ padding: "5px" }}>
                    {isActive(r, c) && (
                        <Cell
                            selected={sel}
                            onClick={() => selected.set({ r: r, c: c })}
                        />
                    )}
                    {!isActive(r, c) && <DeactivatedCell />}
                </td>
            );
        }
        cells.push(<tr>{row}</tr>);
    }

    return (
        <table className={`cap-container-dark-1 ${extraClasses}`}>
            {cells}
        </table>
    );
}

function NbhdInput2D({ type }) {
    //

    const nbhdContext = useContext(NbhdContext2D);

    return (
        <div className="row mt-2 mx-auto" style={{ width: "50%" }}>
            <div className="col">
                <NumberInput
                    label="Width"
                    value={nbhdContext.nbhdWidth}
                    min={2}
                    max={8}
                    alignment="center"
                    extraClasses="mb-2"
                />

                <NumberInput
                    label="Height"
                    value={nbhdContext.nbhdHeight}
                    min={2}
                    max={8}
                    alignment="center"
                />
            </div>

            <div className="col">
                <CellGroup2D
                    type={type}
                    width={nbhdContext.nbhdWidth.get}
                    height={nbhdContext.nbhdHeight.get}
                    selected={nbhdContext.mainCell}
                    extraClasses="mx-auto"
                />
            </div>
        </div>
    );
}

export default function Neighborhood2D({
    nbhdType,
    nbhdWidth,
    nbhdHeight,
    mainCell,
}) {
    //

    return (
        <NbhdContext2D.Provider
            value={{
                nbhdWidth: nbhdWidth,
                nbhdHeight: nbhdHeight,
                mainCell: mainCell,
            }}
        >
            <SectionSelector
                sections={[
                    {
                        label: "Moore",
                        value: "moore",
                        component: <NbhdInput2D type="moore" />,
                    },
                    {
                        label: "Von Neumann",
                        value: "vonneuman",
                        component: <NbhdInput2D type="vonneumann" />,
                    },
                    {
                        label: "Diagonal",
                        value: "diagonal",
                        component: <NbhdInput2D type="diagonal" />,
                    },
                ]}
                selected={nbhdType}
                size="sm"
                alignment="center"
                bs5Class="w-75 mx-auto"
            />
        </NbhdContext2D.Provider>
    );
}
