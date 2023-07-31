class GUISectionNeighborhood
{

    static IDS = {
        container: "section-neighborhood-container",
        class: "cap-section-neighborhood",
        d1:
        {
            size: "neighborhood-size-input-1d",
            type: "neighborhood-type-selector-1d",
            alignment: "neighborhood-alignment-selector-1d",
        },
        d2:
        {
            size: "neighborhood-size-input-2d",
            type: "neighborhood-type-selector-2d",
            alignment: "neighborhood-alignment-selector-2d",
        },
    };

    container;
    d1;
    d2;

    constructor()
    {
        this.container = $("#" + GUISectionNeighborhood.IDS.container);

        this.d1 =
        {
            size: $("#" + GUISectionNeighborhood.IDS.d1.size),
            type: $("#" + GUISectionNeighborhood.IDS.d1.type),
            alignment: $("#" + GUISectionNeighborhood.IDS.d1.alignment),
        };

        this.d2 =
        {
            size: $("#" + GUISectionNeighborhood.IDS.d2.size),
            type: $("#" + GUISectionNeighborhood.IDS.d2.type),
            alignment: $("#" + GUISectionNeighborhood.IDS.d2.alignment),
        };


        this.d1.size.val(3);
        this.d1.size.change(() => this.enableAlignment1D());

        this.d1.type.val("insitu");
        this.d1.type.change(() => this.enableAlignment1D());

        this.d1.alignment.val("left");

        this.enableAlignment1D();


        this.d2.size.val(3);
        this.d2.size.change(() => this.enableAlignment2D());

        this.d2.type.val("moore");

        this.d2.alignment.val("topleft");

        this.enableAlignment2D();
    }


    getSize(dim)
    {
        return Number(this[dim].size.val());
    }

    getType(dim)
    {
        return this[dim].type.val();
    }

    getAlignment(dim)
    {
        return this[dim].alignment.val();
    }

    setSizeEnabled(dim, bool)
    {
        GUI.setEnabled(this[dim].size, bool);
    }

    setTypeEnabled(dim, bool)
    {
        GUI.setEnabled(this[dim].type, bool);
    }

    setAlignmentEnabled(dim, bool)
    {
        GUI.setEnabled(this[dim].alignment, bool);
    }

    enableAlignment1D()
    {
        this.setAlignmentEnabled("d1", 
            this.getSize("d1") % 2 == 0 && this.getType("d1") == "insitu");
    }

    enableAlignment2D()
    {
        this.setAlignmentEnabled("d2", this.getSize("d2") % 2 == 0);
    }

    enableAlignment(dim)
    {
        switch (dim)
        {
            case "d1":
                this.enableAlignment1D();
                break;

            case "d2":
                this.enableAlignment2D();
                break;
        }
    }

    get maxRuleNumber()
    {
        return Math.pow(2, Math.pow(2, this.getSize("d1"))) - 1;
    }


    set enabled(bool)
    {
        GUI.setEnabled($("." + GUISectionNeighborhood.IDS.class), bool);
    }
}
