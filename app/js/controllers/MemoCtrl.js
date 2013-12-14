var LSMemo2;
(function (LSMemo2) {
    var MemoCtrl = (function () {
        function MemoCtrl($scope, memoStorage, $timeout, successMsg) {
            this.$scope = $scope;
            this.$scope.memos = [];
            this.$scope.memoVM = this;
            this.$scope.alerts = [];
            this.$scope.activeNo = 0;
            this.memoStorage = memoStorage;
            this.$timeout = $timeout;
            this.successMsg = successMsg;
            this.init();
        }
        MemoCtrl.prototype.init = function () {
            var _this = this;
            this.memoStorage.getSrorageMemos().then(function (memos) {
                _this.$scope.memos = memos;
                _this.resetActiveNo(memos);
            });
            this.setEvent();
        };

        MemoCtrl.prototype.setEvent = function () {
            var _this = this;
            this.$scope.$on('add_memo', function (e) {
                _this.addMemo();
            });
            this.$scope.$on('save_memo', function (e) {
                _this.saveMemos();
            });
            this.$scope.$on('delete_memo', function (e) {
                _this.deleteMemo();
            });

            this.$scope.$on('select_memo', function (e, index, preIndex) {
                _this.setActiveMemo(index);
                _this.setUnActiveMemo(preIndex);
            });
            this.$scope.$on('sort_memo', function (e, start, end) {
                _this.sortMemo(start, end);
            });
            this.$scope.$on('alert_close', function (e, index) {
                _this.closeAlert(index);
            });
        };

        MemoCtrl.prototype.resetActiveNo = function (memos) {
            var _this = this;
            angular.forEach(memos, function (memo, index) {
                if (memo.active) {
                    _this.$scope.activeNo = index;
                }
            });
        };

        MemoCtrl.prototype.setActiveMemo = function (index) {
            angular.forEach(this.$scope.memos, function (memo) {
                memo.active = false;
            });
            this.$scope.memos[Number(index)].active = true;
            this.$scope.activeNo = index;
        };

        MemoCtrl.prototype.setUnActiveMemo = function (index) {
            this.$scope.memos[Number(index)].active = false;
        };

        MemoCtrl.prototype.addMemo = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.memos[_this.$scope.memos.length] = LSMemo2.Memo.getNewMemo();
            }, 0);
        };

        MemoCtrl.prototype.deleteMemo = function () {
            var _this = this;
            if (Number(this.$scope.activeNo) > 0) {
                this.$timeout(function () {
                    _this.$scope.memos.splice(Number(_this.$scope.activeNo), 1);
                    _this.setActiveMemo(Number(_this.$scope.activeNo) - 1);
                }, 0);
            }
        };

        MemoCtrl.prototype.sortMemo = function (start, end) {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.memos.splice(Number(end), 0, _this.$scope.memos.splice(Number(start), 1)[0]);
                _this.resetActiveNo(_this.$scope.memos);
            }, 0);
        };

        MemoCtrl.prototype.saveMemos = function () {
            var _this = this;
            this.memoStorage.setSrorageMemos(this.$scope.memos).then(function () {
                _this.addAlert();
            });
        };

        MemoCtrl.prototype.addAlert = function () {
            this.$scope.alerts[this.$scope.alerts.length] = LSMemo2.Alert.getNewAlert('success', this.successMsg);
        };

        MemoCtrl.prototype.closeAlert = function (index) {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.alerts.splice(Number(index), 1);
            }, 0);
        };
        MemoCtrl.$inject = [
            '$scope',
            'memoStorage',
            '$timeout',
            'successMsg'
        ];
        return MemoCtrl;
    })();
    LSMemo2.MemoCtrl = MemoCtrl;
})(LSMemo2 || (LSMemo2 = {}));
