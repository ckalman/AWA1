

var data = function (data) {
    this.data = {};
    this.data.value = data.value || 0;
    this.data.backgroundColor = typeColor(data.type);
    this.data.tree = data.tree || [];
    this.data.id = data.id || 0;
    this.data.label = data.label || 'NO NAME';

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
        }
        return color;
    }

    function asTree(){
        return this.data.tree.length > 0;
    }

    function getChildByLabel(label){
        var child = null;
        this.data.tree.forEach(function(d){
            if(d.data.label == label){
                child = d;
            }
        });
        return child;
    }

    function formatTreeDataSet(){
        var data = [];
        var backgroundColor = [];
        var labels = [];
        this.data.tree.forEach(function(d){
            data.push(d.data.value);
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

