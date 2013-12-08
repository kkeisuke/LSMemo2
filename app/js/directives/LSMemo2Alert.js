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
