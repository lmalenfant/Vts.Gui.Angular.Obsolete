(function (app) {
    app.ForwardSolverEngineComponent =
      ng.core.Component({
          selector: "vts-forward-solver-engine",
          templateUrl: "Template/vts-forward-solver-engine.html",
          inputs: [
              'gaussianBeam',
              'forwardSolverEngine'
          ]
      })
      .Class({
          constructor: function() {
              this.forwardSolverEngineList = [
                  { value: 'PointSourceSDA', display: 'Standard Diffusion (Analytic: Isotropic Point Source)' },
                  { value: 'DistributedPointSourceSDA', display: 'Standard Diffusion (Analytic: Distributed Point Source)' },
                  { value: 'DistributedGaussianSourceSDA', display: 'Standard Diffusion (Analytic: Distributed Gaussian Source)' },
                  { value: 'MonteCarlo', display: 'Scaled Monte Carlo - Basic (g=0.8, n=1.4)' },
                  { value: 'Nurbs', display: 'Scaled Monte Carlo - Nurbs (g=0.8, n=1.4)' }
              ];
          },
          onChange: function (value) {
              console.log(this.forwardSolverEngine.value);
              console.log(value);
              this.forwardSolverEngine.value = value;
              switch (this.forwardSolverEngine.value) {
                  case 'DistributedGaussianSourceSDA':
                      this.gaussianBeam.show = true;
                      break;
                  case 'PointSourceSDA':
                  case 'DistributedPointSourceSDA':
                  case 'MonteCarlo':
                  default:
                      this.gaussianBeam.show = false;
              }
          }
      });
})(window.app || (window.app = {}));
