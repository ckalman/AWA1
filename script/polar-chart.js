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
            label: 'images',
            type: 'folder',
            value: 32,
            tree: [
                new data({
                    label: 'wallpaper-new-york.png',
                    type: 'image',
                    value: 8,
                    tree: []
                }),
                new data({
                    label: 'cat.jpg',
                    type: 'image',
                    value: 8,
                    tree: []
                }),
                new data({
                    label: 'dog.jpg',
                    type: 'image',
                    value: 7,
                    tree: []
                }),
                new data({
                    label: 'tree.jpg',
                    type: 'image',
                    value: 5,
                    tree: []
                }),
                new data({
                    label: 'icons.png',
                    type: 'image',
                    value: 3,
                    tree: []
                }),
            ]
        }),
        new data({
            label: 'Travail',
            type: 'folder',
            value: 35,
            tree: [
                new data({
                    label: 'AWA1',
                    type: 'document',
                    value: 35,
                    tree: [
                        new data({
                            label: 'index.html',
                            type: 'file',
                            value: 2,
                            tree: []
                        }),
                        new data({
                            label: 'lib.js',
                            type: 'file',
                            value: 5,
                            tree: []
                        }),
                        new data({
                            label: 'images',
                            type: 'folder',
                            value: 10,
                            tree: [
                                new data({
                                    label: 'images_1',
                                    type: 'image',
                                    value: 5,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_2',
                                    type: 'image',
                                    value: 2,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_3',
                                    type: 'image',
                                    value: 2,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_4',
                                    type: 'image',
                                    value: 1,
                                    tree: []
                                }),
                            ]
                        }),
                    ]
                }),
                new data({
                    label: 'RIA2',
                    type: 'document',
                    value: 5,
                    tree: [
                        new data({
                            label: 'rendu.zip',
                            type: 'file',
                            value: 15,
                            tree: []
                        })
                    ]
                }),
            ]
        }),
        new data({
            label: 'rapport.docx',
            type: 'document',
            value: 5,
            tree: []
        }),
        new data({
            label: 'présentation.docx',
            type: 'document',
            value: 8,
            tree: []
        }),
        new data({
            label: 'présentation.avi',
            type: 'movie',
            value: 6,
            tree: []
        }),
        new data({
            label: 'texte-brut.txt',
            type: 'file',
            value: 2,
            tree: []
        }),
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
        onClick: function (event, element) {
            let navigationSize = navigation.length - 1;
            if (event.ctrlKey) {
                if (element[0] && element[0]._model) {
                    var label = element[0]._model.label;
                    var current = navigation[navigationSize];
                    var child = current.getChildByLabel(label);

                    var test = `
                                <h3>Description du fichier</h3>
                                <p>Nom : ${child.data.label}</p>
                                <p>Taille : ${child.data.value}</p>
                           `;

                    $("#modal-content-data").html(test);
                    $("#modal-trigger").animatedModal({ color: child.data.backgroundColor, animatedIn: 'bounceIn', animationDuration: 3 });
                    $("#modal-trigger").click();
                    console.log("Selected child : ", child);
                }
            } else {
                if (element[0] && element[0]._model) {
                    var label = element[0]._model.label;
                    var current = navigation[navigationSize];
                    var child = current.getChildByLabel(label);
                    if (child && child.asTree()) {
                        // Set navigation pointer to the child.
                        navigation.push(child);
                        var dataSet = child.formatTreeDataSet();
                        setChartData(dataSet);
                    }
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

function setLoading(value){
    loading = value;
}

function randomizeLoading() {
    addRandomData();
    setInterval(function () {
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

function reset(){
    loading = false;
    navigation = [];
    navigation.push(source);
    setChartData(source.formatTreeDataSet());
}

document.getElementById('reset').addEventListener('click', function () {
    reset();
});

document.getElementById('chart-return').addEventListener('click', function () {
    if (navigation.length > 1) {
        // remove child
        navigation.pop();
        var parent = navigation[navigation.length - 1];
        setChartData(parent.formatTreeDataSet());
    }
});

document.getElementById('lol').addEventListener('click', function () {
    console.log("test");
});