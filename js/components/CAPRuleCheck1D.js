class CAPRuleCheck1D extends CAPCheck
{
    #element;

    constructor(id, binarySize) 
    {
        super();

        let binLabel = 
            ("0".repeat(binarySize) + id.toString(2)).slice(-binarySize);

        this.#element = $(`\
            <div class='col-3 my-1'>\
                <div class='input-group d-flex justify-content-center'>\
                    <span class='input-group-text cap-text-label'\
                            style='min-width:2rem;'>\
                        ${id}\
                    </span>\
                    <span class='input-group-text cap-text-label'\
                            style='min-width:3rem;'>\
                        ${binLabel}\
                    </span>\
                </div>\
            </div>\
        `);

        this.#element.find("span:first").after(super.element);
    }

    get element() 
    {
        return this.#element;
    }

    
}
