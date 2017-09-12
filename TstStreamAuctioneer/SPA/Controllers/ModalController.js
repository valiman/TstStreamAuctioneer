app.controller('ModalController', function ($scope, $uibModalInstance, data) {
    if (data == null) {
        console.log('data is null!');
    } else {
        this.dataObject = data;
        $scope.dataObject = data;
    }

    $scope.ok = function () {
        //do the buy-backend!
        $uibModalInstance.close($scope.dataObject);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});