/**
 * Représente un fichier / dossier. 
 * Cette "classe" et utilisée afin de générer une arborescence de fichier. 
 * Lorsque un dossier contient des fichiers / dossiers. 
 * La variable tree contient des données. 
 */
var data = function (data) {
    this.data = {};
    // Taille du fichier en mb
    this.data.size = data.size || 0;

    // Définit la couleur pour le type de fichier (folder, file ...) sous format : rgba(x, y, z, 0.5)
    this.data.backgroundColor = typeColor(data.type);

    // Cette variable(tableau) permet de définir si un dossier contient des sous-dossiers / fichiers. 
    this.data.tree = data.tree || [];
    this.data.id = data.id || 0;
    // Le label et utilisé pour retrouver l'élément qui a déclancher le clique 
    // (Ma logique : je considère le fait qu'il ne peut y'avoir deux fichier avec le même nom au même niveau de l'arborescence (j'utilise le label comme PK))
    this.data.label = data.label || 'NO NAME';

    // Définit la couleurs en fonction du type de fichier.
    function typeColor(type) {
        var colorTools = Chart.helpers.color;
        let color = colorTools(chartColors.grey).alpha(0.5).rgbString();
        if (type == 'folder') {
            color = colorTools(chartColors.orange).alpha(0.5).rgbString();
        } else if (type == 'image') {
            color = colorTools(chartColors.green).alpha(0.5).rgbString();
        } else if (type == 'file') {
            color = colorTools(chartColors.purple).alpha(0.5).rgbString();
        } else if (type == 'movie'){
            color = colorTools(chartColors.red).alpha(0.5).rgbString();
        } else if (type == 'document'){
            color = colorTools(chartColors.blue).alpha(0.5).rgbString();
        }
        return color;
    }

    // Retourne vrais si le dossier contient des sous éléments.
    function asTree(){
        return this.data.tree.length > 0;
    }

    // Permet de récupérer un élément contenu dans le tableau tree
    function getChildByLabel(label){
        var child = null;
        this.data.tree.forEach(function(d){
            if(d.data.label == label){
                child = d;
            }
        });
        return child;
    }

    // Met en format les données de tous les enfants (contenu dans le tableau tree).
    // Ceci afin de permettre leurs affichages dans le graphique.
    function formatTreeDataSet(){
        var data = [];
        var backgroundColor = [];
        var labels = [];
        this.data.tree.forEach(function(d){
            data.push(d.data.size);
            backgroundColor.push(d.data.backgroundColor);
            labels.push(d.data.label);
        });
        return {
            data,
            backgroundColor,
            labels,
            getChildByLabel
        }
    }
    
    return {
        data: this.data,
        formatTreeDataSet,
        getChildByLabel,
        asTree,
    }

}

