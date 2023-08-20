//

export default class CanvasController {
    //

    private canvas: HTMLCanvasElement;
    private graphics: CanvasRenderingContext2D;

    private _rows: number;
    private _columns: number;
    private _cellSize: number = 0;
    private width: number = 0;
    private height: number = 0;

    private buffer: boolean[][] = [];
    private currentRow: number = 0;

    private backgroundColor: string;
    private deadColor: string;
    private aliveColor: string;

    constructor(canvas: HTMLCanvasElement, rows: number, columns: number) {
        //

        // this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvas = canvas;

        this.graphics = this.canvas.getContext("2d")!;

        this._rows = rows;
        this._columns = columns;

        this.cellSize = 8;

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.backgroundColor = rs.getPropertyValue("--frenchGray");
        this.deadColor = rs.getPropertyValue("--jet");
        this.aliveColor = rs.getPropertyValue("--sunglow");

        this.restart();

        console.log("canvas controller constructor");
    }

    private clearCanvas() {
        //

        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this.width, this.height);
    }

    private drawGrid() {
        //

        this.graphics.lineWidth = 1;
        this.graphics.strokeStyle = this.backgroundColor;

        this.graphics?.beginPath();

        // horizontal  lines
        for (let i = 1, pos; i < this._rows; i++) {
            pos = i * this._cellSize;
            this.graphics.moveTo(0, pos);
            this.graphics.lineTo(this.width, pos);
            this.graphics.stroke();
        }

        // vertical  lines
        for (let i = 1, pos; i < this._columns; i++) {
            pos = i * this._cellSize;
            this.graphics.moveTo(pos, 0);
            this.graphics.lineTo(pos, this.height);
            this.graphics.stroke();
        }
    }

    restart() {
        //

        this.buffer = Array(this._rows).fill(Array(this._columns).fill(false));
        this.currentRow = 0;

        this.clearCanvas();
        this.drawGrid();
    }

    private paintCellAtCoords(x: number, y: number, state: boolean) {
        //

        this.graphics.fillStyle = state ? this.aliveColor : this.deadColor;

        this.graphics.fillRect(x, y, this._cellSize, this._cellSize);
    }

    paintCell(row: number, col: number, state: boolean) {
        //

        this.paintCellAtCoords(
            col * this._cellSize,
            row * this._cellSize,
            state
        );
    }

    paintCells(cells: boolean[][]) {
        //

        this.clearCanvas();

        cells.forEach((row, r) => {
            row.forEach((e, c) => {
                this.paintCell(r, c, e);
            });
        });
    }

    paintNextRow(cellsState: boolean[]) {
        //

        if (this.currentRow < this._rows) {
            cellsState.forEach((e, i) => {
                this.paintCell(this.currentRow, i, e);
            });
            this.buffer.splice(this.currentRow, 1, cellsState);
            this.currentRow++;
        } else {
            this.buffer.shift();
            this.buffer.push(cellsState);

            this.paintCells(this.buffer);
        }
    }

    saveScene(fileName: string) {
        //

        let imgData = this.canvas.toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = fileName + ".png";
        tmpLink.href = imgData ?? "";
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }

    // setters

    set cellSize(size: number) {
        //

        this._cellSize = size;

        this.width = this._columns * this._cellSize;
        this.height = this._rows * this._cellSize;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    setCellSize(size: number) {
        //

        this.cellSize = size;
    }

    // getters

    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }
}
