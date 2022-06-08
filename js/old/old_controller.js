const CONTROLLER = 
{
    gui: new GUI(GUI_IDS),
    cellularAutomaton: new CellularAutomaton(),
    intervalId: 0,
    flow:
    {
        state: "stopped",
        _next: 
        {
            stopped: function ()
            {
                CONTROLLER.loadConfig();
                CONTROLLER.flow.setPaused();
            },
            running: () => null,
            paused: function ()
            {
                CONTROLLER.nextState();
            }
        },
        _run:
        {
            stopped: function ()
            {
                CONTROLLER.loadConfig();
                CONTROLLER.run();
                
                CONTROLLER.flow.setRunning();
            },
            running: () => null,
            paused: function ()
            {
                CONTROLLER.run();
                
                CONTROLLER.flow.setRunning();
            }
        },
        _pause:
        {
            stopped: () => null,
            running: function ()
            {
                CONTROLLER.stop();

                CONTROLLER.flow.setPaused();
            },
            paused: () => null
        },
        _stop:
        {
            stopped: () => null,
            running: function ()
            {
                CONTROLLER.stop();

                CONTROLLER.flow.setStopped();
            },
            paused: function ()
            {
                this.running();
            }
        },
        setStopped: function ()
        {
            this.gui.dimensionSelectorBtn.enabled = true;

            this.gui.controls.flow.next.enabled = true;
            this.gui.controls.flow.run.enabled = true;
            this.gui.controls.flow.pause.enabled = false;
            this.gui.controls.flow.stop.enabled = false;

            this.gui.controls.canvas.clear = true;
            this.gui.controls.canvas.screenshot = true;

            this.gui.neighborhoodSectionEnabled = true;
            this.gui.rulesSectionEnabled = true;
            this.gui.initialStateSectionEnabled = true;

            this.state = "stopped";
        },
        setPaused: function ()
        {
            this.gui.dimensionSelectorBtn.enabled = false;

            this.gui.controls.flow.next.enabled = true;
            this.gui.controls.flow.run.enabled = true;
            this.gui.controls.flow.pause.enabled = false;
            this.gui.controls.flow.stop.enabled = true;

            this.gui.controls.canvas.clear = false;
            this.gui.controls.canvas.screenshot = true;

            this.gui.neighborhoodSectionEnabled = false;
            this.gui.rulesSectionEnabled = false;
            this.gui.initialStateSectionEnabled = false;

            this.state = "paused";
        },
        setRunning: function ()
        {
            this.gui.dimensionSelectorBtn.enabled = false;

            this.gui.controls.flow.next.enabled = false;
            this.gui.controls.flow.run.enabled = false;
            this.gui.controls.flow.pause.enabled = true;
            this.gui.controls.flow.stop.enabled = true;

            this.gui.controls.canvas.clear = false;
            this.gui.controls.canvas.screenshot = false;

            this.gui.neighborhoodSectionEnabled = false;
            this.gui.rulesSectionEnabled = false;
            this.gui.initialStateSectionEnabled = false;

            this.state = "running";
        },
        next: function ()
        {
            this._next[this.state]();
        },
        run: function ()
        {
            this._run[this.state]();
        },
        pause: function ()
        {
            this._pause[this.state]();
        },
        stop: function ()
        {
            this._stop[this.state]();
        }
    },
    init: function ()
    {
        // this.gui = new GUI(GUI_IDS);

        // this.cellularAutomaton = new CellularAutomaton();

        this.addListeners();

        this.enableTooltips();

        this.flow.setStopped();
    },
    addListeners: function ()
    {
        this.gui.controls.flow.next.onClick = () => CONTROLLER.flow.next();
        this.gui.controls.flow.run.onClick = () => CONTROLLER.flow.run();
        this.gui.controls.flow.pause.onClick = () => CONTROLLER.flow.pause();
        this.gui.controls.flow.stop.onClick = () => CONTROLLER.flow.stop();

        this.gui.controls.speed.decreaseBtnClick = () => this.changeSpeed();
        this.gui.controls.speed.increaseBtnClick = () => this.changeSpeed();
    },
    enableTooltips: function ()
    {
        let tooltipTriggerList = [].slice.call(
            document.querySelectorAll("[data-bs-toggle='tooltip']"));
        let tooltipList = tooltipTriggerList.map(
            function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    },
    to2DMode: function ()
    {

    },
    to1DMode: function ()
    {

    },
    loadConfig: function ()
    {
        this.cellularAutomaton.neighborhoodSize = this.gui.neighborhoodSize;
        this.cellularAutomaton.rules = this.gui.ruleNumber;
        this.cellularAutomaton.neighborhoods = 
            this.gui.initialStateNeighborhoods;
        this.cellularAutomaton.state = this.gui.initialState;

        this.gui.cellsCanvas.clearBuffer();
        this.gui.cellsCanvas.clear();
        this.gui.cellsCanvas.bufferAndPaint(this.cellularAutomaton.state);
    },
    nextState: function ()
    {
        this.gui.cellMatrix.bufferAndPaint(this.cellularAutomaton.nextState());
    },
    run: function () {
        this.intervalId = setInterval(
            () => this.nextState(), this.gui.speed);
    },
    stop: function ()
    {
        clearInterval(this.intervalId);
    },
    changeSpeed: function ()
    {
        if (this.flow.state == "running") 
        {
            this.stop();
            this.run(); 
        }
    },
};



document.addEventListener("DOMContentLoaded", () => CONTROLLER.init());
