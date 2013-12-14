/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class LSMemo2Editor {

        public static setEditor($timeout:ng.ITimeoutService):Object{
            return {
                link:function(scope:ng.IScope, element:JQuery){
                    $timeout(function(){
                        LSMemo2Editor.setHight(element)
                    }, 0)
                    element.on("keyup", function(){
                        LSMemo2Editor.setHight(element)
                    })
                    scope.$on('select_memo', ()=>{
                        LSMemo2Editor.setHight(element)
                    })
                }
            }
        }

        public static setHight(element:JQuery):void{
            element.outerHeight(Math.max.call(null, element.get(0).scrollHeight, element.outerHeight()))
        }
    }
}