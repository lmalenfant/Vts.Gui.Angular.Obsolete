(function (app) {
    app.VtsForwardSolverComponent =
      ng.core.Component({
          selector: "vts-forward-solver",
          templateUrl: "Template/forward-solver-analysis.html",
          directives: [
              app.ForwardSolverEngineComponent,
              app.SolutionDomainComponent,
              app.OpticalPropertiesComponent,
              app.ModelAnalysisTypeComponent
          ]
      })
      .Class({
          constructor: function () {
              this.forwardSolverEngine = { value: 'DistributedPointSourceSDA' };
              this.gaussianBeam = {
                  show: false,
                  diameter: '0.1'
              };
              this.solutionDomain = { value: "rofrho" };
              this.independentAxes = {
                  show: false,
                  first: 'ρ',
                  second: 't',
                  label: 't',
                  value: '0.05',
                  units: 'ns',
                  firstUnits: 'mm',
                  secondUnits: 'ns'
              };
              this.range = {
                  title: 'Detector Positions',
                  startLabel: 'Begin',
                  startLabelUnits: 'mm',
                  startValue: '0.5',
                  endLabel: 'End',
                  endLabelUnits: 'mm',
                  endValue: '9.5',
                  numberLabel: 'Number',
                  numberValue: '19'
              };
              this.opticalProperties = {
                  mua: '0.01',
                  mus: '1',
                  g: '0.8',
                  n: '1.4'
              };
              this.modelAnalysis = { value: 'R' };
          },
          onSubmit: function () {
              var fsSettings = {
                  forwardSolverEngine: this.forwardSolverEngine.value,
                  solutionDomain: this.solutionDomain.value,
                  independentAxes: this.independentAxes,
                  range: this.range,
                  opticalProperties: this.opticalProperties,
                  modelAnalysis: this.modelAnalysis.value
              };
              console.log(fsSettings);
              console.log(JSON.stringify(fsSettings));
              $.ajax({
                  type: "POST",
                  contentType: "application/json",
                  url: app.url + "?action=getdata",
                  data: JSON.stringify(fsSettings),
                  dataType: "json",
                  success: function (data) {
                      var isPlotted = false;
                      if (app.currentPlotObject) {
                          $.each(app.currentPlotObject, function (key, plotObject) {
                              if (plotObject.id === data.id) {
                                  //for complex plots there will be multiple plots
                                  $.each(data.plotlist, function(i, plot) {
                                      app.currentPlotObject[key].plotlist.push(plot);
                                  });
                                  generatePlot(app.currentPlotObject[key].id, app.currentPlotObject[key]);
                                  $('#plot-tabs li').removeClass('active');
                                  $('#plot-column .tab-pane').removeClass('active');
                                  $('#pane-' + app.currentPlotObject[key].id).addClass('active');
                                  $('#tab-' + app.currentPlotObject[key].id).addClass('active');
                                  isPlotted = true;
                              }
                          });
                      }
                      if (!isPlotted) {
                          var plotObject = data;
                          createTabAndPane(plotObject.id, plotObject);
                          generatePlot(plotObject.id, plotObject);
                          app.currentPlotObject.push(plotObject);
                      }
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                      alert(xhr.status + ", " + ajaxOptions + ", " + thrownError);
                  }
              });
          }
      });
})(window.app || (window.app = {}));
