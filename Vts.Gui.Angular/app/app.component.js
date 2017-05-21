(function (app) {
    app.VtsApplicationComponent =
      ng.core.Component({
          selector: "vts-application",
          directives: [
              app.ForwardSolverEngineComponent,
              app.VtsInverseSolverComponent,
              app.SolutionDomainComponent,
              app.RangeComponent,
              app.OpticalPropertiesComponent,
              app.VtsForwardSolverComponent,
              app.ModelAnalysisTypeComponent
          ],
          templateUrl: "Template/vts-application.html"
      })
      .Class({
          constructor: function () { }
      });
})(window.app || (window.app = {}));
