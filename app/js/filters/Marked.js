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
