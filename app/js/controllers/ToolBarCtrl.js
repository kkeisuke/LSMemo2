var LSMemo2;
(function (LSMemo2) {
    var ToolBarCtrl = (function () {
        function ToolBarCtrl($scope) {
            this.$scope = $scope;
            this.$scope.toolBarVM = this;
            this.init();
        }
        ToolBarCtrl.prototype.init = function () {
        };

        ToolBarCtrl.prototype.addMemo = function () {
            this.$scope.$emit('click_add');
        };

        ToolBarCtrl.prototype.saveMemo = function () {
            this.$scope.$emit('click_save');
        };

        ToolBarCtrl.prototype.deleteMemo = function () {
            this.$scope.$emit('click_delete');
        };
        ToolBarCtrl.$inject = [
            '$scope'
        ];
        return ToolBarCtrl;
    })();
    LSMemo2.ToolBarCtrl = ToolBarCtrl;
})(LSMemo2 || (LSMemo2 = {}));
