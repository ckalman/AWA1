var chart = null;
var chartColors = window.chartColors;
var color = Chart.helpers.color;
var navigation = [];
var loading = true;


// Création des données de tests
// Le premier dossier ne sera jamais vu pas le client
// On affiche uniquement les Répertoires / fichiers enfants (Tree) voir -> script/model/data.js
// Fonctionnement normal (après reset):
// 1. setup de la source (état initial)
// 2. setup de la variable navigation (elle contient toujours un element (la source) => définit la racine)
// 3. utilisation de la fonction formatTreeDataSet pour formater les "Répertoires / fichiers enfants" (variable tree).
// 4. utilisation de la fonction setChartData pour mapper les données issues de la fonction formatTreeDataSet
var source = new data({
    size: 100,
    id: 0,
    label: 'Main',
    type: 'folder',
    tree: [
        new data({
            label: 'images',
            type: 'folder',
            size: 32,
            tree: [
                new data({
                    label: 'wallpaper-new-york.png',
                    type: 'image',
                    size: 8,
                    tree: []
                }),
                new data({
                    label: 'cat.jpg',
                    type: 'image',
                    size: 8,
                    tree: []
                }),
                new data({
                    label: 'dog.jpg',
                    type: 'image',
                    size: 7,
                    tree: []
                }),
                new data({
                    label: 'tree.jpg',
                    type: 'image',
                    size: 5,
                    tree: []
                }),
                new data({
                    label: 'icons.png',
                    type: 'image',
                    size: 3,
                    tree: []
                }),
            ]
        }),
        new data({
            label: 'Travail',
            type: 'folder',
            size: 35,
            tree: [
                new data({
                    label: 'AWA1',
                    type: 'document',
                    size: 35,
                    tree: [
                        new data({
                            label: 'index.html',
                            type: 'file',
                            size: 2,
                            tree: []
                        }),
                        new data({
                            label: 'lib.js',
                            type: 'file',
                            size: 5,
                            tree: []
                        }),
                        new data({
                            label: 'images',
                            type: 'folder',
                            size: 10,
                            tree: [
                                new data({
                                    label: 'images_1',
                                    type: 'image',
                                    size: 5,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_2',
                                    type: 'image',
                                    size: 2,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_3',
                                    type: 'image',
                                    size: 2,
                                    tree: []
                                }),
                                new data({
                                    label: 'images_4',
                                    type: 'image',
                                    size: 1,
                                    tree: []
                                }),
                            ]
                        }),
                    ]
                }),
                new data({
                    label: 'RIA2',
                    type: 'document',
                    size: 5,
                    tree: [
                        new data({
                            label: 'rendu.zip',
                            type: 'file',
                            size: 15,
                            tree: []
                        })
                    ]
                }),
            ]
        }),
        new data({
            label: 'rapport.docx',
            type: 'document',
            size: 5,
            tree: []
        }),
        new data({
            label: 'présentation.docx',
            type: 'document',
            size: 8,
            tree: []
        }),
        new data({
            label: 'présentation.avi',
            type: 'movie',
            size: 6,
            tree: []
        }),
        new data({
            label: 'texte-brut.txt',
            type: 'file',
            size: 2,
            tree: []
        }),
    ]
});

// Push parent for history navigation
navigation.push(source);

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
        // Action effectuée lorsque l'utilisateur clique sur un élément
        onClick: function (event, element) {
            // récupére la taile du tableau (Attention le tableau dois toujours contenir un élément !)
            let navigationSize = navigation.length - 1;

            // Si l'utilisateur a la touche ctrl enfoncée au moment du click
            if (event.ctrlKey) {
                // Test si il a bien cliqué sur un élément
                if (element[0] && element[0]._model) {
                    var label = element[0]._model.label;
                    // Récupération du dossier en cours
                    // L'utilisateur vois les Répertoires / fichiers enfants de ce dossier et effectue le click dessus
                    var current = navigation[navigationSize];

                    // recherche l'enfant 'élu'. 
                    var child = current.getChildByLabel(label);

                    // Setup le code html de la modal.
                    var modalData = `
                                <h3>Description du fichier</h3>
                                <p>Nom : ${child.data.label}</p>
                                <p>Taille : ${child.data.size} MB</p>
                           `;

                    $("#modal-content-data").html(modalData);
                    // définit les parametres d'ouverture et de fermetures
                    $("#modal-trigger").animatedModal({ color: child.data.backgroundColor, animatedIn: 'bounceIn', animationDuration: 3 });
                    // Simulation du click 
                    $("#modal-trigger").click();
                }
            } else {
                if (element[0] && element[0]._model) {
                    var label = element[0]._model.label;
                    var current = navigation[navigationSize];
                    var child = current.getChildByLabel(label);

                    // Si l'enfant à des sous-dossiers / fichiers 
                    if (child && child.asTree()) {
                        // Set le pointeur sur l'enfant.
                        navigation.push(child);
                        // affiche tous les dossiers / fichiers que contient l'enfant
                        var dataSet = child.formatTreeDataSet();
                        setChartData(dataSet);
                    }
                }
            }


        }
    }
};

// Génére des nombres aléatoire 0 - 100
function generateRandomNumber() {
    return Math.round(Math.random() * 100);
};

// Set les données sur le chart (formatée à l'aide de la fonction : formatTreeDataSet()).
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

var colorNames = Object.keys(window.chartColors);

function setLoading(value) {
    loading = value;
}

// Cette fonction permet de faire l'animation lors d'un chargement (toutes les 620ms actualise les données avec des données random).
function randomizeLoading() {
    // Génère 25 données alétoire.
    addRandomData();
    setInterval(function () {
        randomize()
    }, 620);
}

// Set un nombre aléatoire pour chaque donées du graphique
function randomize() {
    if (loading && config.data.datasets.length > 0) {
        config.data.datasets.forEach(function (piece, i) {
            piece.data.forEach(function (value, j) {
                config.data.datasets[i].data[j] = generateRandomNumber();
            });
        });
        chart.update();
    }
}

// Génère 25 données alétoire.
function addRandomData() {
    var colorNames = Object.keys(window.chartColors);
    if (config.data.datasets.length > 0) {
        for (var i = 0; i < 25; i++) {
            config.data.labels.push('Loading please wait');
            config.data.datasets.forEach(function (dataset) {
                var colorName = colorNames[config.data.labels.length % colorNames.length];
                dataset.backgroundColor.push(window.chartColors[colorName]);
                dataset.data.push(generateRandomNumber());
            });
        }
        chart.update();
    }
}

// permet de remettre à zero le graph (retourne a la racine)
function reset() {
    loading = false;
    navigation = [];
    navigation.push(source);
    setChartData(source.formatTreeDataSet());
}

function returnChart() {
    // Retourne en arrière uniquement si l'utilisateur et dans un sous répertoire.
    if (navigation.length > 1) {
        // supprime le dernier élément
        navigation.pop();
        
        var parent = navigation[navigation.length - 1];
        setChartData(parent.formatTreeDataSet());
    }
}

// Setup et charge le graph
window.onload = function () {
    var ctx = document.getElementById("chart-area");
    chart = Chart.PolarArea(ctx, config);
    randomizeLoading();
};

document.getElementById('reset').addEventListener('click', function () {
    reset();
});

document.getElementById('chart-return').addEventListener('click', function () {
    returnChart();
});