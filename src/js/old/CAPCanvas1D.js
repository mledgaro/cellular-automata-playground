class CAPCanvas1D extends CAPCanvas
{
    #buffer = [];

    clearBuffer()
    {
        this.#buffer = [];
    }

    repaint()
    {
        if (this.#buffer.length > 0)
        {
            this.paintCells(this.#buffer);
        }
    }

    paintRow(row)
    {
        if (this.#buffer.length == this.rows)
        {
            this.#buffer = this.#buffer.slice(1);
        }

        this.#buffer = this.#buffer.concat([row])

        this.repaint();
    }

}
