angular.module('GO.Core').directive('goUiSrefFocus', ['$state',
	function ($state) {
		return  {
			restrict: "A",
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
					
					function parseStateRef(ref, current) {
						var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
						if (preparsed) ref = current + '(' + preparsed[1] + ')';
						parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
						if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
						return { state: parsed[1], paramExpr: parsed[3] || null };
					}
					
//					function stateContext(el) {
//						var stateData = el.parent().inheritedData('$uiView');
//
//						if (stateData && stateData.state && stateData.state.name) {
//							return stateData.state;
//						}
//					}

					var ref = parseStateRef($attrs.uiSref, $state.current.name);
					
//					var state = $state.get(ref.state, stateContext($element));

					var params = $scope.$eval(ref.paramExpr);

					
					$scope.$on('$stateChangeSuccess', update);
					// Update route state
					function update() {
						if ($state.includes(ref.state, params)) {				
							$element[0].focus();
						}
					}					
					update();
				}]
		};
	}]);