class CAPCheck extends CAPToggleButton
{
    constructor()
    {
        super("", ["square", "square-check"], "solid", "xl");
    }

    get checked()
    {
        return this.state == 1;
    }

    set checked(bool)
    {
        this.state = bool ? 1 : 0;
    }

    
}
