angular.module('routePage', []).
config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
      when('/', {templateUrl: 'partials/list.html',controller: DisplayTel}).
      when('/add',{templateUrl:'partials/add.html',controller:addTels}).
      when('/edit/:index',{templateUrl:'partials/edit.html',controller:displaySingle}).
      otherwise({redirectTo: '/'});
   }
]);

function DisplayTel($scope){
   getTels($scope);
    $scope.deleteTel = function(index){
      localStorage.removeItem(localStorage.key(index));
      toIndex();
    }
}
function addTels($scope){
   $scope.addTel = function(){
      var name=$scope.inputName,
          tel=$scope.inputPhone,
          jsonData = {"name":name,"phoneNumber":tel}
      if(name!=""&&tel!=""){
        localStorage.setItem(name,JSON.stringify(jsonData));
        toIndex();
      }
   }
}
function getTels($scope){
  var localSLength=localStorage.length,tels=[];
  if(localSLength > 0){
    for(var i=0;i<localSLength;i++){
      tels.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    $scope.tels=tels;
  }
}
function displaySingle($scope,$routeParams){
  $scope.index=$routeParams.index;
   getTels($scope);
   $scope.editTel = function($index){
      var jsonData = {"name":$scope.tels[$index].name,"phoneNumber":$scope.tels[$index].phoneNumber};
      localStorage.setItem(localStorage.key($index),JSON.stringify(jsonData));
      toIndex();
   }
}
function toIndex(){
  window.location.href=window.location.href.split(window.location.hash)[0];
}