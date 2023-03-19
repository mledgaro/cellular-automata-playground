//

export default class CanvasCntrl {
    //

    #canvas: HTMLCanvasElement;
    #rows: number;
    #columns: number;

    #graphics: CanvasRenderingContext2D;
    #buffer: boolean[][] = [];
    #currentRow: number = 0;
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

        this.restart();
    }

    // private

    #clear() {
        //

        this.#graphics.fillStyle = this.#backgroundColor;
        this.#graphics.fillRect(0, 0, this.#width, this.#height);

        this.#graphics.fillStyle = this.#deadColor;
        this.#graphics.fillRect(0, 0, this.#width, this.#height);

        this.#drawGrid();
    }

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

    restart() {
        //

        this.#buffer = Array(this.#rows).fill(Array(this.#columns).fill(false));
        this.#currentRow = 0;

        this.#clear();
        this.#drawGrid();
    }

    paintCell(row: number, col: number, state: boolean) {
        //

        this.#paintCellAtCoords(
            col * this.#cellSize,
            row * this.#cellSize,
            state
        );
    }

    paintRow(cellsState: boolean[]) {
        //

        if (this.#currentRow < this.#rows) {
            for (let i = 0; i < cellsState.length; i++) {
                this.paintCell(this.#currentRow, i, cellsState[i]);
            }
            this.#buffer.splice(this.#currentRow, 1, cellsState);
            this.#currentRow++;
        } else {
            this.#buffer.shift();
            this.#buffer.push(cellsState);

            this.paintCells(this.#buffer);
        }
    }

    paintCells(cells: boolean[][]) {
        //

        this.#clear();

        for (let r = 0; r < this.#rows; r++) {
            for (let c = 0; c < this.#columns; c++) {
                this.paintCell(r, c, cells[r][c]);
            }
        }
    }

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

    // getters

    get rows(): number {
        return this.#rows;
    }

    get columns(): number {
        return this.#columns;
    }
}
