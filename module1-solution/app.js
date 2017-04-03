(function(){
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.inject = ['$scope'];
function LunchCheckController($scope){
  $scope.itemsForCommaSep = "";
$scope.arrayAfterSplit=[];

  $scope.checkTooMuch = function(){
    if($scope.itemsForCommaSep != ""){
      $scope.arrayAfterSplit=$scope.itemsForCommaSep.split(',');
        if($scope.arrayAfterSplit.length <= 3){
          $scope.MessageFromJo=  "Enjoy!";
        }else if($scope.arrayAfterSplit.length > 3){
          $scope.MessageFromJo=  "Too much!";
        }
    }
    else{

      $scope.MessageFromJo=  "Please enter data first";
    }

};
};


})();
