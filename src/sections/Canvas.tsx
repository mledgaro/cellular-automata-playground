//

import React from "react";

import { useEffect, useMemo, useRef } from "react";
import CanvasCntrl from "src/ts/CanvasCntrl";
// import CanvasCntrl from "../ts/CanvasCntrl";

const canvasId = "cap-canvas";

export default function Canvas() {
    //

    const cntrl = useRef<CanvasCntrl>();

    const width = useMemo(
        () => Math.floor(window.innerWidth * 0.95),
        [window.innerWidth]
    );
    const height = useMemo(
        () => Math.floor(window.innerHeight * 0.7),
        [window.innerHeight]
    );

    useEffect(() => {
        cntrl.current = new CanvasCntrl(canvasId, width, height);
        cntrl.current.paintCell(0, 1, true);
        cntrl.current.paintCell(23, 14, true);
    }, []);

    console.log(`canvas: ${width}x${height}`);

    // cntrl.current.paintCell(0, 0, true);

    return (
        <div id="canvas-container" className="">
            <canvas
                id={canvasId}
                className=""
                width={width}
                height={height}
            />
        </div>
    );
}
