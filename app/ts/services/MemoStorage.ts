/// <reference path="../_define.ts" />

module LSMemo2{

    export class MemoStorage{

        private $q:ng.IQService
        private appName:String;
        private storage:any

        constructor($q:ng.IQService, appName:String){
            this.$q = $q
            this.appName = appName
            this.init()
        }

        private init():void{
            this.storage = chrome.storage.local
        }

        public getSrorageMemos():ng.IPromise<any>{
            var deferred:ng.IDeferred<any> = this.$q.defer()
            // this.storage.clear()
            this.storage.get(this.appName, (items:Object)=>{
                var memos:Memo[] = items[String(this.appName)];
                if(memos){
                    deferred.resolve(memos)
                }else{
                    deferred.resolve([Memo.getNewMemo(true)])
                }
            })
            return deferred.promise
        }

        public setSrorageMemos(memos:Memo[]):ng.IPromise<any>{
            var deferred:ng.IDeferred<any> = this.$q.defer()
            var obj:Object = {}
            obj[String(this.appName)] = memos;
            this.storage.set(obj, ()=>{
                deferred.resolve();
            })
            return deferred.promise
        }

        /* public clearSrorageMemos():void{
            this.storage.clear()
        } */
    }
}