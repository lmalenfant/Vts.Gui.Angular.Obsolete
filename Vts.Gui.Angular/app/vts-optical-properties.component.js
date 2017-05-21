(function (app) {
    app.OpticalPropertiesComponent =
      ng.core.Component({
          selector: "vts-optical-properties",
          templateUrl: "Template/vts-optical-properties.html",
          inputs: ["opticalProperties"]
      })
      .Class({
          constructor: function () {
          }
      });
})(window.app || (window.app = {}));
