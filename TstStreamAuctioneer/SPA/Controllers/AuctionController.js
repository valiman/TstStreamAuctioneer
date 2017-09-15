app.controller('AuctionController', function ($scope, $uibModal) {
    //Global var, for ctrl
    var rndN = Math.floor((Math.random() * 10) + 1);

    this.create = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/SPA/Views/Modal/CreateAuction.html',
            controller: 'ModalController',
            resolve: {
                data: $scope.user
            }
        });

        modalInstance.result.then(function (data) {
            createNewAuction(data);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    this.bid = function (dataObj) {
        dataObj.typeName = "Bid"; //assign type
        bidBuyHandler(dataObj);
    }

    this.buyout = function (dataObj) {
        dataObj.typeName = "Buyout"; //assign type
        bidBuyHandler(dataObj);
    }

    var createNewAuction = function (data) {
        var i = $scope.auctionList.length;
        var newAuction = {
            id: i,
            userRating: ((rndN * i) / 2),
            userName: data.user.userName,
            avgViewers: rndN * i,
            price: data.startBid,
            highestBid: data.buyoutValue
        }
        $scope.auctionListStorage.push(newAuction);
        console.log('Created new auction!');
    }

    var checkTypeName = function (data) {
        if (data.typeName == 'Buyout') {
            buyAuction({ userName: 'KniX' }, data);
        } else if (data.typeName == 'Bid') {
            bidAuction({ userName: 'KniX' }, data);
        } else {
            console.log('AuctionController: Unknown error in function "check type"');
        }
    }

    var bidBuyHandler = function (dataObj) {
        if (dataObj != null) {
            console.log(dataObj.userName);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/SPA/Views/Modal/ViewAuction.html',
                controller: 'ModalController',
                size: 'sm',
                resolve: {
                    data: dataObj
                }
            });

            modalInstance.result.then(function (data) {
                checkTypeName(data);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        } else {
            console.log('No data were sent to buyout function!');
        }
    }

    var buyAuction = function (user, auction) {
        //This part will be dynamic with signalR.. it has to be auto-updating for everyone viewing the table.
        console.log('User ' + user.userName + ' initiated in buying auctionID: ' + auction.id);

        $scope.auctionList = $scope.auctionList.filter(function (o) {
            return o.id != auction.id;
        });
    };

    var bidAuction = function (user, auction) {
        //This part will be dynamic with signalR.. it has to be auto-updating for everyone viewing the table.
        console.log('User ' + user.userName + ' initiated in bidding auctionID: ' + auction.id);

        $scope.auctionList[auction.id + 1].highestBid = 10000;
    };

    //Fill auction list with random data. slice into smaller array of 10 rows.
    $scope.auctionList = [];
    $scope.auctionListStorage = [];

    var fillAuctList = function () {
        for (var i = 0; i < 30; i++) {
            var obj = {
                id: i,
                userRating: ((rndN * i) / 2),
                userName: 'user' + i,
                avgViewers: rndN * i,
                price: (31 + rndN * i),
                highestBid: (3 + rndN * i)
            };
            $scope.auctionListStorage.push(obj);
        };
        $scope.auctionList = $scope.auctionListStorage.slice(0, 10); //first page..
    };
    fillAuctList();
    //End

    //Pagination
    //- fake data: pull $from - $to (page)
    //- real data: request $from - $to (page)

    $scope.currentPage = 1;

    $scope.setPage = function () {
        var pageNo = $scope.currentPage;
        console.log((pageNo - 1) * 10);
        console.log(pageNo * 10);

        $scope.auctionList = []; //clear;
        $scope.auctionList = $scope.auctionListStorage.slice(((pageNo - 1) * 10), (pageNo * 10));
    };
    //End

    //Auction Table Row Events
    $scope.tableRowSelectedData = {};
    
    $(document).ready(function ($scope) {
        var auctionTable = $('#auctionTable').DataTable({
            paging: false,
            info: false
        });
        $('#auctionTable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                auctionTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#button').click(function () {
            auctionTable.row('.selected').remove().draw(false);
        });
    });
});