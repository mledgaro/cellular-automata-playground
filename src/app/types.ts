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
    worldSize: Size;
    iterations: number;
};

export type DataFileCA1D = DataFile & {
    nbhdType: NbhdType1D;
    nbhdWidth: number;
    nbhdCenter: number;
    cellsNbhd: number[][];
    rules: boolean[];
    initState: boolean[];
    currState: boolean[];
};

export type DataFileCA2D = DataFile & {
    nbhdType: NbhdType2D;
    nbhd: boolean[][];
    nbhdCenter: Position;
    rules: (boolean | null)[];
    initState: boolean[][];
    currState: boolean[][];
};

export type DataFileObj = DataFileCA1D | DataFileCA2D | null;
