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
