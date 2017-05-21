(function (app) {
    app.VtsInverseSolverComponent =
      ng.core.Component({
          selector: "vts-inverse-solver",
          templateUrl: "Template/vts-inverse-solver.html"
      })
      .Class({
          constructor: function () {
          },
          onClick: function() {
              console.log("Clicked");
          },
          onSubmit: function () {
              console.log("Submitted");
              $.ajax({
                  type: "POST",
                  contentType: "application/json",
                  url: app.url + "?action=getfile",
                  dataType: "json",
                  success: function (data) {
                      console.log(data);
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                      alert(xhr.status + ", " + ajaxOptions + ", " + thrownError);
                  }
              });
          }
      });
})(window.app || (window.app = {}));
