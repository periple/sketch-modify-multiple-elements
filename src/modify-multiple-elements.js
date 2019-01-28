import sketch from 'sketch';

class UpdateMultipleElements {


    constructor (context) {
        this.context = context;
        this.selector = sketch.UI.getStringFromUser("What is the ID elements?");
        this.type = sketch.UI.getStringFromUser("What PROPERTY would you like to change?");
        this.value = sketch.UI.getStringFromUser("What's the new VALUE?");
        this.modifiedLayers = 0;

        if (this.selector && this.type && this.value) {
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

export default function () {
    new UpdateMultipleElements(context);
}
