/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class AppCtrl {
        
        private $scope:IAppCtrlScope

        // http://docs.angularjs.org/guide/di
        private static $inject:String[] = [
            '$scope',
        ]

        constructor($scope:IAppCtrlScope){
            this.$scope = $scope
            this.$scope.appVM = this;
            this.init()
        }

        private init():void{
            this.setEvent();
        }

        private setEvent():void{
            this.$scope.$on('click_add', (e:ng.IAngularEvent)=>{
                this.$scope.$broadcast('add_memo')
            })
            this.$scope.$on('click_save', (e:ng.IAngularEvent)=>{
                this.$scope.$broadcast('save_memo')
            })
            this.$scope.$on('click_delete', (e:ng.IAngularEvent)=>{
                this.$scope.$broadcast('delete_memo')
            })
            /* this.$scope.$on('click_clear', (e:ng.IAngularEvent)=>{
                this.$scope.$broadcast('clear_memo')
            }) */
        }

        public close():void{
            window.close()
        }
    }
}