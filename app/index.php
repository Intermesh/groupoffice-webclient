<?php
chdir(dirname(__FILE__));
//
//if(file_put_contents('core/templates.js', "/* leave this empty file. The gulp template-cache build task will put html templates here. */") === false){
//	exit("Fatal: please make app/core/templates.js writable");
//}

ob_start();
?><!doctype html>
<html lang="en" ng-app="GO"  ng-strict-di>
	<head>
		<!--<base href="/groupoffice-webclient/app/">-->
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
		<meta charset="utf-8">		
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes">

		
		<title ng-bind="title">Loading...</title>



		<link rel="shortcut icon" type="image/x-icon" ng-href="{{::shortCutIcon}}">
		<link href='//fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic' rel='stylesheet' type='text/css'>

		<!-- build:css css/app.css -->
		<!--<link href="../bower_components/angular-material/angular-material.css" rel="stylesheet" type="text/css"/>-->
		<!--<link href="core/resources/iconfont/material-icons.css" rel="stylesheet" type="text/css"/>-->
		<link href="../bower_components/angular-material-datetimepicker/css/material-datetimepicker.css" rel="stylesheet" type="text/css"/>
		<link href="./core/components/mdpickers/mdPickers.css" rel="stylesheet" type="text/css"/>
		<link href="../bower_components/chartist/dist/chartist.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="css/app.css">
		<!-- endbuild -->
		
	</head>
	<body ng-cloak>	
		<div class="go-header" ng-if="::loggedIn" ng-controller="GO.Controllers.HeaderController">
			<go-launchpad show="showLaunchpad"></go-launchpad>

			<md-toolbar class="md-hue-2">
				<div class="md-toolbar-tools">

					<md-button class="md-icon-button" ng-click="toggleLaunchpad()" ng-if="::loggedIn" accesskey="z">
						<md-icon aria-label="Menu">apps</md-icon>
						<md-tooltip>{{::"Launchpad"| goT}} (Alt + Z)</md-tooltip>
					</md-button>		

					<h1 ng-bind="appTitle"></h1>
					<span flex></span>


					<go-notifications-button></go-notifications-button>

					<md-button class="md-icon-button" ng-click="$state.go('settings.accounts');">
						<md-icon aria-label="Settings">settings</md-icon>
						<md-tooltip>{{::"Settings"| goT}}</md-tooltip>
					</md-button>

					<md-button class="md-icon-button" ng-click="user.logout();">
						<md-icon aria-label="Logout">exit_to_app</md-icon>
						<md-tooltip>{{::"Logout"| goT}}</md-tooltip>
					</md-button>
				</div>
			</md-toolbar>
		</div>

	<div id="go-container" ui-view>

	</div>


	<!-- use ngIf because progress widgets consume power when hidden -->
	<go-mask ng-cloak ng-if="showMask">
		<md-card>
			<md-card-content>				
				<p>{{maskText|| "Loading"}}</p>
				<md-progress-linear mode="intermediate"></md-progress-linear>
			</md-card-content>
		</md-card>
	</go-mask>

	<!-- build:js js/app.js -->
	<script src="../bower_components/wysihtml/dist/wysihtml-toolbar.js" type="text/javascript"></script>
	<!--<script src="../bower_components/fastclick/lib/fastclick.js" type="text/javascript"></script>-->

	<script src="../bower_components/angular/angular.js"></script>		
	<script src="../bower_components/moment/moment.js" type="text/javascript"></script>
	<script src="../bower_components/angular-aria/angular-aria.js" type="text/javascript"></script>
	<script src="../bower_components/angular-material/angular-material.js" type="text/javascript"></script>
<!--	<script src="../bower_components/ag-grid/dist/angular-grid.js" type="text/javascript"></script>-->
	<!--<script src="../bower_components/ng-multi-transclude/src/multi-transclude.js" type="text/javascript"></script>-->
	<script src="../bower_components/angular-sanitize/angular-sanitize.js" type="text/javascript"></script>
	<script src="../bower_components/angular-messages/angular-messages.js" type="text/javascript"></script>
	<script src="../bower_components/angular-i18n/angular-locale_nl-nl.js" type="text/javascript"></script>
	<script src="../bower_components/angular-animate/angular-animate.js" type="text/javascript"></script>
	<script src="../bower_components/angular-ui-router/release/angular-ui-router.js" type="text/javascript"></script>
	<script src="../bower_components/ng-flow/dist/ng-flow-standalone.js" type="text/javascript"></script>
	<script src="../bower_components/ng-sortable/dist/ng-sortable.js" type="text/javascript"></script>
	<script src="../bower_components/chartist/dist/chartist.js" type="text/javascript"></script>
	<script src="../bower_components/angular-chartist/angular-chartist.js" type="text/javascript"></script>
	<script src="./core/go.js"></script>
	<?php
	$skip = ['go.js', 'app.js', 'config.js'];

	/**
	 * Finds js files recursively and includes them. 
	 * It includes files first and then goes deeper into the tree.
	 * @param Folder $folder
	 */
	function findJs($path = ".") {
		if (!$dir = opendir($path)) {
			return false;
		}

		$files = [];
		$folders = [];
		while ($item = readdir($dir)) {

			if ($item == "." || $item == ".." || in_array($item, $GLOBALS['skip'])) {
				continue;
			}
			$itemPath = $path . '/' . $item;
			if (is_file($itemPath)) {
				if (substr($itemPath, -3) == '.js') {
					$files[] = $itemPath;
				}
			} else {
				$folders[] = $itemPath;
			}
		}
		sort($files);
		sort($folders);

		foreach ($files as $file) {
			//echo '<script>console.log("'.$file.'");</script>';
			echo '<script src="' . $file . '"></script>' . "\n";
		}

		foreach ($folders as $folder) {
			findJs($folder);
		}
	}

	findJs();
	?>		
	<script src="./app.js"></script>
	<!-- endbuild -->
	
	<script src="./config.js"></script>
</body>
</html>

<?php
$html = ob_get_clean();
//ob_end_clean();

if (isset($argv) && $argv[1] == 'build') {
	if (!file_put_contents('build.html', $html)) {
		trigger_error("Could not write build/index.html.", E_USER_ERROR);
	}
} else {
	echo $html;
}
