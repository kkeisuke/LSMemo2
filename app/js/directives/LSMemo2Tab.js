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
