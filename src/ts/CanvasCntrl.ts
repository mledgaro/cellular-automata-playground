//
export default class CanvasCntrl {
    //
    private canvas: HTMLCanvasElement | null;
    private graphics: CanvasRenderingContext2D;

    private _rows: number;
    private _columns: number;
    private _cellSize: number;
    private _width: number;
    private _height: number;

    private backgroundColor: string;
    private deadColor: string;
    private aliveColor: string;

    constructor(
        canvasElement: HTMLCanvasElement | null,
        rows: number,
        columns: number,
        cellSize: number
    ) {
        //
        this.canvas = canvasElement;
        this.graphics = canvasElement!.getContext("2d")!;

        this._rows = rows;
        this._columns = columns;

        this._width = 0;
        this._height = 0;
        this._cellSize = 0;

        this.cellSize = cellSize;

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.backgroundColor = rs.getPropertyValue("--tertiary");
        this.deadColor = rs.getPropertyValue("--secondary");
        this.aliveColor = rs.getPropertyValue("--primary");

        this.clear();
    }

    public drawGrid() {
        //
        this.graphics.lineWidth = 1;
        this.graphics.strokeStyle = this.backgroundColor;

        this.graphics.beginPath();

        // horizontal  lines
        for (let i = 1, pos; i < this._rows; i++) {
            pos = i * this._cellSize;
            this.graphics.moveTo(0, pos);
            this.graphics.lineTo(this._width, pos);
            this.graphics.stroke();
        }

        // vertical  lines
        for (let i = 1, pos; i < this._columns; i++) {
            pos = i * this._cellSize;
            this.graphics.moveTo(pos, 0);
            this.graphics.lineTo(pos, this._height);
            this.graphics.stroke();
        }
    }

    public clear() {
        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this._width, this._height);
        // this.drawGrid();
    }

    private paintCellAtCoords(x: number, y: number, state: boolean) {
        //
        this.graphics.fillStyle = state ? this.aliveColor : this.deadColor;
        this.graphics.fillRect(x, y, this._cellSize, this._cellSize);
    }

    public paintCell(row: number, col: number, state: boolean) {
        this.paintCellAtCoords(
            col * this._cellSize,
            row * this._cellSize,
            state
        );
    }

    public paintRow(row: number, rowState: boolean[]) {
        //
        rowState.forEach((cell, col) => {
            this.paintCell(row, col, cell);
        });
    }

    public paintScene(state: boolean[][]) {
        //
        this.clear();
        for (let r = 0, c; r < this._rows; r++) {
            for (c = 0; c < this._columns; c++) {
                this.paintCell(r, c, state[r][c] ?? false);
            }
        }
    }

    public saveScene(fileName: string) {
        //
        let imgData = this.canvas!.toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = fileName + ".png";
        tmpLink.href = imgData ?? "";
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }

    public setSize(size: { rows: number; cols: number }) {
        //
        this._rows = size.rows;
        this._columns = size.cols;

        this._width = this._columns * this._cellSize;
        this._height = this._rows * this._cellSize;

        this.canvas!.width = this._width;
        this.canvas!.height = this._height;
    }

    set cellSize(size: number) {
        //
        this._cellSize = size;

        this._width = this._columns * this._cellSize;
        this._height = this._rows * this._cellSize;

        this.canvas!.width = this._width;
        this.canvas!.height = this._height;
    }

    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
