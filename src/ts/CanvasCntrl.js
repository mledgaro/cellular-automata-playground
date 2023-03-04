//

export default class CanvasCntrl {
    //

    static MIN_CELL_SIZE = 5;
    static MAX_CELL_SIZE = 30;

    static COLORS = {
        grid: "#6c757d",
        background: "#212529",
        highlight: "#ffc107",
    };

    #grCtx;
    #width;
    #height;
    #cellSize;
    #rows;
    #columns;
    #currWidth;
    #currHeight;
    #origX;
    #origY;

    // #maxRows;
    // #maxColumns;


    constructor(graphicsContext, width, height) {
        //

        this.#grCtx = graphicsContext;

        this.#width = width;
        this.#height = height;

        // this.#maxRows = Math.floor(height / CanvasCntrl.MIN_CELL_SIZE);
        // this.#maxColumns = Math.floor(width / CanvasCntrl.MIN_CELL_SIZE);

        this.cellSize = 10;

        this.clear();

        // this.paintCell(1, 1, true);
    }

    // private

    #drawGrid() {
        //

        let pos, i, w, h;

        w = this.#currWidth + this.#origX;
        h = this.#currHeight + this.#origY;

        this.#grCtx.lineWidth = 1;
        this.#grCtx.strokeStyle = CanvasCntrl.COLORS.grid;

        this.#grCtx.beginPath();

        // horizontal  lines
        for (i = 1; i < this.#rows; i++) {
            pos = i * this.#cellSize + this.#origY;
            this.#grCtx.moveTo(this.#origX, pos);
            this.#grCtx.lineTo(w, pos);
            this.#grCtx.stroke();
        }

        // vertical  lines
        for (i = 1; i < this.#columns; i++) {
            pos = i * this.#cellSize + this.#origX;
            this.#grCtx.moveTo(pos, this.#origY);
            this.#grCtx.lineTo(pos, h);
            this.#grCtx.stroke();
        }
    }

    #paintCellAtCoords(x, y, state) {
        //

        this.#grCtx.fillStyle = state
            ? CanvasCntrl.COLORS.highlight
            : CanvasCntrl.COLORS.background;

        this.#grCtx.fillRect(
            this.#origX + x,
            this.#origY + y,
            this.#cellSize,
            this.#cellSize
        );
    }

    // public

    clear() {
        //

        this.#grCtx.fillStyle = CanvasCntrl.COLORS.grid;
        this.#grCtx.fillRect(0, 0, this.width, this.height);

        this.#grCtx.fillStyle = CanvasCntrl.COLORS.background;
        this.#grCtx.fillRect(
            this.#origX,
            this.#origY,
            this.#currWidth,
            this.#currHeight
        );

        this.#drawGrid();
    }

    paintCell(row, col, state) {
        //

        let x, y;

        x = col * this.#cellSize;
        y = row * this.#cellSize;

        this.#paintCellAtCoords(x, y, state);
    }

    paintCells(cells) {
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

    saveScene(name) {
        let imgData = this.canvas[0].toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = name + ".png";
        tmpLink.href = imgData;
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }


    // setters

    set cellSize(size) {
        // range validation
        this.#cellSize = Math.max(CanvasCntrl.MIN_CELL_SIZE, size);
        this.#cellSize = Math.min(size, CanvasCntrl.MAX_CELL_SIZE);

        this.#rows = Math.floor(this.#height / this.#cellSize);
        this.#columns = Math.floor(this.#width / this.#cellSize);

        this.#currWidth = this.#columns * this.#cellSize;
        this.#currHeight = this.#rows * this.#cellSize;

        this.#origX = Math.floor((this.#width - this.#currWidth) / 2);
        this.#origY = Math.floor((this.#height - this.#currHeight) / 2);
    }
}
