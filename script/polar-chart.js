(function () {
    var chart = null;
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
    };
    // http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
    // TODO : remove 
    var chartColors = window.chartColors;
    var color = Chart.helpers.color;
    // TODO : remove 

    var navigation = [];
    var loading = true;

    // Source data
    var source = new data({
        value: 100,
        id: 0,
        label: 'Main',
        type: 'folder',
        tree: [
            new data({
                value: 55,
                id: 0,
                label: 'Capistrano',
                tree: [
                    new data({
                        value: 75,
                        id: 0,
                        label: 'Test 01010',
                        type: 'folder',
                        tree: [
                            new data({
                                value: 80,
                                id: 0,
                                label: 'Loooolll',
                                type: 'folder'
                            }),
                            new data({
                                value: 35,
                                id: 0,
                                label: 'dsadasdasdsa das',
                                type: 'image'
                            })
                        ]
                    }),
                    new data({
                        value: 80,
                        id: 0,
                        label: 'Loooolll',
                        type: 'image'
                    }),
                    new data({
                        value: 35,
                        id: 0,
                        label: 'dsadasdasdsa das',
                        type: 'image'
                    })
                ],
                type: 'folder'
            }),
            new data({
                value: 25,
                id: 0,
                label: 'BGG',
                type: 'movie'
            }),
            new data({
                value: 35,
                id: 0,
                label: 'Saitama.png',
                type: 'image'
            })
        ]
    });

    // Push parent for history navigation
    navigation.push(source);
    var firstData = source.formatTreeDataSet();



    var config = {
        data: {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: 'My dataset' // for legend
            }],
            labels: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'File explorer'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                reverse: false,
                width: 512,
                height: 512
            },
            animation: {
                animateRotate: false,
                animateScale: true
            },
            onClick: function (evnet, element) {
                let navigationSize = navigation.length - 1;
                if (element[0] && element[0]._model) {
                    var label = element[0]._model.label;
                    var current = navigation[navigationSize];
                    var child = current.getChildByLabel(label);
                    if (child && child.asTree()) {
                        // Set navigation pointer to the child.
                        navigation.push(child);
                        console.log("new data : ", child.formatTreeDataSet());
                        var dataSet = child.formatTreeDataSet();
                        setChartData(dataSet);
                    }
                }
            }
        }
    };



    function setChartData(formatTreeDataSet) {
        if (config.data.datasets.length > 0) {
            config.data.labels = formatTreeDataSet.labels;
            config.data.datasets.forEach(function (dataset) {
                dataset.backgroundColor = formatTreeDataSet.backgroundColor;
                dataset.data = formatTreeDataSet.data;
            });
            chart.update();
        }
    }
    window.onload = function () {
        var ctx = document.getElementById("chart-area");
        chart = Chart.PolarArea(ctx, config);
        randomizeLoading();
    };
    var colorNames = Object.keys(window.chartColors);

    function randomizeLoading(){
        addRandomData();
        setInterval(function(){ 
            randomize() 
        }, 620);
    }

    function randomize() {
        if (loading && config.data.datasets.length > 0) {
            config.data.datasets.forEach(function (piece, i) {
                piece.data.forEach(function (value, j) {
                    config.data.datasets[i].data[j] = randomScalingFactor();
                });
            });
            chart.update();
        }
    }

    function addRandomData() {
        var colorNames = Object.keys(window.chartColors);
        if (config.data.datasets.length > 0) {
            for (var i = 0; i < 25; i++) {
                config.data.labels.push('Loading please wait');
                config.data.datasets.forEach(function (dataset) {
                    var colorName = colorNames[config.data.labels.length % colorNames.length];
                    dataset.backgroundColor.push(window.chartColors[colorName]);
                    dataset.data.push(randomScalingFactor());
                });
            }
            chart.update();
        }
    }


    document.getElementById('reset').addEventListener('click', function () {
        loading = false;
        navigation = [];
        navigation.push(source);
        setChartData(source.formatTreeDataSet());
    });

    document.getElementById('chart-return').addEventListener('click', function () {
        if (navigation.length > 1) {
            // remove child
            navigation.pop();
            var parent = navigation[navigation.length - 1];
            setChartData(parent.formatTreeDataSet());
        }
    });
})();