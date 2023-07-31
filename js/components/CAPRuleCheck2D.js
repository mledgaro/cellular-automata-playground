class CAPRuleCheck2D extends CAPToggleButton
{

    #element;

    constructor(label)
    {
        super("", ["square-minus", "square", "square-check"], "solid", "xl");

        let mcont, cont, btnCont;

        mcont = $(`\
            <div class='col d-flex justify-content-center m-1'></div>\
        `);

        cont = $(`\
            <div class='card bg-warning border-0'\
                        style='width:3.5em;'>\
                <div class='card-header bg-dark cap-text-label p-1'>\
                    ${label}\
                </div>\
            </div>\
        `);

        btnCont = $(`\
            <div class='card-body p-0 mx-auto text-dark'></div>\
        `);

        btnCont.append(super.element);

        cont.append(btnCont);

        mcont.append(cont);

        this.#element = mcont;
    }

    get element()
    {
        return this.#element;
    }

}
