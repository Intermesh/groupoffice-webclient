#!/usr/bin/php
<?php
/**
 * mschering@mschering-UX31A:/var/www/html/groupoffice-webclient/app/core$ ../../tools/find-language.php language/nl.js
 * 
 * mschering@mschering-UX31A:/var/www/html/groupoffice-webclient/app/modules/contacts$ ../../../tools/find-language.php language/nl.js
 */

$root = dirname(dirname(__FILE__));

$langFile = $argv[1];

if(!file_exists($langFile)) {
	exit("Could not find file ".$langFile);
}

$coreLangFile = $root."/app/core/language/".  basename($langFile);

$existingLang = file_get_contents($langFile);

if(realpath($coreLangFile) != realpath($langFile)) {
	$coreLang = file_get_contents($coreLangFile);
}else
{
	$coreLang = '';
}

$endpos1 = strrpos($existingLang, '}');
if(!$endpos1) {
	exit("Incorrect file format");
}

$endpos2 = strrpos($existingLang, '}', $endpos1-strlen($existingLang)-1);

if(!$endpos2) {
	exit("Incorrect file format");
}

function langKeyExists($key) {
	global $existingLang, $coreLang;
	
	if(strpos($existingLang, json_encode($key)) !== false){
		return true;
	}
	
	if(strpos($coreLang, json_encode($key)) !== false){
		return true;
	}
	
	return false;
}

$cmd = 'find . -type f \( -iname "*.html" \);';
exec($cmd, $scripts, $return_var);

//return var should be 0 otherwise something went wrong
if($return_var!=0)
	exit("Find command did not run successfully.\n");

//$scripts = array(
//	'/var/www/html/groupoffice-client/app/modules/contacts/partials/contact-detail.html'
//);

$lang = [];

foreach($scripts as $script){
	
	$content = file_get_contents($script);
	
	preg_match_all('/\{(::)?[\'"]([^"\']+)[\'"][\s]*\|[\s]*goT[^\}]*\}/', $content, $matches);	
	$keys = $matches[2];
	
	preg_match_all('/<go-multiple.*title="([^"]*)"/', $content, $matches);	
	$keys = array_merge($keys, $matches[1]);
	
	preg_match_all('/<go-multiple.*title=\'([^\']*)\'/', $content, $matches);	
	$keys = array_merge($keys, $matches[1]);
	
	
	preg_match_all('/<go-.*label="([^"]*)"/', $content, $matches);	
	$keys = array_merge($keys, $matches[1]);
	
	preg_match_all('/<go-.*label=\'([^\']*)\'/', $content, $matches);	
	$keys = array_merge($keys, $matches[1]);
	
//	var_dump($keys);

	foreach($keys as $str){
		
		if(!langKeyExists($str)){		
			$lang[$str] = $str;
		}
	}		
}

$cmd = 'find . -type f \( -iname "*.js" \);';
exec($cmd, $scripts, $return_var);

//return var should be 0 otherwise something went wrong
if($return_var!=0)
	exit("Find command did not run successfully.\n");

foreach($scripts as $script){
	
	$content = file_get_contents($script);
	
	preg_match_all('/Translate\.t\([\'"]([^\'"]+)[\'"]\)/', $content, $matches);

	foreach($matches[1] as $str){		
		if(!langKeyExists($str)){		
			$lang[$str] = $str;
		}
	}		
}

$json = substr(json_encode($lang, JSON_PRETTY_PRINT),1, -1);


$newFile = trim(substr($existingLang, 0, $endpos2)).",\n".$json.trim(substr($existingLang, $endpos2));

//echo $newFile;
file_put_contents($langFile, $newFile);