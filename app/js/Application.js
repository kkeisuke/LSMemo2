var LSMemo2;
(function (LSMemo2) {
    angular.module('LSMemo2', ['ngSanitize']).constant('appName', 'LSMemo2').constant('successMsg', '保存できました').config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
    }).filter('marked', LSMemo2.Marked.replaceMarkdown).service('memoStorage', LSMemo2.MemoStorage).directive('lsmemo2Tab', LSMemo2.LSMemo2Tab.setTab).directive('lsmemo2Editor', LSMemo2.LSMemo2Editor.setEditor).directive('lsmemo2Alert', LSMemo2.LSMemo2Alert.setAlert).controller('AppCtrl', LSMemo2.AppCtrl).controller('MemoCtrl', LSMemo2.MemoCtrl).controller('ToolBarCtrl', LSMemo2.ToolBarCtrl);
})(LSMemo2 || (LSMemo2 = {}));
