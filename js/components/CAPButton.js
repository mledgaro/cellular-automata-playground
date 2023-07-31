class CAPButton
{
    #button;
    #icon;

    constructor(buttonId, title, iconId, iconSize)
    {
        this.#button = $("#" + buttonId);
        this.#button.attr("type", "button");
        this.#button.attr("title", title);
        this.#button.attr("data-bs-toggle", "tooltip");
        this.#button.attr("data-bs-placement", "bottom");
        this.#button.addClass("btn cap-btn");

        this.#icon = 
            $(`<i class='fa-${iconId} fa-solid fa-${iconSize}'></i>`);

        this.#button.append(this.#icon);
    }

    get element()
    {
        return this.#button;
    }

    set tooltipLabel(label)
    {
        this.#button.attr("data-bs-original-title", label);
    }

    set enabled(bool)
    {
        this.#button.removeAttr("disabled");
        if (!bool)
        {
            this.#button.attr("disabled", "true");
        }
    }

    set visible(bool)
    {
        this.#button.hide();
        if (bool)
        {
            this.#button.show();
        }
    }

    set icon(iconId)
    {
        this.#icon.remove();
        this.#icon = $("<i></i>");
        this.#icon.addClass("fa-" + iconId + " fa-solid fa-lg");
        this.#button.append(this.#icon);
    }

    set onClick(func)
    {
        this.#button.click(func);
    }
}
