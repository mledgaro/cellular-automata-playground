class GUIControls {
    static IDS = {
        flow: {
            nextBtn: "next-control-btn",
            runBtn: "run-control-btn",
            pauseBtn: "pause-control-btn",
            stopBtn: "stop-control-btn",
        },
        canvas: {
            clearBtn: "clear-controls-canvas-btn",
            screenshotBtn: "screenshot-controls-canvas-btn",
        },
        speedLvl: "speed-level-container",
        zoomLvl: "zoom-level-container",
    };

    flow;
    canvas;
    speed;
    zoom;

    constructor() {
        this.flow = {
            next: new CAPButton(
                GUIControls.IDS.flow.nextBtn,
                "Next",
                "forward-step",
                "lg"
            ),
            run: new CAPButton(
                GUIControls.IDS.flow.runBtn,
                "Run",
                "play",
                "lg"
            ),
            pause: new CAPButton(
                GUIControls.IDS.flow.pauseBtn,
                "Pause",
                "pause",
                "lg"
            ),
            stop: new CAPButton(
                GUIControls.IDS.flow.stopBtn,
                "Stop",
                "stop",
                "lg"
            ),
        };

        this.canvas = {
            clear: new CAPButton(
                GUIControls.IDS.canvas.clearBtn,
                "Clear",
                "broom",
                "lg"
            ),
            screenshot: new CAPButton(
                GUIControls.IDS.canvas.screenshotBtn,
                "Screenshot",
                "camera-retro",
                "lg"
            ),
        };

        this.speed = new CAPLevelSelector(
            GUIControls.IDS.speedLvl,
            [1000, 500, 250, 125, 1],
            "gauge-high",
            "Speed"
        );

        this.speed.level = 2;

        this.zoom = new CAPLevelSelector(
            GUIControls.IDS.zoomLvl,
            [5, 10, 15, 25, 30],
            "magnifying-glass",
            "Zoom"
        );

        this.zoom.level = 2;
    }
}
