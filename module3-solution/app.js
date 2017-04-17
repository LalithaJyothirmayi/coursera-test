(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController )
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems )

;

function FoundItems() {
  var ddo = {
    templateUrl: 'items.thtml',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}
NarrowItDownController .inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var menu = this;



  //Implementaion for Filtering Items based on searchTerm
  menu.narrowItDown = function () {


    if (menu.searchTerm) {
      var promise = MenuSearchService.narrowItDown(menu.searchTerm);
      promise.then(function (response) {
        menu.found = response;

      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }
  };

  // Implementaion for removing item at given index
  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  }
};


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.narrowItDown = function (searchTerm) {
    searchTerm=searchTerm.toLowerCase();
  return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {

        // process result and only keep items that match
      var items = result.data.menu_items;
      var foundItems = [];
      for (var index = 0; index < items.length; index++) {
        if (items[index].description.toLowerCase().indexOf(searchTerm) >= 0) {
          foundItems.push(items[index]);

        }
      }

      // return processed items
      return foundItems;
    });


  };

};


})();
