/// <reference path="../_define.ts" />

module LSMemo2 {

    export class Alert {

        public type:String
        public msg:String

        public static getNewAlert(type:String, msg:String):Alert{
            return new Alert(type, msg)
        }

        constructor(type:String, msg:String){
            this.type = type
            this.msg = msg
        }
    }
}