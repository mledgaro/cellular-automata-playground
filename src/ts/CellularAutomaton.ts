//

import { boolArrayToInt } from "./Utils";

export default class CellularAutomaton {
    //

    state: boolean[] = [];

    nextState(cellsNbhds: number[][], rules: boolean[]): boolean[] {
        //

        this.state = this.state.map(
            (_, i) =>
                rules[
                    boolArrayToInt(
                        cellsNbhds[i].map((e) => this.state[e]),
                        false
                    )
                ]
        );

        return this.state;
    }
}
