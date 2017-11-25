var app = angular.module('myApp', []);
app.controller('defaultCtrl', function($scope) {
    var obj = [];
    $scope.hidePrimary = false;
    $scope.tree = JSON.parse(localStorage.getItem('notes'));
    $scope.delete = function(data, index) {
        removeItemFn($scope.tree, data.name);
        localStorage.setItem('notes', JSON.stringify($scope.tree));
    };
    $scope.add = function(msg) {
        var post = $scope.subData.nodes.length + 1;
        var newName = $scope.subData.name + '.' + post;
        $scope.subData.nodes.push({name: newName,msg:msg,nodes: []});
        localStorage.setItem('notes', JSON.stringify($scope.tree));
        $scope.hidePrimary = false;
        $scope.subMsg = null;
    };
    $scope.addSubNotes = function(data) {
        $scope.hidePrimary = true;
        $scope.subData = data;
    };
    $scope.addNew = function(msg) {
        var oldValues = JSON.parse(localStorage.getItem('notes'));
        var currentCount = oldValues ? Object.keys(oldValues).length + 1 : 1;
        var data = {name: "Level " + currentCount, msg:msg, nodes: []};

        if(oldValues){
            oldValues.push(data);
            localStorage.setItem('notes', JSON.stringify(oldValues));
            $scope.tree = oldValues;
        }else{
            obj.push(data);
            localStorage.setItem('notes', JSON.stringify(obj));
            $scope.tree = obj;
        } 
        $scope.msg = null;
    };

    function removeItemFn(array, key) {
        _.each(array, function (item, index) {
            if (item.name === key) {
                array.splice(index, 1);
            } else if (item.nodes && item.nodes.length > 0) {
                removeItemFn(item.nodes, key);
            }
        })
    }
});