(function (app) {
    app.Range = range;
    app.OpticalProperties = opticalProperties;

    app.url = "Handlers/VtsHandler.ashx";
    app.currentPlotObject = [];

    function range(startValue, endValue, numberValue) {
        this.startValue = startValue;
        this.endValue = endValue;
        this.numberValue = numberValue;
    }

    function opticalProperties(mua, mus, g, n) {
        this.mua = mua;
        this.mus = mus;
        this.g = g;
        this.n = n;
    }
})(window.app || (window.app = {}));
