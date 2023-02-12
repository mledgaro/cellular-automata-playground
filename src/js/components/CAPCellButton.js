class CAPCellButton {
    #element;

    #checked;
    #highlighted;
    neighborhood;

    constructor(id) {
        this.#element = $(`\
            <button type='button'\
                    class='cap-cell-btn cap-cell-btn-off'>\
                ${id}
            </button>\
        `);

        this.#checked = false;
        this.#highlighted = false;

        this.neighborhood = [];

        this.#element.click(() => this.toggle());

        this.#element.mouseover(() =>
            this.neighborhood.forEach((e) => e.highlight())
        );

        this.#element.mouseout(() =>
            this.neighborhood.forEach((e) => e.highlight())
        );
    }

    toggle() {
        if (this.#highlighted) {
            this.#element.toggleClass("cap-cell-btn-off-high");
            this.#element.toggleClass("cap-cell-btn-on-high");
        } else {
            this.#element.toggleClass("cap-cell-btn-off");
            this.#element.toggleClass("cap-cell-btn-on");
        }
        this.#checked = !this.#checked;
    }

    highlight() {
        if (this.#checked) {
            this.#element.toggleClass("cap-cell-btn-on");
            this.#element.toggleClass("cap-cell-btn-on-high");
        } else {
            this.#element.toggleClass("cap-cell-btn-off");
            this.#element.toggleClass("cap-cell-btn-off-high");
        }
        this.#highlighted = !this.#highlighted;
    }

    get element() {
        return this.#element;
    }

    get checked() {
        return this.#checked;
    }

    get id() {
        return Number(this.#element.text());
    }

    set checked(bool) {
        this.#element.removeClass("cap-cell-btn-off");
        this.#element.removeClass("cap-cell-btn-on");

        if (bool) {
            this.#element.addClass("cap-cell-btn-on");
        } else {
            this.#element.addClass("cap-cell-btn-off");
        }

        this.#checked = bool;
    }

    set enabled(bool) {
        this.#element.removeAttr("disabled");
        if (!bool) {
            this.#element.attr("disabled", "true");
        }
    }
}
