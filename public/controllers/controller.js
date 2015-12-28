var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl',['$scope','$http', function($scope,$http){

var data = {key:'62bb1d3b8dc043de174b14aec2b89f90', secret:'d488864ac9ab63ca6fc6a7128292386465a5a3d04436c73f'};
var token;

$http.post('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com', data).success(function(response){
	response = response;
	token = response.token;

		//get and refresh the page
		var refresh = function(){
		$http.get('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts', {
			headers: {
			'Authorization': 'Bearer ' + token
			}
	    }).success(function(response){
			$scope.contactlist = response;
			$scope.contact="";
			});

		};

		refresh();
  
		//Add a contact
		$scope.addContact = function(){

			$http.post('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts', 
				$scope.contact, {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).success(function(response){
				
				refresh();
			
			});
		
		};
		
		//Delete Contact
		$scope.removeContact = function(id){
		
			$http.delete('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts/' + id, {
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}).success(function(response){
				refresh();
			});
		
		};

		//Edit Contact
		$scope.editContact = function(id){
		
			$http.get('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts/' + id, {
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}).success(function(response){
				$scope.contact = response;
			});

		};
		
		//Update Contact
		$scope.updateContact = function(){
			$http.put('http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts/' + 
				$scope.contact.id, $scope.contact, {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).success(function(response){
				refresh();
			});

		};

	}); 

}]);
