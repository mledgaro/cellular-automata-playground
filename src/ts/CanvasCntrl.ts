//

export default class CanvasCntrl {
    //

    #canvas: HTMLCanvasElement;
    #rows: number;
    #columns: number;

    #graphics: CanvasRenderingContext2D;
    #cellSize: number = 0;
    #width: number = 0;
    #height: number = 0;

    #backgroundColor: string;
    #deadColor: string;
    #aliveColor: string;

    constructor(canvasId: string, rows: number, columns: number) {
        //

        this.#canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.#rows = rows;
        this.#columns = columns;

        this.#graphics = this.#canvas.getContext("2d")!;

        this.cellSize = 8;

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.#backgroundColor = rs.getPropertyValue("--dark2");
        this.#deadColor = rs.getPropertyValue("--dark1");
        this.#aliveColor = rs.getPropertyValue("--clear1");

        this.clear();

        console.log("canvas cntrl constructor");
    }

    // private

    #drawGrid() {
        //

        this.#graphics.lineWidth = 1;
        this.#graphics.strokeStyle = this.#backgroundColor;

        this.#graphics.beginPath();

        // horizontal  lines
        for (let i = 1, pos; i < this.#rows; i++) {
            pos = i * this.#cellSize;
            this.#graphics.moveTo(0, pos);
            this.#graphics.lineTo(this.#width, pos);
            this.#graphics.stroke();
        }

        // vertical  lines
        for (let i = 1, pos; i < this.#columns; i++) {
            pos = i * this.#cellSize;
            this.#graphics.moveTo(pos, 0);
            this.#graphics.lineTo(pos, this.#height);
            this.#graphics.stroke();
        }
    }

    #paintCellAtCoords(x: number, y: number, state: boolean) {
        //

        this.#graphics.fillStyle = state ? this.#aliveColor : this.#deadColor;

        this.#graphics.fillRect(x, y, this.#cellSize, this.#cellSize);
    }

    // public

    clear() {
        //

        this.#graphics.fillStyle = this.#backgroundColor;
        this.#graphics.fillRect(0, 0, this.#width, this.#height);

        this.#graphics.fillStyle = this.#deadColor;
        this.#graphics.fillRect(0, 0, this.#width, this.#height);

        this.#drawGrid();
    }

    paintCell(row: number, col: number, state: boolean) {
        //

        let x, y;

        x = col * this.#cellSize;
        y = row * this.#cellSize;

        this.#paintCellAtCoords(x, y, state);
    }

    paintRow(row: number, cellsStates: boolean[]) {
        //

        let diff = this.#columns - cellsStates.length;
        let s = Math.round(Math.abs(diff) / 2);

        if (diff > 0) {
            for (let c = 0; c < cellsStates.length; c++) {
                this.paintCell(row, c + s, cellsStates[c]);
            }
        } else {
            for (let c = 0; c < this.#columns; c++) {
                this.paintCell(row, c, cellsStates[c + s]);
            }
        }
    }

    // paintCells(cells: boolean[][]) {
    //     //

    //     let rows, cols;

    //     rows = Math.min(cells.length, this.#rows);
    //     cols = Math.min(cells[0].length, this.#columns);

    //     this.clear();

    //     for (let r = 0, c; r < rows; r++) {
    //         for (c = 0; c < cols; c++) {
    //             this.paintCell(r, c, cells[r][c]);
    //         }
    //     }
    // }

    saveScene(fileName: string) {
        //

        let imgData = this.#canvas.toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = fileName + ".png";
        tmpLink.href = imgData;
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }

    // setters

    set cellSize(size: number) {
        //

        this.#cellSize = size;

        this.#width = this.#columns * this.#cellSize;
        this.#height = this.#rows * this.#cellSize;

        this.#canvas.width = this.#width;
        this.#canvas.height = this.#height;
    }

    get rows(): number {
        return this.#rows;
    }

    get columns(): number {
        return this.#columns;
    }
}
