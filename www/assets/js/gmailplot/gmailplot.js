var storeData;
var plotData = [
  {
    values: [],
    labels: [],
    type: 'pie'
  }
];

function proccess() {
  var data = storeData;
  var thresholdPercent = 0.01;
  var map = {};
  var other = 0;
  plotData[0].labels = [];
  plotData[0].values = [];

  for(x of data) {
    if(map[x] && map[x]>0) {
      map[x]++
    } else {
      map[x] = 1
    }
  }
  for(label in map) {
    var totalX = map[label];
    if(totalX > thresholdPercent*data.length) {
      plotData[0].labels.push(label);
      plotData[0].values.push(totalX);
    } else {
      other += totalX;
    }
  }
  if(other > 0) {
    plotData[0].labels.push('other');
    plotData[0].values.push(other);
  }
}

function updatePlot() {
  proccess();
  Plotly.redraw(plotDiv);
}

function plot(data) {
  storeData = data;
  console.log('elements '+data.length);
  updatePlot();
}

var layout = {
  height: 800,
  width: 1000
};

Plotly.newPlot(plotDiv, plotData, layout);