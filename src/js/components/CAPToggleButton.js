class CAPToggleButton {
    #button;
    #icons;
    #state;

    constructor(buttonId, stateIcons, iconStyle, iconSize) {
        this.#button =
            buttonId == "" ? $("<button></button>") : $("#" + buttonId);

        this.#button.attr("type", "button");
        this.#button.addClass("btn cap-btn");

        this.#icons = stateIcons.map((e) => "fa-" + e);

        this.#icons.forEach((id) =>
            this.#button.append(
                $(`<i class='${id} fa-${iconStyle} fa-${iconSize}'></i>`)
            )
        );

        this.state = 0;

        this.#button.click(() => this.toggle());
    }

    toggle() {
        this.state =
            this.#state == this.#icons.length - 1 ? 0 : this.#state + 1;
    }

    get state() {
        return this.#state;
    }

    get element() {
        return this.#button;
    }

    set state(idx) {
        idx = Math.max(0, idx);
        idx = Math.min(idx, this.#icons.length - 1);

        this.#button.children().hide();
        this.#button.children("." + this.#icons[idx]).show();

        this.#state = idx;
    }

    set enabled(bool) {
        this.#button.removeAttr("disabled");
        if (!bool) {
            this.#button.attr("disabled", "true");
        }
    }

    set onClick(func) {
        this.#button.click(func);
    }
}
