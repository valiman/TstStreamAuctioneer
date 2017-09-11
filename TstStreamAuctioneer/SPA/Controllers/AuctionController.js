app.controller('AuctionController', function ($scope) {
    $scope.userName = "valle";

    //Data
    $scope.auctionList = [];
    var auctionListStorage = [];

    var fillAuctList = function () {
        for (var i = 0; i < 30; i++) {
            var rndN = Math.floor((Math.random() * 10) + 1);
            var obj = {
                userRating: ((rndN * i) / 2),
                userName: 'user' + i,
                avgViewers: rndN * i,
                price: (31 + rndN * i),
                highestBid: (3 + rndN * i)
            };

            auctionListStorage.push(obj);
        }


        $scope.auctionList = auctionListStorage.slice(0, 10); //first page..
    };
    fillAuctList();
    //End

    //Pagination
    //- fake data: pull $from - $to (page)
    //- real data: request $from - $to (page)

    $scope.currentPage = 1;

    $scope.setPage = function () {
        var pageNo = $scope.currentPage;

        $scope.auctionList = []; //clear;
        $scope.auctionList = auctionListStorage.slice((pageNo * 1), ((pageNo * 1) + 10));
    };
    //End
});