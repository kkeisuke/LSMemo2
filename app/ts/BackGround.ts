'use strict'
/// <reference path="_define.ts" />

module LSMemo2 {
    
    export class BackGround {

        private windowHTML:String = 'index.html'
        private windowID:String = 'mainWindow'
        private pointOffset:Number = 10
        private sizeOffset:Number = 0.8

        constructor(){
            this.init()
        }

        private init(){
            chrome.app.runtime.onLaunched.addListener(()=> {
                var screenWidth:Number = ~~(screen.availWidth * Number(this.sizeOffset))
                var screenHeight:Number = ~~(screen.availHeight * Number(this.sizeOffset))
                chrome.app.window.create(this.windowHTML, {
                    id:this.windowID,
                    bounds:{
                        width: screenWidth,
                        height: screenHeight,
                        top: this.pointOffset,
                        left: this.pointOffset,
                    }
                }, (appWindow)=> {
                    // console.log(appWindow)
                })
            })
        }
    }
}

var backGround:LSMemo2.BackGround = new LSMemo2.BackGround();