/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class ToolBarCtrl {
        
        private $scope:IToolBarCtrlScope

        // http://docs.angularjs.org/guide/di
        private static $inject:String[] = [
            '$scope',
        ]

        constructor($scope:IToolBarCtrlScope){
            this.$scope = $scope
            this.$scope.toolBarVM = this;
            this.init()
        }

        private init():void{

        }

        public addMemo():void{
            this.$scope.$emit('click_add')
        }
        
        public saveMemo():void{
            this.$scope.$emit('click_save')
        }

        public deleteMemo():void{
            this.$scope.$emit('click_delete')
        }

        /* public clearMemo():void{
            this.$scope.$emit('click_clear')
        } */
    }
}