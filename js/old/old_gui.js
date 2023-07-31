const GUI = 
{
    colorPalette: // property
    {
        background: "#6c757d",
        cellOff: "#212529",
        cellOn: "#ffc107",
        highlight: "#f8f9fa",
    },
    dimensionSelector:
    {
        currentDimension: "oneDim",
        element: "dimension-selector-btn",
        dimClass:
        {
            oneDim: "cap-1d-component",
            twoDim: "cap-2d-component",
        },
        init: function ()
        {
            this.element.children(".fa-2").hide();

            $("." + this.dimClass.twoDim).hide();

            this.element.click(() => this.toggle());
        },
        toggle: function ()
        {
            this.currentDimension = 
                this.currentDimension == "oneDim" ? "twoDim" : "oneDim";

            this.element.children(".fa-1").toggle();
            this.element.children(".fa-2").toggle();

            $("." + this.dimClass.oneDim).toggle();
            $("." + this.dimClass.twoDim).toggle();

            GUI.sections.initialState.update();
            GUI.sections.show("neighborhood");
        },
    },
    cellsCanvas: new CellsCanvas("cells-canvas", this.colorPalette, 10),
    controls:
    {
        flow:
        {
            next: new CAPButton("next-controls-flow-btn", "Next", "forward-step", "lg"),
            run: new CAPButton("run-controls-flow-btn", "Run", "play", "lg"),
            pause: new CAPButton("pause-controls-flow-btn", "Pause", "pause", "lg"),
            stop: new CAPButton("stop-controls-flow-btn", "Stop", "stop", "lg"),
        },
        canvas:
        {
            clear: new CAPButton("clear-controls-canvas-btn", "Clear", "broom", "lg"),
            screenshot: new CAPButton("screenshot-controls-canvas-btn", "Screenshot", "camera-retro", "lg"),
            init: function ()
            {
                this.clear.onClick = () =>
                {
                    GUI.cellsCanvas.clear();
                    GUI.cellsCanvas.clearBuffer();
                };

                this.screenshot.onClick = () =>
                {
                    GUI.cellsCanvas.takeScreenshot(
                        "cellular_automaton_playground");
                };
            },
        },
        speed: new LevelSelector("speed-level-container", [1000, 500, 250, 125, 1], "gauge-high", "Speed"),
        zoom: new LevelSelector("zoom-level-container", [5, 10, 15, 25, 30], "magnifying-glass", "Zoom"),
        init: function ()
        {
            this.speed.level = 2;

            let zoomFunc = () => 
            {
                GUI.cellsCanvas.cellSize = this.zoom.value;
                GUI.cellsCanvas.clear();
            };

            this.zoom.decreaseBtnOnClick = zoomFunc;
            this.zoom.increaseBtnOnClick = zoomFunc;

            this.zoom.level = 2;
        },
    },
    sections:
    {
        selector: new CAPButtonGroupSelector(
            "section-selector-container", 
            ["Neighborhood", "Rules", "Initial state"],
            [
                () => this.show("neighborhood"),
                () => this.show("rules"),
                () => this.show("initialState")]),
        sectionClass: "cap-section",
        init: function ()
        {
            this.selector.active = 0;
            this.show("neighborhood");
        },
        show: function (section)
        {
            $("." + this.sectionClass).hide();
            this[section].visible = true;
        },
    },
    neighborhood:
    {
        container: "section-neighborhood",
        size:
        {
            oneDim:
            {
                element: "neighborhood-size-1d",
                defaultValue: 3,
                init: function ()
                {
                    this.element.text(this.defaultValue);
                    this.element.change(() => this.notify());
                },
                notify: function ()
                {
                    let neighborhoodSize, atomicRulesAmount, maxRuleNumber;

                    neighborhoodSize = this.element.val();
                    atomicRulesAmount = Math.pow(2, neighborhoodSize);
                    maxRuleNumber = Math.pow(2, atomicRulesAmount);

                    GUI.rules.atomicRules.updateAmount();

                    GUI.rules.ruleNumber.updateMaxValue();
                    GUI.rules.ruleNumber.setRandom();
                    GUI.initialState.cells.updateNeighborhoods();
                    GUI.neighborhood.alignment.oneDim.update();
                },
            },
            twoDim:
            {
                element: "neighborhood-size-2d",
                defaultValue: 3,
                init: function ()
                {
                    this.element.text(this.defaultValue);
                    this.element.change(() => this.notify());
                },
                notify: function ()
                {
                    GUI.neighborhood.alignment.twoDim.update();
                },
            },
            get value()
            {
                return Number(GUI.dimElement(this).val());
            },
            set enabled(bool)
            {
                GUI.setEnabled(GUI.dimElement(this), bool);
            },
        },
        type:
        {
            oneDim:
            {
                element: "neighborhood-type-1d",
                init: function ()
                {
                    this.element.change(() => this.notify());
                },
                notify: function ()
                {
                    GUI.initialState.cells.updateNeighborhoods();
                    GUI.neighborhood.alignment.oneDim.update();
                    GUI.initialState.neighborhoodsBtn.update();
                },
            },
            twoDim:
            {
                element: "neighborhood-type-2d",
                init: function ()
                {

                },
            },
            get value()
            {
                return Number(GUI.dimElement(this).val());
            },
            set enabled(bool)
            {
                GUI.setEnabled(GUI.dimElement(this), bool);
            },
        },
        alignment:
        {
            oneDim:
            {
                element: "neighborhood-alignment-1d",
                init: function ()
                {
                    this.update();
                    this.element.change(() => this.notify());
                },
                notify: function ()
                {
                    GUI.initialState.cells.updateNeighborhoods();
                },
                update: function ()
                {
                    GUI.setEnabled(this.element, 
                        GUI.neighborhood.type.value == "insitu" 
                            && (GUI.neighborhood.size.value % 2) == 0);
                },
            },
            twoDim:
            {
                element: "neighborhood-alignment-2d",
                init: function ()
                {
                    
                },
                update: function ()
                {
                    GUI.setEnabled(this.element, 
                        (GUI.neighborhood.size.value % 2) == 0);
                },
            },
            update: function ()
            {
                GUI.dimElement(this).update();
            },
            get value()
            {
                return Number(GUI.dimElement(this).val());
            },
            set enabled(bool)
            {
                GUI.setEnabled(GUI.dimElement(this), bool);
            },
        },
        publicProperties: ["size", "type", "alignment"],
        set enabled(bool)
        {
            this.publicProperties.forEach(
                (e, i, arr) => this[e].enabled(bool)
            );
            this.alignment.update();
        },
    },
    rules: // property
    {
        container: "section-rules",
        ruleNumber:
        {
            element: "rules-rule-number",
            init: function ()
            {
                this.element.change(() => this.notify());
                this.updateMaxValue();
            },
            setRandom: function ()
            {
                this.value = Math.floor(Math.random() * this.max);
            },
            setMinValue: function ()
            {
                this.value = 0;
            },
            setMaxValue: function ()
            {
                this.value = this.max;
            },
            updateMaxValue: function ()
            {
                let neighborhoodSize, maxRuleNumber;

                neighborhoodSize = GUI.neighborhood.size.value;
                maxRuleNumber = Math.pow(2, Math.pow(2, neighborhoodSize)) - 1;

                this.max = maxRuleNumber;
            },
            updateValue: function ()
            {
                this.value = GUI.rules.atomicRules.ruleNumber;
            },
            notify: function ()
            {
                GUI.rules.atomicRules.updateState();
            },
            get value()
            {
                return Number(this.element.val());
            },
            get max()
            {
                return Number(this.element.attr("max"));
            },
            set value(num)
            {
                this.element.val(num);
                GUI.rules.atomicRules.updateState();
            },
            set max(num)
            {
                this.element.attr("max", num);
            },
        },
        randomBtn:
        {
            element: "rules-random-rule-btn",
            init: function ()
            {
                this.element.click(() => GUI.rules.ruleNumber.setRandom());
            },
        },
        uncheckAllRulesBtn:
        {
            element: "rules-uncheck-rules-btn",
            init: function ()
            {
                this.element.click(() => GUI.rules.ruleNumber.setMinValue());
            },
        },
        checkAllRulesBtn:
        {
            element: "rules-check-rules-btn",
            init: function ()
            {
                this.element.click(() => GUI.rules.ruleNumber.setMaxValue());
            },
        },
        atomicRules: // compound
        {
            container: "rules-atomic-rules-cont",
            arr: [], 
            init: function ()
            {
                this.updateAmount();
                this.updateState();
            },
            updateAmount: function ()
            {
                let size, neighborhoodSize;

                neighborhoodSize = GUI.neighborhood.size.value;
                size = Math.pow(2, neighborhoodSize);

                this.arr = [];
                this.container.empty();

                for (let i = 0, arule; i < size; i++)
                {
                    arule = new AtomicRule(i, neighborhoodSize);

                    arule.click = () => GUI.rules.ruleNumber.updateValue();

                    this.arr.push(arule);
                    this.container.append(arule.element);
                }
            },
            updateState: function ()
            {
                this.ruleNumber = GUI.rules.ruleNumber.value;
            },
            get values()
            {
                return this.arr.map((e) => e.checked);
            },
            get ruleNumber()
            {
                return CellularAutomaton.boolArrayToInt(this.values);
            },
            get amount()
            {
                return this.arr.length;
            },
            set ruleNumber(ruleNumber)
            {
                let boolArr = CellularAutomaton.intToBoolArray(
                    ruleNumber, 
                    GUI.rules.atomicRulesNum);

                this.arr.forEach((e, i, arr) => e.checked = boolArr[i]);
            },
            set enabled(bool)
            {
                AtomicRule.setAllEnabled(bool);
            },
        },
        dimTwoRules:
        {
            born:
            {
                container: "rules-born-rules-cont",
            },
            die:
            {
                container: "rules-die-rules-cont",
            },
            init: function ()
            {
                for (let i = 0, j, ruleComp; i <= 8; i++)
                {
                    for (j = 0; j < 2; j++)
                    {
                        ruleComp = this.buildVerticalRuleComp(i);

                        if (j == 0)
                        {
                            this.born.container.append(ruleComp);
                        }
                        else
                        {
                            this.die.container.append(ruleComp);
                        }
                    }
                }

                let bornBtns, dieBtns;

                bornBtns = this.born.container.find(".card-body");
                dieBtns = this.die.container.find(".card-body");

                for (let i = 0; i <= 8; i++)
                {
                    bornBtns.eq(i).click(
                        function ()
                        {
                            let icon, otherIcon;

                            icon = $(this).children("i");
                            otherIcon = dieBtns.eq(i).children("i");

                            icon.toggleClass("fa-square");
                            icon.toggleClass("fa-square-check");

                            if (otherIcon.hasClass("fa-square-check"))
                            {
                                otherIcon.toggleClass("fa-square");
                                otherIcon.toggleClass("fa-square-check"); 
                            }
                        }
                    );
                    dieBtns.eq(i).click(
                        function ()
                        {
                            let icon, otherIcon;

                            icon = $(this).children("i");
                            otherIcon = bornBtns.eq(i).children("i");

                            icon.toggleClass("fa-square");
                            icon.toggleClass("fa-square-check");

                            if (otherIcon.hasClass("fa-square-check"))
                            {
                                otherIcon.toggleClass("fa-square");
                                otherIcon.toggleClass("fa-square-check"); 
                            }
                        }
                    );
                }
            },
            buildVerticalRuleComp: function (label)
            {
                let comp;

                comp = $(`\
                    <div class='col d-flex justify-content-center m-1'>\
                    <div class='card bg-warning border-0'\
                                style='width:3.5em;'>\
                        <div class='card-header cap-text-label p-1'>\
                            ${label}\
                        </div>\
                        <div class='card-body p-1 mx-auto text-dark'>\
                            <i class='fa-square fa-solid fa-xl'></i>\
                        </div>\
                    </div>\
                    </div>\
                `);

                return comp;
            },
            set enabled(bool)
            {

            },
        },
        set enabled(bool)
        {
            GUI.setEnabledObj(this.ruleNumber, bool);
            GUI.setEnabledObj(this.randomBtn, bool);
            GUI.setEnabledObj(this.uncheckAllRulesBtn, bool);
            GUI.setEnabledObj(this.checkAllRulesBtn, bool);
            
            this.atomicRules.enabled = bool;
            this.dimTwoRules.enabled = bool;
        },
    },
    initialState:
    {
        container: "section-initial-state",
        clearBtn:
        {
            element: "initial-state-clear-btn",
            init: function ()
            {
                this.element.click(() => GUI.initialState.cells.clearState());
            },
        },
        density:
        {
            element: "initial-state-density",
            init: function ()
            {

            },
            get value()
            {
                return this.element.val();
            }
        },
        randomBtn:
        {
            element: "initial-state-random-btn",
            init: function ()
            {
                this.element.click(() => GUI.initialState.cells.setRandomState());
            },
        },
        neighborhoodsBtn:
        {
            element: "initial-state-neighborhoods-btn",
            init: function ()
            {
                this.update();
                this.element.click(() => GUI.initialState.cells.updateNeighborhoods());
            },
            update: function ()
            {
                GUI.setEnabled(this.element, 
                    GUI.neighborhood.type.value != "insitu");
            },
        },
        cells:
        {
            container: "initial-state-cells",
            arr: [],
            size: 0,
            init: function ()
            {
                let numCells, i, cell;

                numCells = GUI.cellsCanvas.maxColumns;

                for (i = 0; i < numCells; i++)
                {
                    cell = new CellButton(i);
                    this.arr.push(cell);
                    this.container.append(cell.element);
                }

                this.size = numCells;

                this.updateNeighborhoods();
                this.setRandomState();
            },
            setRandomState: function ()
            {
                let state = CellularAutomaton.randomState(
                    this.size, GUI.initialState.density.value);

                this.arr.forEach((e, i) => e.checked = state[i]);
            },
            clearState: function ()
            {
                this.arr.forEach((e, i, arr) => e.checked = false);
            },
            updateNeighborhoods: function ()
            {
                let size, type, alignment;

                size = GUI.neighborhood.size.value;
                type = GUI.neighborhood.type.value;
                alignment = GUI.neighborhood.alignment.value;

                switch (type)
                {
                    case "insitu":
                        GUI.initialState.neighborhoodsBtn.visible = false;
                        this.neighborhoods =
                            CellularAutomaton.inSituNeighborhoods(
                                this.size, size, alignment);
                        break;

                    case "scattered":
                        GUI.initialState.neighborhoodsBtn.visible = true;
                        this.neighborhoods = 
                            CellularAutomaton.randomScatteredNeighborhoods(
                                this.size, size);
                        break;

                    case "grouped":
                        GUI.initialState.neighborhoodsBtn.visible = true;
                        this.neighborhoods =
                            CellularAutomaton.randomGroupedNeighborhoods(
                                this.size, size);
                        break;
                }
            },
            get values()
            {
                return this.arr.map((e) => e.checked);
            },
            get neighborhoods()
            {
                return this.arr.map(
                    (e) => e.neighborhood.map((e) => Number(e.element.innerText))
                );
            },
            set neighborhoods(conns)
            {
                this.arr.forEach(
                    (e, i, arr) =>
                        e.neighborhood = conns[i].map((e2) => arr[e2])
                );
            },
            set enabled(bool)
            {
                this.arr.forEach((e, i, arr) => e.enabled = bool);
            }
        },
        init: function ()
        {
            
        },
        set enabled(bool)
        {
            this.clearBtn.enabled = bool;
            this.randomBtn.enabled = bool;
            // this.randomConnectionsBtn.enabled = bool;
            this.cells.enabled = bool;
        }
    },
    initAll: function ()
    {
        this.initElements(this);
        this.callInitFunctions(this);

        // $(".cap-1d-component").hide();
        // $(".cap-2d-component").show();
    },
    initElements: function (obj)
    {
        for (let prop in obj)
        {
            if (!obj.hasOwnProperty(prop)) { continue; }

            if ((typeof obj[prop]) == "string" 
                    && (prop == "container" || prop == "element"))
            {
                obj[prop] = $(`#${obj[prop]}`);
            }
            else if (typeof obj[prop] == "object")
            {
                this.initElements(obj[prop]);
            }
        }
    },
    callInitFunctions: function (obj)
    {
        let currObj, nprop;

        for (let prop in obj)
        {
            currObj = obj[prop];

            if (!obj.hasOwnProperty(prop) || typeof (currObj) != "object" 
                || prop == "element" || prop == "container") { continue; }

            if (prop.startsWith("_"))
            {
                nprop = prop.slice(1);
                obj[nprop] = currObj.init();

                if (currObj.element == null)
                {
                    currObj.element = obj[nprop].element;
                    currObj.container.append(currObj.element);
                }
            }
            else 
            {
                this.callInitFunctions(currObj);

                if ("init" in currObj) 
                {
                    // console.log("init function - " + prop);
                    currObj.init();
                }
            }
        }
    },
    setEnabled: function (element, bool)
    {
        element.removeAttr("disabled");
        if (!bool)
        {
            element.attr("disabled", "true");
        }
    },
    setEnabledObj: function (obj, bool)
    {
        this.setEnabled(obj.element, bool);
    },
    dimElement: function (obj)
    {
        return obj[this.dimensionSelector.currentDimension].element;
    },
    set sectionVisible(section)
    {
        $(".cap-section").hide();
        this[section].container.show();
    },
};
