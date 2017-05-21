<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Vts.Gui.Angular.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>VP - Virtual Tissue Simulator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- 1. Load libraries -->
    <!-- IE required polyfill -->
    <script src="node_modules/core-js/client/shim.min.js"></script>

    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>

    <script src="node_modules/rxjs/bundles/Rx.js"></script>
    <script src="node_modules/@angular/core/bundles/core.umd.js"></script>
    <script src="node_modules/@angular/common/bundles/common.umd.js"></script>
    <script src="node_modules/@angular/compiler/bundles/compiler.umd.js"></script>
    <script src="node_modules/@angular/forms/bundles/forms.umd.js"></script>
    <script src="node_modules/@angular/platform-browser/bundles/platform-browser.umd.js"></script>
    <script src="node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js"></script>
    
    <link href="Content/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="Styles/vts.css?version=1.0" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="Scripts/jquery-2.1.1.js"></script>
    <script type="text/javascript" src="flot/jquery.js"></script>
    <script type="text/javascript" src="flot/jquery.flot.js"></script>
    <script type="text/javascript" src="flot/jquery.flot.resize.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap.js"></script>
    <script type="text/javascript" src="app/plot.js"></script>

    <!-- 2. Load our 'modules' -->
    <script src='app/model.js'></script>
    <script src='app/app.component.js?version=1.1'></script>
    <script src='app/vts-forward-solver-analysis.component.js?version=1.4'></script>
    <script src='app/vts-inverse-solver.component.js?version=1.4'></script>
    <script src='app/vts-range.component.js?version=1.1'></script>
    <script src='app/vts-optical-properties.component.js?version=1.1'></script>
    <script src='app/vts-model-analysis-type.component.js?version=1.1'></script>
    <script src='app/vts-solution-domain.component.js?version=1.2'></script>
    <script src='app/vts-forward-solver-engine.component.js?version=1.1'></script>
    <script src='app/app.module.js?version=1.1'></script>
    <script src='app/main.js?version=1.1'></script>

  </head>

  <!-- 3. Display the application -->
  <body>
    <vts-application>Loading...</vts-application>
  </body>
</html>
