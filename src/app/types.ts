//

export type Position = {
    r: number;
    c: number;
};

export type Size = {
    rows: number;
    cols: number;
};

export type NbhdType1D = "adjacent" | "grouped" | "scattered";

export type NbhdType2D = "moore" | "vonneumann" | "custom";

export type Limit = "continuous" | "bounded";

export type Section = {
    title: string;
    content: JSX.Element;
};

export type FlowStatus = "stopped" | "paused" | "running" | undefined;

export type DataFile = {
    type: string;
    iterations: number;
};

export type DataFileCA1D = DataFile & {
    numCells: number;
    bufferSize: number;
    nbhdType: NbhdType1D;
    nbhdWidth: number;
    nbhdCenter: number;
    cellsNbhd: number[][];
    rules: boolean[];
    initState: boolean[];
    currState: boolean[];
};

export type DataFileCA2D = DataFile & {
    worldSize: Size;
    nbhdType: NbhdType2D;
    mainCell: Position;
    neighborhood: boolean[][];
    rules: (boolean | null)[];
    initialState: boolean[][];
    currentState: boolean[][];
};
