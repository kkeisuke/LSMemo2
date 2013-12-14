/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class MemoCtrl {

        private $scope:IMemoCtrlScope
        private memoStorage:MemoStorage
        private $timeout:ng.ITimeoutService
        private successMsg:String

        // http://docs.angularjs.org/guide/di
        private static $inject:String[] = [
            '$scope',
            'memoStorage',
            '$timeout',
            'successMsg'
        ]

        constructor($scope:IMemoCtrlScope, memoStorage:MemoStorage, $timeout:ng.ITimeoutService, successMsg:String){
            this.$scope = $scope
            this.$scope.memos = []
            this.$scope.memoVM = this
            this.$scope.alerts = []
            this.$scope.activeNo = 0
            this.memoStorage = memoStorage
            this.$timeout = $timeout
            this.successMsg = successMsg
            this.init()
        }

        private init():void{
            this.memoStorage.getSrorageMemos()
            .then((memos:Memo[])=>{
                this.$scope.memos = memos
                this.resetActiveNo(memos)
            })
            this.setEvent()
        }

        private setEvent():void{
            this.$scope.$on('add_memo', (e:ng.IAngularEvent)=>{
                this.addMemo()
            })
            this.$scope.$on('save_memo', (e:ng.IAngularEvent)=>{
                this.saveMemos()
            })
            this.$scope.$on('delete_memo', (e:ng.IAngularEvent)=>{
                this.deleteMemo()
            })
            /* this.$scope.$on('clear_memo', (e:ng.IAngularEvent)=>{
                this.resetMemos()
            }) */
            this.$scope.$on('select_memo', (e:ng.IAngularEvent, index?:Number, preIndex?:Number)=>{
                this.setActiveMemo(index)
                this.setUnActiveMemo(preIndex)
            })
            this.$scope.$on('sort_memo', (e:ng.IAngularEvent, start?:Number, end?:Number)=>{
                this.sortMemo(start, end)
            })
            this.$scope.$on('alert_close', (e:ng.IAngularEvent, index?:Number)=>{
                this.closeAlert(index)
            })
        }

        public resetActiveNo(memos:Memo[]):void{
            angular.forEach(memos, (memo, index)=>{
                if(memo.active){
                    this.$scope.activeNo = index
                }
            })
        }

        public setActiveMemo(index:Number):void{
            angular.forEach(this.$scope.memos, (memo)=>{
                memo.active = false;
            })
            this.$scope.memos[Number(index)].active = true;
            this.$scope.activeNo = index
        }

        public setUnActiveMemo(index:Number):void{
            this.$scope.memos[Number(index)].active = false;
        }

        public addMemo():void{
            this.$timeout(()=>{
                this.$scope.memos[this.$scope.memos.length] = Memo.getNewMemo()
            }, 0)
        }

        public deleteMemo():void{
            if(Number(this.$scope.activeNo) > 0){
                this.$timeout(()=>{
                    this.$scope.memos.splice(Number(this.$scope.activeNo), 1)
                    this.setActiveMemo(Number(this.$scope.activeNo) - 1)
                }, 0)
            }
        }

        public sortMemo(start:Number, end:Number):void{
            this.$timeout(()=>{
                this.$scope.memos.splice(Number(end), 0, this.$scope.memos.splice(Number(start), 1)[0])
                this.resetActiveNo(this.$scope.memos)
            }, 0)
        }

        /* public resetMemos():void{
            this.$scope.memos = [Memo.getNewMemo()]
        } */

        public saveMemos():void{
            this.memoStorage.setSrorageMemos(this.$scope.memos)
            .then(()=>{
                this.addAlert()
            })
        }

        public addAlert():void{
            this.$scope.alerts[this.$scope.alerts.length] = Alert.getNewAlert('success', this.successMsg)
        }

        public closeAlert(index:Number):void{
            this.$timeout(()=>{
                this.$scope.alerts.splice(Number(index), 1)
            }, 0)
        }
    }
}