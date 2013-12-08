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
