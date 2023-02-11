class CAPButtonGroupSelector {
    #component;
    #buttons;

    constructor(containerId, buttonLabelsArr) {
        this.#component = $(
            "\
            <div class='input-group input-group-lg\
                        d-flex justify-content-center'></div>\
        "
        );

        buttonLabelsArr.forEach((e, i, arr) => {
            let btn = $(`\
                    <button type='button' class='btn cap-btn-group-select'>\
                        ${e}\
                    </button>\
                `);

            btn.click(() => (this.active = i));

            this.#component.append(btn);
        });

        this.#buttons = this.#component.find("button");

        $("#" + containerId).append(this.#component);
    }

    setEnabled(idx, bool) {
        let btn = this.#buttons.eq(idx);
        btn.removeAttr("disabled");
        if (!bool) {
            btn.attr("disabled", "true");
        }
    }

    setOnClick(idx, func) {
        this.#buttons.eq(idx).click(func);
    }

    set active(idx) {
        this.#buttons.removeClass("cap-btn-group-select-active");
        this.#buttons.eq(idx).addClass("cap-btn-group-select-active");
    }
}
