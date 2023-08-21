//
export default class CanvasCntrl {
    //
    private canvas: HTMLCanvasElement;
    private graphics: CanvasRenderingContext2D;

    protected _rows: number;
    protected _columns: number;
    protected _cellSize: number;
    protected width: number;
    protected height: number;

    protected buffer: boolean[][];

    private backgroundColor: string;
    private deadColor: string;
    private aliveColor: string;

    constructor(
        canvasId: string,
        rows: number,
        columns: number,
        cellSize: number
    ) {
        //
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.graphics = this.canvas.getContext("2d")!;

        this._rows = rows;
        this._columns = columns;
        this.width = 0;
        this.height = 0;
        this._cellSize = 0;
        this.cellSize = cellSize;

        this.buffer = [];

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.backgroundColor = rs.getPropertyValue("--frenchGray");
        this.deadColor = rs.getPropertyValue("--jet");
        this.aliveColor = rs.getPropertyValue("--sunglow");

        this.clear();
    }

    private drawGrid() {
        //
        this.graphics.lineWidth = 1;
        this.graphics.strokeStyle = this.backgroundColor;

        this.graphics.beginPath();

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

    protected paintCellAtCoords(x: number, y: number, state: boolean) {
        //
        this.graphics.fillStyle = state ? this.aliveColor : this.deadColor;
        this.graphics.fillRect(x, y, this._cellSize, this._cellSize);
    }

    public repaint() {
        //
        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this.width, this.height);
        this.buffer.forEach((row, r) => {
            row.forEach((cell, c) => {
                this.paintCellAtCoords(
                    c * this._cellSize,
                    r * this._cellSize,
                    cell
                );
            });
        });
    }

    public clear() {
        //
        this.buffer = Array(this._rows).fill(Array(this._columns).fill(false));

        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this.width, this.height);
        // this.drawGrid();
    }

    public paintCell(row: number, col: number, state: boolean) {
        //
        this.buffer[row][col] = state;

        this.paintCellAtCoords(
            col * this._cellSize,
            row * this._cellSize,
            state
        );
    }

    public saveScene(fileName: string) {
        //

        let imgData = this.canvas.toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = fileName + ".png";
        tmpLink.href = imgData ?? "";
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }

    set cellSize(size: number) {
        //
        this._cellSize = size;

        this.width = this._columns * this._cellSize;
        this.height = this._rows * this._cellSize;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }
}
