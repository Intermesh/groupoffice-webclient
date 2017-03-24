#!/usr/bin/php
<?php
$lang = 'nl';
$root = dirname(dirname(__FILE__));

chdir($root.'/app');

$cmd = 'find . -type d -name language';
exec($cmd, $langDirs, $return_var);

//create non existing lang files
foreach($langDirs as $langDir) {
	
	$langFile = $langDir.'/'.$lang.'.js';
	
	if(!file_exists($langFile)) {	
		
		echo "Creating ".$langFile."\n\n";
		
		$data = 'angular.module("GO.Core")
.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
		TranslateProvider.addTranslations("nl", { 

		});
	}]);';
		
		file_put_contents($langFile, $data);
	}
}

$cmd = 'find . -type f -name '.$lang.'.js';
exec($cmd, $langFiles, $return_var);

foreach($langFiles as $langFile) {
//	echo dirname(dirname($langFile));
	chdir($root.'/app/'.dirname(dirname($langFile)));
	
	echo "Updating ".$langFile."\n\n";
	
	$cmd = $root.'/tools/find-language.php language/'.$lang.'.js';
	system($cmd);	
}

