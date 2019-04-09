import sketch from 'sketch';

class UpdateMultipleElements {

    constructor (context, properties) {
        this.context = context;
        this.selector = properties.selector || sketch.UI.getStringFromUser("What is the ID elements?");
        this.type = properties.type || sketch.UI.getStringFromUser("What PROPERTY would you like to change?");
        this.value = properties.value || sketch.UI.getStringFromUser("What's the new VALUE?");
        this.modifiedLayers = 0;

        if (this.selector && this.selector !== 'null'
            && this.type && this.type !== 'null'
            && this.value && this.value !== 'null') {
            this.updatePages().then(() => this.resizeToFitChildren().then(() => this.sendSuccessMessage()));
        } else {
            this.sendErrorMessage();
        }
    }

    sendSuccessMessage () {
        sketch.UI.message("We set "+ this.type +" to " + this.value + "px on "+ this.modifiedLayers +" "+
            (this.modifiedLayers.length > 1 ? "elements" : "element") + " 🙌");
    }

    sendErrorMessage () {
        sketch.UI.message("Nothing changed, please update your query...");
    }

    resizeToFitChildren () {
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

    updateLayers (layers) {
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

    updatePages () {
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

const frameCanvas =  () => {
    const relief = {
    	width: 64,
    	height: 64
    };
    const frame = {
    	width: 45,
    	height: 45
    };
    const shadow = {
    	width: 45,
    	height: 45
    };
    const content = { width: mmToPx(407), height: mmToPx(305) };

    const data = [];
    /**
     * Relief
     */
    // Top
    data.push({
    	selector: 'relief-width',
    	type: 'width',
    	value: content.width + 2 * frame.width + relief.width
    });
    data.push({
    	selector: 'relief-top-mask',
    	type: 'x',
    	value: content.width + relief.width * Math.sqrt(2)
    });
    // Right
    data.push({
    	selector: 'relief-right',
    	type: 'x',
    	value: content.width + 2 * frame.width
    });
    data.push({
    	selector: 'relief-height',
    	type: 'height',
    	value: content.height + 2 * frame.height + relief.height
    });
    data.push({
    	selector: 'relief-right-mask',
    	type: 'y',
    	value: content.height + 2 * frame.height
    });
    /**
     * Shadow
     */
    // Top
    data.push({
    	selector: 'shadow-top',
    	type: 'width',
    	value: content.width - shadow.width
    });
    // Left
    data.push({
    	selector: 'shadow-left-height',
    	type: 'height',
    	value: content.height
    });
    data.push({
    	selector: 'shadow-left-mask',
    	type: 'y',
    	value: content.height + shadow.height * Math.sqrt(2)
    });
    // Right
    data.push({
    	selector: 'shadow-right',
    	type: 'height',
    	value: content.height - shadow.height
    });
    data.push({
    	selector: 'shadow-right',
    	type: 'x',
    	value: content.width
    });
    // Bottom
    data.push({
    	selector: 'shadow-bottom',
    	type: 'y',
    	value: content.height + shadow.height * Math.sqrt(2)
    });
    data.push({
    	selector: 'shadow-bottom-width',
    	type: 'width',
    	value: content.width
    });
    /**
     * Frame
     */
    // Width
    data.push({
    	selector: 'frame-width',
    	type: 'width',
    	value: content.width + 2 * frame.width
    });
    // Height
    data.push({
    	selector: 'frame-height',
    	type: 'height',
    	value: content.height + 2 * frame.width
    });
    // Top
    data.push({
    	selector: 'frame-top-mask',
    	type: 'x',
    	value: content.width + frame.width
    });
    // Left
    data.push({
    	selector: 'frame-left-mask',
    	type: 'y',
    	value: content.height + frame.height * (1.715 * Math.sqrt(2))
    });
    // Right
    data.push({
    	selector: 'frame-right',
    	type: 'x',
    	value: content.width + frame.width
    });
    data.push({
    	selector: 'frame-right-mask',
    	type: 'x',
    	value: content.width
    });
    data.push({
    	selector: 'frame-right-mask',
    	type: 'y',
    	value: content.height + frame.height * (1 + Math.sqrt(2))
    });
    // Bottom
    data.push({
    	selector: 'frame-bottom',
    	type: 'y',
    	value: content.height + frame.height * (1.715 * Math.sqrt(2))
    });
    data.push({
    	selector: 'frame-bottom-mask',
    	type: 'x',
    	value: content.width + frame.width
    });
    data.push({
    	selector: 'frame-bottom-mask',
    	type: 'y',
    	value: content.height + frame.height * Math.sqrt(2)
    });
	// Apply Them all!
    data.forEach((item) => {
    	new UpdateMultipleElements(context, item);
    });
};

export default frameCanvas;
