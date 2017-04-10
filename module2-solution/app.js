(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

//Injecting the Service to the controllers
ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuyController = this;
  // List of to buy items
  toBuyController.toBuyItems = ShoppingListCheckOffService.GetItemsToBuy();
  toBuyController.buyThisItem = function (itemIndex) {
    ShoppingListCheckOffService.buyThisItem(itemIndex);
  };
};

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtController = this;
  // List of bought items
  alreadyBoughtController.boughtItems = ShoppingListCheckOffService.GetBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
    // List of to buy items
  var toBuyItems =[
    {name : "Cookies", quantity: "10 bags"},
    {name : "Chips", quantity: "15 bags"},
    {name : "Bismo Peptol", quantity: "5 bags"}
  ];
    // List of bought items
  var boughtItems = [];
  service.GetItemsToBuy = function() {
      return toBuyItems;
    };

  service.GetBoughtItems = function() {
      return boughtItems;
    };

service.buyThisItem = function(itemIndex){
  var item = toBuyItems[itemIndex];
  boughtItems.push(item);
  toBuyItems.splice(itemIndex, 1);
};

}


})();
