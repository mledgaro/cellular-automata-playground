//

import React from "react";

import { useEffect, useMemo, useRef } from "react";
import CanvasCntrl from "../ts/CanvasCntrl";

const canvasId = "cap-canvas";

export default function Canvas() {
    //

    // const cntrl = useRef();
    const width = useMemo(
        () => Math.floor(window.innerWidth * 0.95),
        [window.innerWidth]
    );
    const height = useMemo(
        () => Math.floor(window.innerHeight * 0.7),
        [window.innerHeight]
    );

    // useEffect(() => {
    //     const gr = document.getElementById("cap-canvas").getContext("2d");
    //     cntrl.current = new CanvasCntrl(gr, width, height);
    //     cntrl.current.paintCell(0, 1, true);
    // }, []);

    console.log(`canvas: ${width}x${height}`);

    // cntrl.current.paintCell(0, 0, true);

    return (
        <div id="canvas-container" className="border">
            <canvas
                id={canvasId}
                className="border"
                width={width}
                height={height}
            />
        </div>
    );
}
