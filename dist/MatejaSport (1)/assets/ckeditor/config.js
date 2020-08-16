/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
  config.removePlugins = 'elementspath,save,font,easyimage';
  config.extraPlugins = 'autogrow, image2';
  config.colorButton_colors = '000000,4d4d4d,999999,e6e6e6,ffffff,ff0000,008000,0000ff,ffff00,ffa500,800080,MatejaPink/e83e8c,MatejaBlue/00a7c0';
  config.colorButton_enableAutomatic = false;
  config.height = 50;
  config.autoGrow_onStartup = true;
  config.autoGrow_minHeight = 50;
  config.autoGrow_maxHeight = 600;
  config.linkShowAdvancedTab = false;
  config.linkShowTargetTab = false;
  config.filebrowserUploadMethod = 'form';
};



