var LSMemo2;
(function (LSMemo2) {
    var MemoStorage = (function () {
        function MemoStorage($q, appName) {
            this.$q = $q;
            this.appName = appName;
            this.init();
        }
        MemoStorage.prototype.init = function () {
            this.storage = chrome.storage.local;
        };

        MemoStorage.prototype.getSrorageMemos = function () {
            var _this = this;
            var deferred = this.$q.defer();

            this.storage.get(this.appName, function (items) {
                var memos = items[String(_this.appName)];
                if (memos) {
                    deferred.resolve(memos);
                } else {
                    deferred.resolve([LSMemo2.Memo.getNewMemo(true)]);
                }
            });
            return deferred.promise;
        };

        MemoStorage.prototype.setSrorageMemos = function (memos) {
            var deferred = this.$q.defer();
            var obj = {};
            obj[String(this.appName)] = memos;
            this.storage.set(obj, function () {
                deferred.resolve();
            });
            return deferred.promise;
        };
        return MemoStorage;
    })();
    LSMemo2.MemoStorage = MemoStorage;
})(LSMemo2 || (LSMemo2 = {}));
