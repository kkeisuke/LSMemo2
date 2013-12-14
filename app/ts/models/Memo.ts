/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class Memo {

        private id:Number
        public title:String
        public content:String
        public placeholder:String
        public active:Boolean
        private static placeholder:String = '新しいメモ'

        public static getNewMemo(active:Boolean = false):Memo{
            return new Memo('', '', '', active)
        }

        constructor(title:String = '', content:String = '', placeholder:String = '', active:Boolean = false){
            this.id = Number(Date.now())
            this.title = title
            this.content = content
            this.placeholder = placeholder || Memo.placeholder
            this.active = active
        }
    }
}