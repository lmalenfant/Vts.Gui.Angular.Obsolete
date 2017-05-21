(function (app) {
    app.ModelAnalysisTypeComponent =
      ng.core.Component({
          selector: "vts-model-analysis-type",
          templateUrl: "Template/vts-model-analysis-type.html",
          inputs: ['modelAnalysis']
      })
      .Class({
          constructor: function () {
          }
      });
})(window.app || (window.app = {}));
