class RandomBooleanNetwork extends CellularAutomaton
{
    constructor()
    {
        super();
    }

    setRandomConnections()
    {
        super().#cells.neighbors = Array(super().#cells.size).fill().map(
            () => Array(super().#neighborhoodSize).fill().map(
                () => Math.floor(Math.random() * super().#cells.size))
        );
    }

}
