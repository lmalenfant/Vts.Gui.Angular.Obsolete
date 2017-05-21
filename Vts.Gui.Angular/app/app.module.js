(function (app) {
    app.AppModule =
      ng.core.NgModule({
          imports: [
              ng.platformBrowser.BrowserModule,
              ng.forms.FormsModule
          ],
          declarations: [
              app.VtsApplicationComponent,
              app.ForwardSolverEngineComponent,
              app.VtsInverseSolverComponent,
              app.RangeComponent,
              app.OpticalPropertiesComponent,
              app.SolutionDomainComponent,
              app.VtsForwardSolverComponent,
              app.ModelAnalysisTypeComponent
          ],
          bootstrap: [app.VtsApplicationComponent]
      })
      .Class({
          constructor: function () { }
      });
})(window.app || (window.app = {}));
