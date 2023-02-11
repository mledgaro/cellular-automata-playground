class CAPCanvas {
    static MIN_CELL_SIZE = 5;
    static MAX_CELL_SIZE = 30;

    #container;
    #canvas;
    #width;
    #height;
    #maxRows;
    #maxColumns;

    #graphics;
    #cellSize;
    #rows;
    #columns;
    #currWidth;
    #currHeight;
    #origX;
    #origY;

    #buffer;

    constructor(containerId, width, height) {
        this.#container = $("#" + containerId);

        this.#container.css("width", Math.floor(width * 100) + "vw");
        this.#container.css("height", Math.floor(height * 100) + "vh");

        this.#width = Math.floor(window.innerWidth * width);
        this.#height = Math.floor(window.innerHeight * height);

        this.#maxRows = Math.floor(this.#height / CAPCanvas.MIN_CELL_SIZE);
        this.#maxColumns = Math.floor(this.#width / CAPCanvas.MIN_CELL_SIZE);

        this.#canvas = $("<canvas></canvas>");
        this.#canvas.addClass("p-0");
        this.#canvas.attr("width", this.#width);
        this.#canvas.attr("height", this.#height);

        this.#graphics = this.#canvas[0].getContext("2d");

        this.#container.append(this.#canvas);

        this.cellSize = 17;

        this.#buffer = [];
    }

    // private

    #drawGrid() {
        let pos, i, w, h;

        w = this.#currWidth + this.#origX;
        h = this.#currHeight + this.#origY;

        this.#graphics.lineWidth = 1;
        this.#graphics.strokeStyle = GUI.COLORS.background;

        this.#graphics.beginPath();

        // horizontal  lines
        for (i = 1; i < this.#rows; i++) {
            pos = i * this.cellSize + this.#origY;
            this.#graphics.moveTo(this.#origX, pos);
            this.#graphics.lineTo(w, pos);
            this.#graphics.stroke();
        }

        // vertical  lines
        for (i = 1; i < this.#columns; i++) {
            pos = i * this.cellSize + this.#origX;
            this.#graphics.moveTo(pos, this.#origY);
            this.#graphics.lineTo(pos, h);
            this.#graphics.stroke();
        }
    }

    #paintCellAtCoords(x, y, state) {
        this.#graphics.fillStyle = state
            ? GUI.COLORS.cellOn
            : GUI.COLORS.cellOff;

        this.#graphics.fillRect(
            this.#origX + x,
            this.#origY + y,
            this.cellSize,
            this.cellSize
        );
    }

    // public

    clear() {
        this.graphics.fillStyle = GUI.COLORS.background;
        this.graphics.fillRect(0, 0, this.width, this.height);

        this.graphics.fillStyle = GUI.COLORS.cellOff;
        this.graphics.fillRect(
            this.origX,
            this.origY,
            this.currwWidth,
            this.currHeight
        );

        this.#drawGrid();
    }

    paintCell(row, col, state) {
        let x, y;

        x = col * this.cellSize;
        y = row * this.cellSize;

        this.#paintCellAtCoords(x, y, state);
    }

    paintCells(cells) {
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

    // for 1D

    clearBuffer() {
        this.#buffer = [];
    }

    paintBuffer() {
        if (this.#buffer.length > 0) {
            this.paintCells(this.#buffer);
        }
    }

    bufferRow(row) {
        if (this.#buffer.length == this.rows) {
            this.#buffer = this.#buffer.slice(1);
        }

        this.#buffer = this.#buffer.concat([row]);
    }

    // 2D

    initBuffer() {
        this.#buffer = Array(this.#maxRows)
            .fill()
            .map(() => Array(this.#maxColumns).fill(false));
    }

    toggleCell(x, y) {
        let r, c;

        r = Math.floor(
            (y - this.canvas.offset().top - this.origY) / this.cellSize
        );
        c = Math.floor(
            (x - this.canvas.offset().left - this.origX) / this.cellSize
        );

        console.log(r + ", " + c);

        this.#buffer[r][c] = !this.#buffer[r][c];

        this.paintCell(r, c, this.#buffer[r][c]);
    }

    // getters

    get graphics() {
        return this.#graphics;
    }

    get origX() {
        return this.#origX;
    }

    get origY() {
        return this.#origY;
    }

    get container() {
        return this.#container;
    }

    get canvas() {
        return this.#canvas;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get cellSize() {
        return this.#cellSize;
    }

    get rows() {
        return this.#rows;
    }

    get columns() {
        return this.#columns;
    }

    get maxRows() {
        return this.#maxRows;
    }

    get maxColumns() {
        return this.#maxColumns;
    }

    get currwWidth() {
        return this.#currWidth;
    }

    get currHeight() {
        return this.#currHeight;
    }

    get buffer() {
        return this.#buffer;
    }

    // setters

    set cellSize(size) {
        // range validation
        this.#cellSize = Math.max(CAPCanvas.MIN_CELL_SIZE, size);
        this.#cellSize = Math.min(size, CAPCanvas.MAX_CELL_SIZE);

        this.#rows = Math.floor(this.#height / this.#cellSize);
        this.#columns = Math.floor(this.#width / this.#cellSize);

        this.#currWidth = this.#columns * this.#cellSize;
        this.#currHeight = this.#rows * this.#cellSize;

        this.#origX = Math.floor((this.#width - this.#currWidth) / 2);
        this.#origY = Math.floor((this.#height - this.#currHeight) / 2);
    }
}
