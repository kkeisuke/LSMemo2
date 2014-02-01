var LSMemo2;
(function (LSMemo2) {
    var AppCtrl = (function () {
        function AppCtrl($scope) {
            this.$scope = $scope;
            this.$scope.appVM = this;
            this.init();
        }
        AppCtrl.prototype.init = function () {
            this.setEvent();
        };

        AppCtrl.prototype.setEvent = function () {
            var _this = this;
            this.$scope.$on('click_add', function (e) {
                _this.$scope.$broadcast('add_memo');
            });
            this.$scope.$on('click_save', function (e) {
                _this.$scope.$broadcast('save_memo');
            });
            this.$scope.$on('click_delete', function (e) {
                _this.$scope.$broadcast('delete_memo');
            });
        };

        AppCtrl.prototype.close = function () {
            window.close();
        };
        AppCtrl.$inject = [
            '$scope'
        ];
        return AppCtrl;
    })();
    LSMemo2.AppCtrl = AppCtrl;
})(LSMemo2 || (LSMemo2 = {}));
