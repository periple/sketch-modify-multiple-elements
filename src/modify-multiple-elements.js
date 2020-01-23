import sketch from 'sketch';

class UpdateMultipleElements {

    constructor(context, properties) {
        this.context = context;
        this.selector = properties.selector ;//|| sketch.UI.getStringFromUser("What is the ID elements?");
        this.type = properties.type;// || sketch.UI.getStringFromUser("What PROPERTY would you like to change?");
        this.value = properties.value;// || sketch.UI.getStringFromUser("What's the new VALUE?");
        this.modifiedLayers = 0;

        if (this.selector && this.selector !== 'null'
            && this.type && this.type !== 'null'
            && this.value && this.value !== 'null') {
            this.updatePages().then(() => this.resizeToFitChildren().then(() => this.sendSuccessMessage()));
        } else {
            this.sendErrorMessage();
        }
    }

    sendSuccessMessage() {
        sketch.UI.message("We set " + this.type + " to " + this.value + "px on " + this.modifiedLayers + " " +
            (this.modifiedLayers.length > 1 ? "elements" : "element") + " 🙌");
    }

    sendErrorMessage() {
        sketch.UI.message("Nothing changed, please update your query...");
    }

    resizeToFitChildren() {
        return new Promise(resolve => {
            this.context.document.pages().forEach(page => {
                if (page.resizeToFitChildrenWithOption) {
                    page.resizeToFitChildrenWithOption(0);
                    page.resizeToFitChildrenWithOption(1);
                }
                page.children().forEach(layer => {
                    if (layer.resizeToFitChildrenWithOption) {
                        layer.resizeToFitChildrenWithOption(0);
                        layer.resizeToFitChildrenWithOption(1);
                    }
                    resolve();
                });
            });
        });
    }

    updateLayers(layers) {
        return new Promise(resolve => {
            layers.forEach((layer, index) => {
                if (layer.name().includes(this.selector)) {
                    layer.absoluteRect()[this.type] = this.value;
                    this.modifiedLayers++;
                }
                if (layers.length === index + 1) resolve();
            });
        });
    }

    updatePages() {
        return new Promise(resolve => {
            const pages = this.context.document.pages();
            pages.forEach((page, index) => {
                const layers = page.children();
                this.updateLayers(layers).then(() => {
                    if (pages.length === index + 1) resolve();
                });
            });
        });
    }
}

const mmToPx = (mm) => Math.floor(mm * 3.7795275591);

const frameCanvas = () => {

//depth
    const relief = {
        width: 32,
        height: 32
    };

    //frame thickness
    const frame = {
        width: 45,
        height: 45
    };

//frame size
    const content = {width: mmToPx(600), height: mmToPx(400)};

    const data = [];
    /**
     * Relief
     */
    // cadre interne taille
    data.push({
        selector: 'innerFrame_0',
        type: 'width',
        value: content.width
    });

    data.push({
        selector: 'innerFrame_0',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'innerFrame_2',
        type: 'width',
        value: content.width
    });

    data.push({
        selector: 'innerFrame_2',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'innerFrame_1',
        type: 'height',
        value: content.height
    });

    data.push({
        selector: 'innerFrame_1',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_3',
        type: 'height',
        value: content.height
    });

    data.push({
        selector: 'innerFrame_3',
        type: 'width',
        value: frame.width
    });


    //cadre interne position
    data.push({
        selector: 'innerFrame_0',
        type: 'x',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_0',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    data.push({
        selector: 'innerFrame_1',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'innerFrame_1',
        type: 'y',
        value: relief.height + frame.height
    });

    data.push({
        selector: 'innerFrame_2',
        type: 'x',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_2',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'innerFrame_3',
        type: 'x',
        value: content.width + frame.width
    });

    data.push({
        selector: 'innerFrame_3',
        type: 'y',
        value: relief.height + frame.height
    });

// corner size :
    data.push({
        selector: 'corner_0',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_0',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_1',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_1',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_2',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_2',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_3',
        type: 'width',
        value: frame.width
    })
    data.push({
        selector: 'corner_3',
        type: 'height',
        value: frame.height
    });

    // corner position :
    data.push({
        selector: 'corner_0',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'corner_0',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    data.push({
        selector: 'corner_1',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'corner_1',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'corner_2',
        type: 'x',
        value: frame.width + content.width
    });

    data.push({
        selector: 'corner_2',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'corner_3',
        type: 'x',
        value: frame.width + content.width
    });

    data.push({
        selector: 'corner_3',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    //triangle size

    data.push({
        selector: 'tri_0',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_0',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_1',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_1',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_2',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_2',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_3',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_3',
        type: 'height',
        value: relief.height
    });

    //triangle position

    data.push({
        selector: 'tri_0',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'tri_0',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_1',
        type: 'x',
        value:  content.width + 2 * frame.width
    });

    data.push({
        selector: 'tri_1',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_2',
        type: 'x',
        value: content.width + 2 * frame.width
    });

    data.push({
        selector: 'tri_2',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_3',
        type: 'x',
        value: 2 * frame.width + content.width
    });

    data.push({
        selector: 'tri_3',
        type: 'y',
        value: relief.height + frame.height + content.height - (relief.height - frame.height)
    });


    //set depth frame size
    data.push({
        selector: 'depthFrame_0',
        type: 'width',
        value: content.width + 2 * frame.width - relief.width
    });

    data.push({
        selector: 'depthFrame_0',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'depthFrame_1',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'depthFrame_1',
        type: 'height',
        value: content.height + 2 * frame.height - relief.height
    });

    //set depth frame position
    data.push({
        selector: 'depthFrame_0',
        type: 'x',
        value: relief.width
    });

    data.push({
        selector: 'depthFrame_0',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'depthFrame_1',
        type: 'x',
        value: 2 * frame.width + content.width
    });

    data.push({
        selector: 'depthFrame_1',
        type: 'y',
        value: relief.height
    });
/*
    data.push({
        selector: 'dynamic-color',
        type: 'width',
        value: 2 * frame.width + relief.width + content.width
    });

    data.push({
        selector: 'dynamic-color',
        type: 'height',
        value: 2 * frame.height + relief.height + content.height
    });
*/
    data.push({
        selector: 'dynamic-color',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'dynamic-color',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'innerFrame_0_background',
        type: 'width',
        value: content.width
    });

    data.push({
        selector: 'innerFrame_0_background',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'innerFrame_2_background',
        type: 'width',
        value: content.width
    });

    data.push({
        selector: 'innerFrame_2_background',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'innerFrame_1_background',
        type: 'height',
        value: content.height
    });

    data.push({
        selector: 'innerFrame_1_background',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_3_background',
        type: 'height',
        value: content.height
    });

    data.push({
        selector: 'innerFrame_3_background',
        type: 'width',
        value: frame.width
    });


    //cadre interne position
    data.push({
        selector: 'innerFrame_0_background',
        type: 'x',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_0_background',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    data.push({
        selector: 'innerFrame_1_background',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'innerFrame_1_background',
        type: 'y',
        value: relief.height + frame.height
    });

    data.push({
        selector: 'innerFrame_2_background',
        type: 'x',
        value: frame.width
    });

    data.push({
        selector: 'innerFrame_2_background',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'innerFrame_3_background',
        type: 'x',
        value: content.width + frame.width
    });

    data.push({
        selector: 'innerFrame_3_background',
        type: 'y',
        value: relief.height + frame.height
    });

// corner size :
    data.push({
        selector: 'corner_0_background',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_0_background',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_1_background',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_1_background',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_2_background',
        type: 'width',
        value: frame.width
    });

    data.push({
        selector: 'corner_2_background',
        type: 'height',
        value: frame.height
    });

    data.push({
        selector: 'corner_3_background',
        type: 'width',
        value: frame.width
    })
    data.push({
        selector: 'corner_3_background',
        type: 'height',
        value: frame.height
    });

    // corner position :
    data.push({
        selector: 'corner_0_background',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'corner_0_background',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    data.push({
        selector: 'corner_1_background',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'corner_1_background',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'corner_2_background',
        type: 'x',
        value: frame.width + content.width
    });

    data.push({
        selector: 'corner_2_background',
        type: 'y',
        value: relief.height
    });

    data.push({
        selector: 'corner_3_background',
        type: 'x',
        value: frame.width + content.width
    });

    data.push({
        selector: 'corner_3_background',
        type: 'y',
        value: relief.height + frame.height + content.height
    });

    //triangle size

    data.push({
        selector: 'tri_0_background',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_0_background',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_1_background',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_1_background',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_2_background',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_2_background',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'tri_3_background',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'tri_3_background',
        type: 'height',
        value: relief.height
    });

    //triangle position

    data.push({
        selector: 'tri_0_background',
        type: 'x',
        value: 0
    });

    data.push({
        selector: 'tri_0_background',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_1_background',
        type: 'x',
        value:  content.width + 2 * frame.width
    });

    data.push({
        selector: 'tri_1_background',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_2_background',
        type: 'x',
        value: content.width + 2 * frame.width
    });

    data.push({
        selector: 'tri_2_background',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'tri_3_background',
        type: 'x',
        value: 2 * frame.width + content.width
    });

    data.push({
        selector: 'tri_3_background',
        type: 'y',
        value: relief.height + frame.height + content.height - (relief.height - frame.height)
    });


    //set depth frame size
    data.push({
        selector: 'depthFrame_0_background',
        type: 'width',
        value: content.width + 2 * frame.width - relief.width
    });

    data.push({
        selector: 'depthFrame_0_background',
        type: 'height',
        value: relief.height
    });

    data.push({
        selector: 'depthFrame_1_background',
        type: 'width',
        value: relief.width
    });

    data.push({
        selector: 'depthFrame_1_background',
        type: 'height',
        value: content.height + 2 * frame.height - relief.height
    });

    //set depth frame position
    data.push({
        selector: 'depthFrame_0_background',
        type: 'x',
        value: relief.width
    });

    data.push({
        selector: 'depthFrame_0_background',
        type: 'y',
        value: 0
    });

    data.push({
        selector: 'depthFrame_1_background',
        type: 'x',
        value: 2 * frame.width + content.width
    });

    data.push({
        selector: 'depthFrame_1_background',
        type: 'y',
        value: relief.height
    });


    // Apply Them all!
    data.forEach((item) => {
        new UpdateMultipleElements(context, item);
    });
};

export default frameCanvas;
