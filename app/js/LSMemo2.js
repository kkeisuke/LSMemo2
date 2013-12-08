/*! LSMemo2 - v0.0.0 - 2013-12-08
* https://github.com/kkeisuke
* Copyright (c) 2013 kkeisuke; Licensed , ,  */
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
        AppCtrl.$inject = [
            '$scope'
        ];
        return AppCtrl;
    })();
    LSMemo2.AppCtrl = AppCtrl;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var MemoCtrl = (function () {
        function MemoCtrl($scope, memoStorage, $timeout, successMsg) {
            this.$scope = $scope;
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
            this.$scope.memos[this.$scope.memos.length] = LSMemo2.Memo.getNewMemo();
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
            this.$scope.memos.splice(Number(end), 0, this.$scope.memos.splice(Number(start), 1)[0]);
            this.resetActiveNo(this.$scope.memos);
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

var LSMemo2;
(function (LSMemo2) {
    var LSMemo2Alert = (function () {
        function LSMemo2Alert() {
        }
        LSMemo2Alert.setAlert = function ($timeout) {
            return {
                link: function (scope, element) {
                    element.on('closed.bs.alert', function (e) {
                        scope.$emit('alert_close', element.index());
                    });
                    $timeout(function () {
                        element.alert('close');
                    }, 2000);
                }
            };
        };
        return LSMemo2Alert;
    })();
    LSMemo2.LSMemo2Alert = LSMemo2Alert;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var LSMemo2Editor = (function () {
        function LSMemo2Editor() {
        }
        LSMemo2Editor.setEditor = function ($timeout) {
            return {
                link: function (scope, element) {
                    $timeout(function () {
                        LSMemo2Editor.setHight(element);
                    }, 0);
                    element.on("keyup", function () {
                        LSMemo2Editor.setHight(element);
                    });
                    scope.$on('select_memo', function () {
                        LSMemo2Editor.setHight(element);
                    });
                }
            };
        };

        LSMemo2Editor.setHight = function (element) {
            element.outerHeight(Math.max.call(null, element.get(0).scrollHeight, element.outerHeight()));
        };
        return LSMemo2Editor;
    })();
    LSMemo2.LSMemo2Editor = LSMemo2Editor;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var LSMemo2Tab = (function () {
        function LSMemo2Tab() {
        }
        LSMemo2Tab.setTab = function () {
            return {
                link: function (scope, element) {
                    element.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
                        scope.$broadcast('select_memo', $(e.target).parent().index(), $(e.relatedTarget).parent().index());
                    }).sortable({
                        start: function (e, ui) {
                            ui.item.data('start', ui.item.index());
                        },
                        update: function (e, ui) {
                            scope.$broadcast('sort_memo', ui.item.data('start'), ui.item.index());
                        }
                    });
                }
            };
        };
        return LSMemo2Tab;
    })();
    LSMemo2.LSMemo2Tab = LSMemo2Tab;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var Marked = (function () {
        function Marked() {
        }
        Marked.replaceMarkdown = function () {
            return function (st) {
                return marked(st, function (err, content) {
                    var result = content;
                    if (err) {
                        result = '';
                    }
                    return result;
                });
            };
        };
        return Marked;
    })();
    LSMemo2.Marked = Marked;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var Alert = (function () {
        function Alert(type, msg) {
            this.type = type;
            this.msg = msg;
        }
        Alert.getNewAlert = function (type, msg) {
            return new Alert(type, msg);
        };
        return Alert;
    })();
    LSMemo2.Alert = Alert;
})(LSMemo2 || (LSMemo2 = {}));

var LSMemo2;
(function (LSMemo2) {
    var Memo = (function () {
        function Memo(title, content, placeholder, active) {
            if (typeof title === "undefined") { title = ''; }
            if (typeof content === "undefined") { content = ''; }
            if (typeof placeholder === "undefined") { placeholder = ''; }
            if (typeof active === "undefined") { active = false; }
            this.title = title;
            this.content = content;
            this.placeholder = placeholder || Memo.placeholder;
            this.active = active;
        }
        Memo.getNewMemo = function (active) {
            if (typeof active === "undefined") { active = false; }
            return new Memo('', '', '', active);
        };
        Memo.placeholder = '新しいメモ';
        return Memo;
    })();
    LSMemo2.Memo = Memo;
})(LSMemo2 || (LSMemo2 = {}));

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

var LSMemo2;
(function (LSMemo2) {
    angular.module('LSMemo2', ['ngSanitize']).constant('appName', 'LSMemo2').constant('successMsg', '保存できました').config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
    }).filter('marked', LSMemo2.Marked.replaceMarkdown).factory('memos', function () {
        return [];
    }).service('memoStorage', LSMemo2.MemoStorage).directive('lsmemo2Tab', LSMemo2.LSMemo2Tab.setTab).directive('lsmemo2Editor', LSMemo2.LSMemo2Editor.setEditor).directive('lsmemo2Alert', LSMemo2.LSMemo2Alert.setAlert).controller('AppCtrl', LSMemo2.AppCtrl).controller('MemoCtrl', LSMemo2.MemoCtrl).controller('ToolBarCtrl', LSMemo2.ToolBarCtrl);
})(LSMemo2 || (LSMemo2 = {}));
