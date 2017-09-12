app.controller('AuctionController', function ($scope, $uibModal) {

    this.buyout = function (dataObj) {
        if (dataObj != null) {
            console.log(dataObj.userName);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/SPA/Views/Modal/Buyout.html',
                controller: 'ModalController',
                size: 'sm',
                resolve: {
                    data: dataObj
                }
            });
            
            modalInstance.result.then(function (data) {
                buyAuction({ userName: 'KniX' }, data);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                });

        } else {
            alert('Error, check console!');
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

    //Data
    $scope.auctionList = [];
    var auctionListStorage = [];

    var fillAuctList = function () {
        for (var i = 0; i < 30; i++) {
            var rndN = Math.floor((Math.random() * 10) + 1);
            var obj = {
                id: i,
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