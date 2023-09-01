//
export default class CanvasCntrl {
    //
    private canvas: HTMLCanvasElement | null;
    private graphics: CanvasRenderingContext2D;

    private offsetX: number;
    private offsetY: number;

    protected _rows: number;
    protected _columns: number;
    protected _cellSize: number;
    protected width: number;
    protected height: number;

    private _buffer: boolean[][];

    private backgroundColor: string;
    private deadColor: string;
    private aliveColor: string;

    public scrollX = 0;
    public scrollY = 0;

    constructor(
        canvasElement: HTMLCanvasElement | null,
        rows: number,
        columns: number,
        cellSize: number
    ) {
        //
        this.canvas = canvasElement;
        this.graphics = canvasElement!.getContext("2d")!;

        this._buffer = [];
        this._rows = rows;
        this._columns = columns;
        this.width = 0;
        this.height = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this._cellSize = 0;
        this.cellSize = cellSize;

        this._buffer = [];

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.backgroundColor = rs.getPropertyValue("--frenchGray");
        this.deadColor = rs.getPropertyValue("--jet");
        this.aliveColor = rs.getPropertyValue("--sunglow");

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

    private paintCellAtCoords(x: number, y: number, state: boolean) {
        //
        this.graphics.fillStyle = state ? this.aliveColor : this.deadColor;
        this.graphics.fillRect(x, y, this._cellSize, this._cellSize);
    }

    public toggleCellAtCoords(x: number, y: number) {
        let r, c;
        r = Math.floor(
            (y - this.offsetY + this.scrollY + window.scrollY) / this._cellSize
        );
        c = Math.floor(
            (x - this.offsetX + this.scrollX + window.scrollX) / this._cellSize
        );
        this.paintCell(r, c, !this._buffer[r][c]);
    }

    public repaint() {
        //
        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this.width, this.height);
        this._buffer.forEach((row, r) => {
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
        this._buffer = Array(this._rows)
            .fill(null)
            .map(() =>
                Array(this._columns)
                    .fill(null)
                    .map(() => false)
            );

        this.graphics.fillStyle = this.deadColor;
        this.graphics.fillRect(0, 0, this.width, this.height);
        // this.drawGrid();
    }

    public paintCell(row: number, col: number, state: boolean) {
        //
        this._buffer[row][col] = state;

        this.paintCellAtCoords(
            col * this._cellSize,
            row * this._cellSize,
            state
        );
    }

    public paintRow(row: number, rowState: boolean[]) {
        //
        if (row < this._rows) {
            rowState.forEach((cell, col) => {
                this.paintCell(row, col, cell);
            });
        } else {
            this._buffer.shift();
            this._buffer.push(rowState);
            this.repaint();
        }
    }

    public paintScene(state: boolean[][]) {
        this._buffer = state;
        this.repaint();
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

    set cellSize(size: number) {
        //
        this._cellSize = size;

        this.width = this._columns * this._cellSize;
        this.height = this._rows * this._cellSize;

        this.canvas!.width = this.width;
        this.canvas!.height = this.height;

        this.offsetX = this.canvas?.offsetLeft ?? 0;
        this.offsetY = this.canvas?.offsetTop ?? 0;
    }

    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }

    get buffer(): boolean[][] {
        return this._buffer;
    }
}
