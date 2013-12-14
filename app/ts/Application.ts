/// <reference path='_define.d.ts' />

module LSMemo2 {

    angular.module('LSMemo2', ['ngSanitize'])
        .constant('appName', 'LSMemo2')
        .constant('successMsg', '保存できました')
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(
                /^\s*(https?|ftp|mailto|file|chrome-extension):/
            )
        })
        .filter('marked', Marked.replaceMarkdown)
        .service('memoStorage', MemoStorage)
        .directive('lsmemo2Tab', LSMemo2Tab.setTab)
        .directive('lsmemo2Editor', LSMemo2Editor.setEditor)
        .directive('lsmemo2Alert', LSMemo2Alert.setAlert)
        .controller('AppCtrl', AppCtrl)
        .controller('MemoCtrl', MemoCtrl)
        .controller('ToolBarCtrl', ToolBarCtrl)
}