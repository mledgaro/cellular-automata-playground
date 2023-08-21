import CanvasCntrl from "./CanvasCntrl";
import { boolArrayToInt } from "./Utils";

export default class CellularAutomaton1D extends CanvasCntrl {
    //
    private currentRow: number;

    constructor(
        canvasId: string,
        rows: number,
        columns: number,
        cellSize: number
    ) {
        //
        super(canvasId, rows, columns, cellSize);
        this.currentRow = 0;
        console.log("automaton constructed");
    }

    private paintCurrentRow() {
        //
        this.buffer[this.currentRow].forEach((cell, col) => {
            this.paintCellAtCoords(
                col * this._cellSize,
                this.currentRow * this._cellSize,
                cell
            );
        });
    }

    public nextState(cellsNbhds: number[][], rules: boolean[]) {
        //
        const nextState = this.buffer[this.currentRow].map(
            (_, i, row) =>
                rules[
                    boolArrayToInt(
                        cellsNbhds[i].map((e) => row[e]),
                        false
                    )
                ]
        );

        if (this.currentRow < this._rows - 1) {
            this.buffer[++this.currentRow] = nextState;
            this.paintCurrentRow();
        } else {
            this.buffer.shift();
            this.buffer.push(nextState);
            this.repaint();
        }
    }

    public clear() {
        //
        super.clear();
        this.currentRow = 0;
    }

    set initState(state: boolean[]) {
        //
        this.clear();
        this.buffer[this.currentRow] = state;
        this.paintCurrentRow();
    }
}
