//

export type Position = {
    r: number;
    c: number;
};

export type NbhdType1D = "adjacent" | "grouped" | "scattered";

export type NbhdType2D = "moore" | "vonneumann" | "custom";

export type Limit = "continuous" | "bounded";

export type Section = {
    title: string;
    content: JSX.Element;
};

export type FlowStatus = "stopped" | "paused" | "running" | undefined;
