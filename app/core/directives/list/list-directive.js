/**
 * @ngdoc directive
 * @name GO.Core.goList
 * @element div
 *
 * @description
 * Creates a list. It should have an item and empty-state child element only.
 * 
 * @param {GO.data.Store} store
 *
 * @example
 * <go-list store="store" flex>
 * 
 *   <item index="model.name" class="md-2-line" ng-click="selectContact(model)">
 *   	<img alt="{{model.name}}" ng-src="{{model.photo}}&amp;w=50&amp;h=50&amp;zoomCrop=1" class="md-avatar" />
 *   	<div class="md-list-item-text">
 *   		<h3>{{model.name}}</h3>
 *   		<p>{{model.company.name|| "No company"}}</p>
 *   	</div>
 *   </item>
 *   
 *   <empty-state>
 *   	<md-icon>person</md-icon>
 *   	<p>{{::"No contacts found"| goT}}</p>
 *   </empty-state>
 * 
 * </go-list>
 * 
 */

angular.module('GO.Core').directive('goList', [

	function ( ) {
		return {
			scope: false,
//			replace: true,
			template: function (tElement, tAttr) {

				var cls = tElement.attr('class');


				tAttr.trackBy = tAttr.trackBy || 'id';

				var itemEl = tElement.find('item');

				var ngCls = itemEl.attr('ng-class');

				if (!ngCls) {
					ngCls = '{\'deleted\': model.deleted, \'selected\': model.$selected}';
				} else
				{
					ngCls = ngCls.substring(0, ngCls.length - 1) + ', \'deleted\': model.deleted, \'selected\': model.$selected}';
				}

				if (tAttr.virtual == 'false') {

					var itemReplacement = '<section>' +
									'<div ng-repeat-start="model in ' + tAttr['store'] + '.items track by model.' + tAttr['trackBy'] + '" style="display:none"></div>'; //dummy div as workaround because ng-repeat-start on md-subheader gives a strange result

					if (tAttr.index) {
						itemReplacement += '<md-subheader ng-if="model.$index">{{model.$index}}</md-subheader>';
					}

					if (tAttr.group) {
						itemReplacement += '<md-subheader ng-if="model.$group">{{model.$group}}</md-subheader>';
					}


					itemReplacement += '<md-list-item ng-repeat-end ng-class="' + ngCls + '"';

					tElement[0].innerHTML = tElement[0].outerHTML
									.replace('<item', itemReplacement)
									.replace('item>', '></div></section>')
									.replace('<go-list', '<md-content flex layout><md-list flex')
									.replace('go-list>', 'md-list></md-content>')
									.replace('<empty-state', '<div ng-if="!' + tAttr['store'] + '.busy && !' + tAttr['store'] + '.items.length" class="empty-state"')
									.replace('empty-state>', 'md-list-item>');

				} else {


					var itemReplacement =		'<div md-virtual-repeat="model in ' + tAttr['store'] + '" md-on-demand>'; //dummy div as workaround because ng-repeat-start on md-subheader gives a strange result

					if (tAttr.index) {
						itemReplacement += '<md-subheader class="md-primary md-no-sticky" ng-if="model.$index">{{model.$index}}</md-subheader>';
					}

					if (tAttr.group) {
						itemReplacement += '<md-subheader class="md-primary md-no-sticky" ng-if="model.$group">{{model.$group}}</md-subheader>';
					}


					itemReplacement += '<md-list-item ng-class="' + ngCls + '"';

					tElement[0].innerHTML = tElement[0].outerHTML
									.replace('<item', itemReplacement)
									.replace('item>', '></div>')
									.replace('<go-list', '<md-virtual-repeat-container><md-list ')
									.replace('go-list>', 'md-list></md-virtual-repeat-container>')
									.replace('<empty-state', '<div ng-if="!' + tAttr['store'] + '.busy && !' + tAttr['store'] + '.items.length" class="empty-state"')
									.replace('empty-state>', 'md-list-item>');

				}

				tElement.addClass(cls);

				return tElement[0].innerHTML;
			},
			link: function (scope, element, attrs, ctrl, transclude) {

				var store = scope.$eval(attrs.store);


				if (attrs.index) {
					store.$index = attrs.index;
				}

				if (attrs.group) {
					store.$group = attrs.group;
				}
				
				//element.attr('tabindex', '-1');


				//Infinite scroll section
//								var lengthThreshold = 200, timeThreshold = 400;
//								var scrollEl = element[0];
//								var checker = function () {
//
//
//									if (scrollEl.scrollTop > 0) {
//										var remaining = scrollEl.scrollHeight - (scrollEl.clientHeight + scrollEl.scrollTop);
//
//										if (remaining < lengthThreshold) {
//
//											var promise = store.nextPage();
//											
//											if(promise) {
//												promise.then(function () {
//													$timeout(checker, timeThreshold);
//												});
//											}
//										}
//									}
//								};
//								checker();
//								element.bind('scroll', checker);




				function liToModel(el) {
					var listItemScope = el.scope();

					return listItemScope.model;
				}
				
				function toggleSelection(index) {
					var selected = store.getSelectedIndexes();

					var alreadySelected;
					if ((alreadySelected = selected.indexOf(index)) === -1) {
						selected.push(index);
					} else
					{
						selected.splice(alreadySelected, 1);
					}

					store.select(selected);
					
				}

				element.bind("click", function (event) {

					var itemScope = angular.element(event.target).scope();

					//happense with secondary list action clicks
					if (!itemScope || !angular.isDefined(itemScope.$index)) {
						return;
					}

					var curIndex = itemScope.$index;

					if (event.ctrlKey || event.metaKey) {
						toggleSelection(curIndex);
						event.preventDefault();
					} else if (event.shiftKey) {

						var selected = [];
						var select = false;
						for (var i = 0, l = store.items.length; i < l; i++) {
							if (select) {
								selected.push(i);
							}

							if (store.items[i].$selected || i === curIndex) {
								if (select) {
									break;
								} else
								{
									select = true;
									selected.push(i);
								}
							}
						}

						store.select(selected);
						event.preventDefault();
					} else
					{
						store.select([curIndex]);
					}
				});



				//key navigation
				function findLi(el) {					
					while (el.parentNode && el.parentNode.tagName != 'MD-LIST') {						
						el = el.parentNode;
					}
					return el;
				}

				function findNext(el, reverse) {				
					
					var fn = reverse ? "previousElementSibling" : "nextElementSibling";
					var next = el[fn];
					
					while (next && next.tagName !== el.tagName) {
						
						next = next[fn];
					}
					
					return next;

				}

				element.bind("keydown", function (e) {
					
					//arrow up or down
					if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 46) {
						return;
					}
					
					var li = findLi(e.target);					
					var button, nextLi, nextLiScope;
					
					
					//delete
					if (e.keyCode == 46) {
						button = angular.element(li).find('button');
						
						store.deleteSelected().then(function() {							
							if(button[0]) {								
								button.focus();
								toggleSelection(button.scope().$index);
							}
						});
						return;
					}

					nextLi = findNext(li, e.keyCode == 38);
					nextLi = angular.element(nextLi);
					
					if(nextLi) {
						button = nextLi.find('button');
					}					
					
					if(!button || !button[0]) {
						return;
					}					

					e.preventDefault();

					button.focus();
					if (e.shiftKey) {

						nextLiScope = nextLi.scope();

						scope.$apply(function(){
							if(nextLiScope.model.$selected) {
								//we're deselecting after going back with shift pressed
								toggleSelection(angular.element(li).scope().$index);							
							}else
							{
								toggleSelection(nextLiScope.$index);							
							}
						});

						return;
					}else
					{
						toggleSelection(angular.element(li).scope().$index);
					}

					if (!attrs.disableAutofollow) {
						button[0].click();
					}
					
				});



			}
		};
	}])
				;