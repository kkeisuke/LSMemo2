/// <reference path="../_define.d.ts" />

module LSMemo2 {
    
    export class Marked {

        public static replaceMarkdown():Function{
            return function(st:String){
                return marked(st, function(err:Object, content:String){
                    var result:String = content
                    if(err){
                        result = ''
                    }
                    return result
                })
            }
        }
    }
}