class Controller
{

    gui;
    #cellularAutomaton;
    #cellularAutomaton2d;
    #intervalId;
    #appState;


    constructor()
    {
        this.gui = new GUI();

        this.#cellularAutomaton = new CellularAutomaton();
        this.#cellularAutomaton2d = new CellularAutomaton2D();

        this.#intervalId = 0;

        this.#addListeners();

        this.#enableTooltips();

        this.#setStopped();


    }

    #addListeners()
    {
        this.gui.controls.flow.next.onClick = () => this.#nextBtnFunc();
        this.gui.controls.flow.run.onClick = () => this.#runBtnFunc();
        this.gui.controls.flow.pause.onClick = () => this.#pauseBtnFunc();
        this.gui.controls.flow.stop.onClick = () => this.#stopBtnFunc();

        this.gui.controls.speed.decreaseBtnClick = () => this.#changeSpeed();
        this.gui.controls.speed.increaseBtnClick = () => this.#changeSpeed();

        this.gui.canvas.canvas.click(
            (evt) =>
            {
                if (this.gui.currentDimension == "d2" 
                    && this.#appState == "stopped") // 2D
                {
                    this.gui.canvas.toggleCell(evt.pageX, evt.pageY);
                }
            }
        );
    }

    #enableTooltips()
    {
        let tooltipTriggerList = [].slice.call(
            document.querySelectorAll("[data-bs-toggle='tooltip']"));
        let tooltipList = tooltipTriggerList.map(
            function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    }

    #setStopped()
    {
        this.gui.dimensionSelectorBtn.enabled = true;

        this.gui.controls.flow.next.enabled = true;
        this.gui.controls.flow.run.enabled = true;
        this.gui.controls.flow.pause.enabled = false;
        this.gui.controls.flow.stop.enabled = false;

        this.gui.controls.canvas.clear.enabled = true;
        this.gui.controls.canvas.screenshot.enabled = true;

        this.gui.neighborhood.enabled = true;
        this.gui.rules.enabled = true;
        this.gui.initialState.enabled = true;

        this.#appState = "stopped";
    }

    #setPaused()
    {
        this.gui.dimensionSelectorBtn.enabled = false;

        this.gui.controls.flow.next.enabled = true;
        this.gui.controls.flow.run.enabled = true;
        this.gui.controls.flow.pause.enabled = false;
        this.gui.controls.flow.stop.enabled = true;

        this.gui.controls.canvas.clear.enabled = false;
        this.gui.controls.canvas.screenshot.enabled = true;

        this.gui.neighborhood.enabled = false;
        this.gui.rules.enabled = false;
        this.gui.initialState.enabled = false;

        this.#appState = "paused";
    }

    #setRunning()
    {
        this.gui.dimensionSelectorBtn.enabled = false;

        this.gui.controls.flow.next.enabled = false;
        this.gui.controls.flow.run.enabled = false;
        this.gui.controls.flow.pause.enabled = true;
        this.gui.controls.flow.stop.enabled = true;

        this.gui.controls.canvas.clear.enabled = false;
        this.gui.controls.canvas.screenshot.enabled = false;

        this.gui.neighborhood.enabled = false;
        this.gui.rules.enabled = false;
        this.gui.initialState.enabled = false;

        this.#appState = "running";
    }

    #loadConfig()
    {
        if (this.gui.currentDimension == "d1") // 1D
        {
            this.#cellularAutomaton.neighborhoodSize = 
            this.gui.neighborhood.getSize("d1");

            this.#cellularAutomaton.rules = this.gui.rules.ruleNumber;

            this.#cellularAutomaton.neighborhoods = 
                this.gui.initialState.neighborhoods;

            this.#cellularAutomaton.state = this.gui.initialState.state;


            this.gui.canvas.clearBuffer();   
            this.gui.canvas.bufferRow(this.#cellularAutomaton.state);
            this.gui.canvas.paintBuffer();
        }
        else // 2D
        {
            this.#cellularAutomaton2d.config = 
            {
                neighborhoodSize: this.gui.neighborhood.getSize("d2"),
                neighborhoodType: this.gui.neighborhood.getType("d2"),
                neighborhoodAlignment: this.gui.neighborhood.getAlignment("d2"),
                rules: this.gui.rules.rules2D,
            };

            this.#cellularAutomaton2d.state = this.gui.canvas.buffer;

            console.log(this.#cellularAutomaton2d.state);
        }
    }

    #nextAutomatonState()
    {
        if (this.gui.currentDimension == "d1") // 1D
        {
            this.gui.canvas.bufferRow(
                this.#cellularAutomaton.nextState());
            this.gui.canvas.paintBuffer();
        }
        else // 2D
        {
            this.gui.canvas.paintCells(
                this.#cellularAutomaton2d.nextState(true));
        }
    }

    #runAutomaton() 
    {
        this.#intervalId = setInterval(
            () => this.#nextAutomatonState(), this.gui.controls.speed.value);
    }

    #stopAutomaton()
    {
        clearInterval(this.#intervalId);
    }

    #changeSpeed()
    {
        if (this.#appState == "running") 
        {
            this.#stopBtnFunc();
            this.#runBtnFunc(); 
        }
    }

    #nextBtnFunc()
    {
        switch (this.#appState)
        {
            case "stopped":
                this.#loadConfig();
                this.#setPaused();
                break;

            case "paused":
                this.#nextAutomatonState();
                break;
        }
    }

    #runBtnFunc()
    {
        switch (this.#appState)
        {
            case "stopped":
                this.#loadConfig();
                this.#runAutomaton();

                this.#setRunning();
                break;

            case "paused":
                this.#runAutomaton();

                this.#setRunning();
                break;
        }
    }

    #pauseBtnFunc()
    {
        switch (this.#appState)
        {
            case "running":
                this.#stopAutomaton();

                this.#setPaused();
                break;
        }
    }

    #stopBtnFunc()
    {
        switch (this.#appState)
        {
            case "running":
                this.#stopAutomaton();

                this.#setStopped();
                break;

            case "paused":
                this.#stopAutomaton();
                
                this.#setStopped();
                break;
        }
    }

}
