module LSMemo2{
    export interface IMemoCtrlScope extends ng.IScope {
        memos:Memo[]
        memoVM:MemoCtrl
        alerts:Object[]
        activeNo:Number
    }
}