//

export default class CanvasCntrl {
    //

    #canvas: HTMLCanvasElement;
    #graphics: CanvasRenderingContext2D;
    #maxWidth: number;
    #maxHeight: number;
    #cellSize: number = 0;
    #rows: number = 0;
    #columns: number = 0;
    #width: number = 0;
    #height: number = 0;
    #origX: number = 0;
    #origY: number = 0;
    #backgroundColor: string;
    #deadColor: string;
    #aliveColor: string;

    // #maxRows;
    // #maxColumns;

    constructor(canvasId: string, width: number, height: number) {
        //

        this.#canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.#graphics = this.#canvas.getContext("2d")!;

        this.#maxWidth = width;
        this.#maxHeight = height;

        this.cellSize = 10;

        // get colors from css file

        const r = document.querySelector(":root")!;
        const rs = getComputedStyle(r);

        this.#backgroundColor = rs.getPropertyValue("--dark2");
        this.#deadColor = rs.getPropertyValue("--dark1");
        this.#aliveColor = rs.getPropertyValue("--clear1");

        this.clear();
    }

    // private

    #drawGrid() {
        //

        let pos, i, w, h;

        w = this.#width + this.#origX;
        h = this.#height + this.#origY;

        this.#graphics.lineWidth = 1;
        this.#graphics.strokeStyle = this.#backgroundColor;

        this.#graphics.beginPath();

        // horizontal  lines
        for (i = 1; i < this.#rows; i++) {
            pos = i * this.#cellSize + this.#origY;
            this.#graphics.moveTo(this.#origX, pos);
            this.#graphics.lineTo(w, pos);
            this.#graphics.stroke();
        }

        // vertical  lines
        for (i = 1; i < this.#columns; i++) {
            pos = i * this.#cellSize + this.#origX;
            this.#graphics.moveTo(pos, this.#origY);
            this.#graphics.lineTo(pos, h);
            this.#graphics.stroke();
        }
    }

    #paintCellAtCoords(x: number, y: number, state: boolean) {
        //

        this.#graphics.fillStyle = state ? this.#aliveColor : this.#deadColor;

        this.#graphics.fillRect(
            this.#origX + x,
            this.#origY + y,
            this.#cellSize,
            this.#cellSize
        );
    }

    // public

    clear() {
        //

        this.#graphics.fillStyle = this.#backgroundColor;
        this.#graphics.fillRect(0, 0, this.#maxWidth, this.#maxHeight);

        this.#graphics.fillStyle = this.#deadColor;
        this.#graphics.fillRect(
            this.#origX,
            this.#origY,
            this.#width,
            this.#height
        );

        this.#drawGrid();
    }

    paintCell(row: number, col: number, state: boolean) {
        //

        let x, y;

        x = col * this.#cellSize;
        y = row * this.#cellSize;

        this.#paintCellAtCoords(x, y, state);
    }

    paintCells(cells: boolean[][]) {
        //

        let rows, cols;

        rows = Math.min(cells.length, this.#rows);
        cols = Math.min(cells[0].length, this.#columns);

        this.clear();

        for (let r = 0, c; r < rows; r++) {
            for (c = 0; c < cols; c++) {
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

        this.#rows = Math.floor(this.#maxHeight / this.#cellSize);
        this.#columns = Math.floor(this.#maxWidth / this.#cellSize);

        this.#width = this.#columns * this.#cellSize;
        this.#height = this.#rows * this.#cellSize;

        this.#origX = Math.floor((this.#maxWidth - this.#width) / 2);
        this.#origY = Math.floor((this.#maxHeight - this.#height) / 2);
    }
}
