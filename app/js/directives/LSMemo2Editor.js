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
