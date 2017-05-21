var plot;
var colorArray = [];

function selectCheckboxes(value) {
    var choiceContainer = $("#choices");
    choiceContainer.find("input").each(function () {
        $(this).attr('checked', value);
    });
}

function closeTab(id) {
    if (app.currentPlotObject) {
        $.each(app.currentPlotObject, function(key, plotObject) {
            if (plotObject.id === id) {
                app.currentPlotObject.splice(key, 1);
                return false;
            }
            return true;
        });
    }
    $('#pane-' + id).remove();
    $('#tab-' + id).remove();
}

function deletePlot(id, key) {
    if (app.currentPlotObject) {
        console.log(id);
        console.log(key);
        $.each(app.currentPlotObject, function (i, plotObject) {
            if (plotObject.id === id) {
                console.log(plotObject);
                plotObject.plotlist.splice(key, 1); //remove the plot
                colorArray.splice(key, 1); //delete the color from the color array so the colors remain aligned with the plots
                generatePlot(id, plotObject);
                return false;
            }
            return true;
        });
    }
}

function createTabAndPane(id, plotObject) {
    if ($('#placeholder-' + id).length) {
        $('#pane-' + id).remove();
    } else {
        $('#plot-tabs li').removeClass('active');
        $('#plot-tabs').append('<li id="tab-' + id + '" class="active"><a role="tab" data-toggle="tab" href="#pane-' + id + '">' +
            plotObject.detector + '&nbsp;&nbsp;<i class="glyphicon glyphicon-remove" onclick="closeTab(\'' + id + '\');"></i></a></li>');
    }
    $('#plot-content').append('<div id="pane-' + id +
        '" class="tab-pane"><div class="plot-container col-xs-12 col-sm-12 col-md-10"><div id="placeholder-' + id +
        '" class="plot-placeholder"></div></div><div id="choices-' + id +
        '" class="plot-choices col-xs-12 col-sm-12 col-md-2"></div><div id="spacing-' + id +
        '" class="col-xs-12 col-sm-12 col-md-12">X-Axis: <input checked="true" id="xAxisLinear-' + id + '" type="radio" name="xAxis-' + id +
        '" value="0" /><label for="xAxisLinear' + id + '">&nbsp;Linear&nbsp;</label>' +
        '<input id="xAxisLog-' + id + '" type="radio" name="xAxis-' + id +
        '" value="1" /><label for="xAxisLog-' + id + '">&nbsp;Log10</label><br/>' +
        'Y-Axis: <input checked="true" id="yAxisLinear-' + id + '" type="radio" name="yAxis-' + id +
        '" value="0" /><label for="yAxisLinear' + id + '">&nbsp;Linear&nbsp;</label>' +
        '<input id="yAxisLog-' + id + '" type="radio" name="yAxis-' + id +
        '" value="1" /><label for="yAxisLog-' + id + '">&nbsp;Log10</label>' +
        '</div></div>');
    $("#spacing-" + id + " input").bind('click', function() {
        plotAccordingToChoices(id, plotObject);
    });
    $('#plot-column .tab-pane').removeClass('active');
    $('#pane-' + id).addClass('active');
}

function generatePlot(id, plotObject) {
    var datasets = plotObject.plotlist;
    var i = 0;
    $.each(datasets, function (key, val) {
        if (typeof colorArray[key] !== "undefined") {
            val.color = colorArray[key]; //if a value exists pull it from the color array
        } else {
            if (colorArray.length > 0) {
                i = colorArray[colorArray.length - 1] + 1;
            }
            val.color = i;
            colorArray.push(i); //create a color array so colors remain with plots when deleting plots
        }
        ++i;
    });

    var placeholder = $("#placeholder-" + id);
    placeholder.html("");
    // insert checkboxes 
    var choiceContainer = $("#choices-" + id);
    choiceContainer.html("");
    choiceContainer.prepend('<p>' + plotObject.legend + '</p><table>');
    $.each(datasets, function (key, val) {
        choiceContainer.append("<tr><td style='padding-right: 5px; vertical-align: top;'>" +
            "<div style='padding: 1px; border: 1px solid lightgrey; border-image: none;'><div id='color-" +
            key + "' style='border-image: none; width: 10px; height: 10px; overflow: hidden;'></div></div></td>" +
            "<td style='padding-right: 5px; vertical-align: top;'><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input></td><td style='padding-right: 5px; vertical-align: top;'>" +
            "<label for='id" + key + "'>" + val.label + "</label>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-remove\" onclick=\"deletePlot('" + id + "', '" + key + "');\"></i></td></tr>");
    });
    choiceContainer.append('</table>');

    $("#choices-" + id + " input").bind('click', function () {
        plotAccordingToChoices(id, plotObject);
    });

    plotAccordingToChoices(id, plotObject);
    if (i < 2) {
        //hide the checkbox
        $("#choices-" + id + " input").hide();
    }

    //set checkbox colors
    var series = plot.getData();
    choiceContainer.find("input").each(function (key) {
        choiceContainer.find("#color-" + key).css("background-color", series[key].color);
    });

    placeholder.bind("plothover", function (event, pos, item) {
        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
        $("#hoverdata").text(str);

        if (item) {
            var x = item.datapoint[0].toFixed(4),
                y = item.datapoint[1].toFixed(4);

            $("#tooltip").html(plotObject.legend + " = " + item.series.label + " (" + x + ", " + y + ")")
                .css({ top: item.pageY + 5, left: item.pageX + 5 })
                .fadeIn(200);
        } else {
            $("#tooltip").hide();
        }
    });


    placeholder.bind("plotclick", function (event, pos, item) {
        if (item) {
            $("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
            //plot.highlight(item.series, item.datapoint);
        }
    });
}

function plotAccordingToChoices(id, plotObject) {
    var datasets = jQuery.extend(true, {}, plotObject.plotlist); //clone the dataset so we retain original values
    var data = [];

    var placeholder = $("#placeholder-" + id);
    var choiceContainer = $("#choices-" + id);
    var checkCount = choiceContainer.find("input:checked").length;
    choiceContainer.find("input:checked").each(function () {
        if (checkCount < 2) {
            $(this).prop("disabled", true);
        } else {
            $(this).prop("disabled", false);
        }
        var key = $(this).attr("name");
        if (key && datasets[key]) {
            data.push(datasets[key]);
        }
    });

    var xAxisLog = $("#xAxisLog-" + id);
    if (xAxisLog.is(':checked')) {
        //change the x-axis to a log scale
        for (var xi = 0; xi < data.length; xi++) {
            for (var xj = 0; xj < data[xi].data.length; xj++) {
                data[xi].data[xj][0] = Math.log(data[xi].data[xj][0]);
            }
        }
    }
    var yAxisLog = $("#yAxisLog-" + id);
    if (yAxisLog.is(':checked')) {
        //change the y-axis to a log scale
        for (var yi = 0; yi < data.length; yi++) {
            for (var yj = 0; yj < data[yi].data.length; yj++) {
                data[yi].data[yj][1] = Math.log(data[yi].data[yj][1]);
            }
        }
    }

    if (data.length > 0) {
        plot = $.plot(placeholder, data, {
            legend: { show: true },
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });

        //insert plot axis labels
        if ($("#xaxisLabel-" + id).length == 0) {
            $("<div id='xaxisLabel" + id + "' class='axisLabel xaxisLabel'></div>")
                .text(plotObject.xaxis)
                .appendTo($('#placeholder-' + id));
        }
        if ($("#yaxisLabel-" + id).length == 0) {
            $("<div id='yaxisLabel" + id + "' class='axisLabel yaxisLabel'></div>")
                .text(plotObject.yaxis)
                .appendTo($('#placeholder-' + id));
        }
    }
}

$('#plot-tabs li a').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).tab().show();
});
