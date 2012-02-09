function example () {

  // Configuraiton
  var
    H = humblevis,
    D = financeData,
    jsonData = D.summaryTicks,

    container = document.getElementById('demo'),

    priceOptions = {
      name    : 'price',
      data    : D.price,
      flotr   : {
        'lite-lines' : {
          lineWidth : 1,
          show : true,
          fill : true,
          fillOpacity : .2
        },
        mouse : {
          track: true,
          trackY: false,
          trackAll: true,
          sensibility: 1,
          trackDecimals: 4,
          trackFormatter: function (o) {
            var data = jsonData[o.nearest.x];
            return data.date + " Price: " + data.close + " Vol: " + data.volume;
          },
          position: 'ne'
        },
        yaxis : { 
          noTicks : 3,
          showLabels : true,
          min : 0,
          tickFormatter : function (n) {
            return (n == this.max ? false : '$'+n);
          }
        }
      }
    },

    volumeOptions = {
      name    : 'volume',
      data    : D.volume,
      flotr   : {
        whiskers : {
          show : true 
        },
        mouse: {
          track: true,
          trackY: false,
          trackAll: true,
          position: 'ne',
          trackDecimals: 0
        }
      }
    },

    summaryOptions = {
      name    : 'summary',
      data    : D.price,
      flotr   : {
        'lite-lines' : {
          show : true,
          lineWidth : 1,
          fill : true,
          fillOpacity : .2,
          fillBorder : true
        },
        xaxis : {
          noTicks: 5,
          showLabels : true,
          tickFormatter : function (n) {
            return jsonData[n].date.split(' ')[2];
            return (parseInt(n) === 0 ? false : jsonData[n].date.split(' ')[2]);
          }
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : .1
        },
        handles   : { show : true },
        selection : { mode : 'x'},
        grid : {
          verticalLines : false
        }
      }
    },

    connectionOptions = {
      name : 'connection',
      drawing : humblevis.QuadraticDrawing
    },

    vis, price, volume, summary, selection, hit, connection;


  // Application

  vis = new H.Visualization();
  price = new H.Child(priceOptions);
  volume = new H.Child(volumeOptions);
  connection = new H.Child(connectionOptions);
  summary = new H.Child(summaryOptions);
  selection = new H.Interaction({leader : summary});
  hit = new H.Interaction();

  vis
    .add(price)
    .add(volume)
    .add(connection)
    .add(summary)
    .render(container);

  selection
    .follower(price)
    .follower(volume)
    .follower(connection)
    .add(H.action.selection);

  summary.api.flotr.selection.setSelection({ y1 : 0, y2 : 0, x1 : 50, x2 : 150});

  hit
    .group([price, volume])
    .add(H.action.hit);
}

