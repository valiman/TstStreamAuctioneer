app.controller('ModalController', function ($scope, $uibModalInstance, data) {
    if (data == null) {
        console.log('ModalCtrl: data is null!');
    } else {
        $scope.dataObj = data;
    }

    $scope.okCreate = function () {
        console.log('okCreate btn!');
        console.log($scope.price);
        //do the buy-backend!
        var newAuction = {
            user: data,
            startBid: $scope.startBid,
            buyoutValue: $scope.buyoutValue
        }
        $uibModalInstance.close(newAuction);
    };

    $scope.ok = function () {
        //do the buy-backend!
        $uibModalInstance.close($scope.dataObj);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});