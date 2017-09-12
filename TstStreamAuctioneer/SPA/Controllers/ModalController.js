app.controller('ModalController', function ($scope, $uibModalInstance, data) {
    
    if (data == null) {
        console.log('data is null!');
    } else {
        console.log('data NOT null!');
        console.log(data);
        this.dataObject = data;
        $scope.dataObject = data;
    }
});