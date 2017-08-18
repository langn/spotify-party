(function() {
    angular.module('SpotifyParty')
        .controller('AdminListController', AdminListController);

    function AdminListController() {
        const model = this;

        model.pageTitle = 'Admin User List';
        function init() {

        }
        init();
    }
})();