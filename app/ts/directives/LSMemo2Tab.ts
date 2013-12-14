/// <reference path="../_define.d.ts" />

module LSMemo2 {

    export class LSMemo2Tab {

        public static setTab():Object{
            return {
                link:function(scope:ng.IScope, element:JQuery){
                    element.on('shown.bs.tab', 'a[data-toggle="tab"]', function(e:JQueryEventObject){
                        scope.$broadcast('select_memo', $(e.target).parent().index(), $(e.relatedTarget).parent().index())
                    })
                    .sortable({
                        start:function(e:JQueryEventObject, ui:JQueryUI.SortableUIParams){
                            ui.item.data('start', ui.item.index())
                        },
                        update:function(e:JQueryEventObject, ui:JQueryUI.SortableUIParams){
                            scope.$broadcast('sort_memo', ui.item.data('start'), ui.item.index())
                        }
                    })
                }
            }
        }
    }
}