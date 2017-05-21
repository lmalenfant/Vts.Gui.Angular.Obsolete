using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Web;

namespace Vts.Web.Data
{
    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }

        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }
    }

    public class ComplexPoint
    {
        public double X { get; set; }
        public Complex Y { get; set; }

        public ComplexPoint(double x, Complex y)
        {
            X = x;
            Y = y;
        }
    }

    public class Plots
    {
        public string id { get; set; }
        public string detector { get; set; }
        public string xaxis { get; set; }
        public string yaxis { get; set; }
        public string legend { get; set; }
        public List<PlotDataJson> plotlist { get; set; }
    }

    public class PlotData
    {
        public string Label { get; set; }
        public IEnumerable<Point> Data { get; set; }
    }

    public class PlotDataJson
    {
        public string label { get; set; }
        public List<List<double>> data { get; set; }
    }

}