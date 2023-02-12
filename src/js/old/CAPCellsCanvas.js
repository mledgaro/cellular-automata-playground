class CAPCellsCanvas
{
    #MIN_CELL_SIZE = 5;
    #MAX_CELL_SIZE = 30;

    #canvas;
    #colors;

    #maxWidth;
    #maxHeight;
    #maxRows;
    #maxColumns;

    #graphics;
    #buffer;

    #cellSize;
    #rows;
    #columns;
    #width;
    #height;
    #origX;
    #origY;

    /**
     * 
     * @param {int} maxWidth
     * @param {int} maxHeight 
     * @param {int} cellSize 
     * @param {obj} colors
     */
    constructor(canvasId, colors, cellSize)
    {
        this.#canvas = $("#" + canvasId);

        this.#colors = colors;

        this.#maxWidth = Math.floor(window.innerWidth * 0.95);
        this.#maxHeight = Math.floor(window.innerHeight * 0.7);

        this.#maxRows = Math.floor(this.#maxHeight / this.#MIN_CELL_SIZE);
        this.#maxColumns = Math.floor(this.#maxWidth / this.#MIN_CELL_SIZE);

        this.#canvas.attr("width", this.#maxWidth);
        this.#canvas.attr("height", this.#maxHeight);

        this.#graphics = this.#canvas[0].getContext("2d");
        this.#buffer = [];

        this.cellSize = cellSize;
    }

    #drawGrid()
    {
        let pos, i, w, h;

        w = this.#width + this.#origX;
        h = this.#height + this.#origY;

        this.#graphics.lineWidth = 1;
        this.#graphics.strokeStyle = GUI.COLORS.background;

        this.#graphics.beginPath();

        // horizontal  lines
        for (i = 1; i < this.#rows; i++)
        {
            pos = (i * this.#cellSize) + this.#origY;
            this.#graphics.moveTo(this.#origX, pos);
            this.#graphics.lineTo(w, pos);
            this.#graphics.stroke();
        }

        // vertical  lines
        for (i = 1; i < this.#columns; i++)
        {
            pos = (i * this.#cellSize) + this.#origX;
            this.#graphics.moveTo(pos, this.#origY);
            this.#graphics.lineTo(pos, h);
            this.#graphics.stroke();
        }   
    }

    #paintCell(x, y, state)
    {
        if (state)
        {
            this.#graphics.fillStyle = GUI.COLORS.cellOn;
        }
        else
        {
            this.#graphics.fillStyle = GUI.COLORS.cellOff;
        }

        this.#graphics.fillRect(this.#origX + x, this.#origY + y, this.#cellSize, this.#cellSize);
    }

    clear()
    {
        this.#graphics.fillStyle = GUI.COLORS.background;
        this.#graphics.fillRect(0, 0, this.#maxWidth, this.#maxHeight);

        this.#graphics.fillStyle = GUI.COLORS.cellOff;
        this.#graphics.fillRect(this.#origX, this.#origY, this.#width, this.#height);

        this.#drawGrid();
    }

    paintCellXY(x, y, state)
    {
        x -= x % this.#cellSize;
        y -= y % this.#cellSize;

        this.#paintCell(x, y, state);
    }

    paintCellRC(row, col, state)
    {
        let x, y;

        x = col * this.#cellSize;
        y = row * this.#cellSize;

        this.#paintCell(x, y, state);
    }

    paintMatrix(matrix)
    {
        let rows, cols;

        rows = Math.min(matrix.length, this.#rows);
        cols = Math.min(matrix[0].length, this.#columns);

        this.clear();

        for (let r = 0; r < rows; r++)
        {
            for (let c = 0; c < cols; c++)
            {
                this.paintCellRC(r, c, matrix[r][c]);
            }
        }
    }

    clearBuffer()
    {
        this.#buffer = [];
    }

    bufferAndPaint(row)
    {
        if (this.#buffer.length == this.#rows)
        {
            this.#buffer = this.#buffer.slice(1);
        }

        this.#buffer = this.#buffer.concat([row])

        this.paintMatrix(this.#buffer);
    }

    repaint()
    {
        this.clear();
        this.paintMatrix(this.#buffer);
    }

    takeScreenshot(name)
    {
        let imgData = this.#canvas[0].toDataURL();
        let tmpLink = document.createElement("a");
        tmpLink.download = name + ".png";
        tmpLink.href = imgData;
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }

    get canvas()
    {
        return this.#canvas;
    }

    get maxWidth()
    {
        return this.#maxWidth;
    }

    get maxHeight()
    {
        return this.#maxHeight;
    }

    get maxRows()
    {
        return this.#maxRows;
    }

    get maxColumns()
    {
        return this.#maxColumns;
    }

    get cellSize()
    {
        return this.#cellSize;
    }

    get rows()
    {
        return this.#rows;
    }

    get columns()
    {
        return this.#columns;
    }

    set cellSize(size) 
    {
        // range validation
        this.#cellSize = Math.max(this.#MIN_CELL_SIZE, size);
        this.#cellSize = Math.min(size, this.#MAX_CELL_SIZE);

        this.#rows = Math.floor(this.#maxHeight / this.#cellSize);
        this.#columns = Math.floor(this.#maxWidth / this.#cellSize);

        this.#width = this.#columns * this.#cellSize;
        this.#height = this.#rows * this.#cellSize;

        this.#origX = Math.floor((this.#maxWidth - this.#width) / 2);
        this.#origY = Math.floor((this.#maxHeight - this.#height) / 2);

        // this.#origX = 0;
        // this.#origY = 0;

        // this.#origX = Math.floor((this.#maxWidth - this.#width) / 2) - this.#element.offset().left;
        // this.#origY = Math.floor((this.#maxHeight - this.#height) / 2) - this.#element.offset().top;
    }

}
