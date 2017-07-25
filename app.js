angular.module('MyApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
   $mdThemingProvider.theme('customTheme')
   .primaryPalette('grey')
   .accentPalette('orange')
   .warnPalette('red');
})
.controller('AppCtrl', function($scope) {

}).directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
  var directive = {
    restrict: 'E',
    template: '<input type="file" id="files" name="files[]" multiple class="ng-hide"> <md-button id="uploadButton" class="md-raised md-primary md-hue-2" aria-label="attach_file">    Escolha o JSON </md-button><md-input-container  md-no-float>    <input id="textInput" ng-model="fileName" type="text" placeholder="Nenhum arquivo" ng-readonly="true"></md-input-container><div id="container" style="margin-left:8px"></div>',
    link: apsUploadFileLink
  };
  return directive;
}

function apsUploadFileLink(scope, element, attrs) {
  var input = $(element[0].querySelector('#files'));
  var button = $(element[0].querySelector('#uploadButton'));
  var textInput = $(element[0].querySelector('#textInput'));

  if (input.length && button.length && textInput.length) {
    button.click(function(e) {
      input.click();
    });
    textInput.click(function(e) {
      input.click();
    });
  }

  input.on('change', function(e) {
    var files = e.target.files;
    if (files[0]) {
      scope.fileName = files[0].name;
      handleFileSelect(e);
    } else {
      scope.fileName = null;
    }
    scope.$apply();
  });
}
