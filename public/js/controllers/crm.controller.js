(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope'];

    function CRMController($scope) {
        //////////// scope functions //////////
        $scope.userCompleted = userCompleted;
        $scope.cancelButton = cancelButton;
        $scope.updateUser = updateUser;
        $scope.createNewUser = createNewUser;
        $scope.editUser = editUser;
        $scope.removeUser = removeUser;

        //////////// scope vars ////////////
        $scope.newUser = {};
        $scope.users = [];
        $scope.editing = false;
        $scope.studiesOptions = ['Primaria', 'Secundaria', 'Bachillerato', 'Ciclo o  Grado'];

        activate();

        ////////////////////////

        function activate() {
            loadLocalStorage();
        }

        function userCompleted() {
            return $scope.newUser.name && $scope.newUser.photo &&
                $scope.newUser.email && $scope.newUser.phone;
        }

        function cleanNewUser() {
            $scope.newUser = {};
            $scope.editForm.$setUntouched();
            $scope.editForm.$setPristine();
        }

        function cancelButton() {
            if ($scope.editing) $scope.editing = false;
            cleanNewUser();
        }

        function createNewUser() {
            if (userCompleted()) {
                $scope.newUser.id = randId();
                $scope.users.push($scope.newUser);
                cleanNewUser();
                updateLocalStorage();
            }
        }

        function editUser(user) {
            $scope.newUser = angular.copy(user);
            $scope.editing = true;
        }

        function updateUser(user) {
            $scope.users.forEach(function (userToEdit, idx) {
                if (user.id == userToEdit.id) {
                    $scope.users[idx] = user;
                }
            });
            $scope.editing = false;
            cleanNewUser();
        }

        function removeUser(user) {
            var confirmation = prompt(`Seguro que deseas borrar al usuario ? Introduce ${user.name} para confirmar`);
            if (confirmation == user.name) {
                $scope.users = $scope.users.filter(u => u.id != user.id);
                updateLocalStorage();
            }
        }

        //////// Storage /////
        function loadLocalStorage() {
            if ('customers' in localStorage) {
                $scope.users = JSON.parse(localStorage.getItem('customers'));
            }
        }

        function updateLocalStorage() {
            localStorage.setItem('customers', JSON.stringify($scope.users));
        }
        ///////// end Storage ////////

        ///////// auxiliars  /////////
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
    }
})();