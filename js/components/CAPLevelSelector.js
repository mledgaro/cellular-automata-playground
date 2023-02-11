class CAPLevelSelector {
    #levels;
    #currIdx;

    #element;
    #decreaseBtn;
    #increaseBtn;
    #progressCells;

    constructor(containerId, levels, iconId, tooltipLabel) {
        this.#levels = levels;

        this.#element = $(`\
            <div class='input-group\
                        d-flex justify-content-center'>\
                <span class='input-group-text cap-text-label'\
                        data-bs-toggle='tooltip'\
                        data-bs-placement='bottom'\
                        title='${tooltipLabel}'>\
                    <i class='fa-${iconId} fa-solid fa-lg'></i>\
                </span>\
            </div>\
        `);

        this.#decreaseBtn = $(
            "\
            <button type='button' class='btn cap-btn'>\
                <i class='fa-minus fa-solid fa-lg'></i>\
            </button>\
        "
        );
        this.#decreaseBtn.click(() => (this.level = this.#currIdx - 1));

        this.#increaseBtn = $(
            "\
            <button type='button' class='btn cap-btn'>\
                <i class='fa-plus fa-solid fa-lg'></i>\
            </button>\
        "
        );
        this.#increaseBtn.click(() => (this.level = this.#currIdx + 1));

        this.#element.append(this.#decreaseBtn);

        for (let i = 0; i < this.#levels.length; i++) {
            this.#element.append(
                $(
                    "<span class='input-group-text cap-progress-cell'>\
                    </span>"
                )
            );
        }

        this.#element.append(this.#increaseBtn);

        this.#progressCells = this.#element.find("span:not(:first)");

        this.level = 0;

        $("#" + containerId).append(this.#element);
    }

    get element() {
        return this.#element;
    }

    get value() {
        return this.#levels[this.#currIdx];
    }

    set decreaseBtnOnClick(func) {
        this.#decreaseBtn.click(func);
    }

    set increaseBtnOnClick(func) {
        this.#increaseBtn.click(func);
    }

    set level(idx) {
        idx = Math.max(0, idx);
        idx = Math.min(idx, this.#levels.length - 1);

        this.#currIdx = idx;

        let progressCellsOn;

        progressCellsOn = this.#progressCells.slice(0, idx + 1);

        this.#progressCells.removeClass("cap-cell-on");
        // this.#progressCells.addClass("cap-progress-cell-off");

        // progressCellsOn.removeClass("cap-progress-cell-off");
        progressCellsOn.addClass("cap-cell-on");

        this.#decreaseBtn.removeAttr("disabled");
        this.#increaseBtn.removeAttr("disabled");

        if (this.#currIdx <= 0) {
            this.#decreaseBtn.attr("disabled", "true");
        }

        if (this.#currIdx >= this.#levels.length - 1) {
            this.#increaseBtn.attr("disabled", "true");
        }
    }

    set enabled(bool) {
        this.#decreaseBtn.removeAttr("disabled");
        this.#increaseBtn.removeAttr("disabled");
        if (!bool) {
            this.#decreaseBtn.attr("disabled", "true");
            this.#increaseBtn.attr("disabled", "true");
        }
    }
}
