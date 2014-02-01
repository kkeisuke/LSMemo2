'use strict';
var LSMemo2;
(function (LSMemo2) {
    var BackGround = (function () {
        function BackGround() {
            this.windowHTML = 'index.html';
            this.windowID = 'mainWindow';
            this.pointOffset = 10;
            this.sizeOffset = 0.8;
            this.init();
        }
        BackGround.prototype.init = function () {
            var _this = this;
            chrome.app.runtime.onLaunched.addListener(function () {
                var screenWidth = ~~(screen.availWidth * Number(_this.sizeOffset));
                var screenHeight = ~~(screen.availHeight * Number(_this.sizeOffset));
                chrome.app.window.create(_this.windowHTML, {
                    id: _this.windowID,
                    bounds: {
                        width: screenWidth,
                        height: screenHeight,
                        top: _this.pointOffset,
                        left: _this.pointOffset
                    },
                    frame: 'none'
                }, function (appWindow) {
                });
            });
        };
        return BackGround;
    })();
    LSMemo2.BackGround = BackGround;
})(LSMemo2 || (LSMemo2 = {}));

var backGround = new LSMemo2.BackGround();
