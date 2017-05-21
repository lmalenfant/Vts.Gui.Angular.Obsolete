(function (app) {
    app.RangeComponent =
      ng.core.Component({
          selector: "vts-range",
          templateUrl: "Template/vts-range.html",
          inputs: ['range']
      })
      .Class({
          constructor: function () {
              //this.rangeValues = new app.Range(this.range.startValue, this.range.endValue, this.range.numberValue);
          }
      });
})(window.app || (window.app = {}));
