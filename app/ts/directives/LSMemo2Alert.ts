/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class LSMemo2Alert{

        public static setAlert($timeout:ng.ITimeoutService):Object{
            return {
                link:function(scope:ng.IScope, element:JQuery){
                    element.on('closed.bs.alert', function(e:JQueryEventObject){
                        scope.$emit('alert_close', element.index())
                    })
                    $timeout(function(){
                        element.alert('close')
                    }, 2000)
                }
            }
        }
    }
}