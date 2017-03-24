#!/usr/bin/php
<?php
$lang = 'nl';
$root = dirname(dirname(__FILE__));

chdir($root.'/app');

$cmd = 'find . -type f -name '.$lang.'.js';
exec($cmd, $langFiles, $return_var);

$fp = fopen('/tmp/'.$lang.'.csv', 'r');


while($record = fgetcsv($fp)) {
	
}

foreach($langFiles as $langFile) {	
	$vars = getVars($root.'/app/'.$langFile);
	foreach($vars as $key => $translation) {
		fputcsv($fp,[$key, $translation, $langFile]);
	}
}
fclose($fp);


function getVars($file) {
	$data = file_get_contents($file);
	
	$startpos = strpos($data, '{');
	$startpos = strpos($data, '{', $startpos+1);
	
	$endpos = strrpos($data, '}');
	$endpos = strrpos($data, '}', $endpos-strlen($data)-1);
	
	if($startpos && $endpos) {
		$json = fixJSON(substr($data, $startpos, $endpos-$startpos + 1));
		return json_decode($json);
	}else
	{
		return [];
	}
}


function fixJSON($json) {
    $regex = <<<'REGEX'
~
    "[^"\\]*(?:\\.|[^"\\]*)*"
    (*SKIP)(*F)
  | '([^'\\]*(?:\\.|[^'\\]*)*)'
~x
REGEX;

    return preg_replace_callback($regex, function($matches) {
        return '"' . preg_replace('~\\\\.(*SKIP)(*F)|"~', '\\"', $matches[1]) . '"';
    }, $json);
}
