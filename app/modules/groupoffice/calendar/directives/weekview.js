'use strict';

angular.module('GO.Modules.GroupOffice.Calendar').directive('goWeekview', [
	'$compile',
	'$timeout',
	function ($compile, $timeout) {

		return {
			restrict: 'E',
			transclude: true,
			scope: {
				date: "=",
				store: "=",
				calendars: "="
			},
			controller: [
				'$scope',
				function ($scope) {
					$scope.color = function(calEvent) {
						var cal = $scope.calendars[calEvent.calendarId];
						return cal && GO.Calendar.util.color(cal.color, (calEvent.responseStatus == '1'));
					};
					$scope.hourToPx = 43;// one hour is x pixels heigh
					$scope.edit = function (calEvent) {
						$scope.$parent.openEventDialog(calEvent);
					};
					$scope.add = function(begin) {
						var start = new Date(+begin),
							end = new Date(+begin);
						end.setHours(start.getHours() + 1);
						$scope.$parent.openEventDialog(null, {start: start, end: end});
					};
					$scope.calcStyle = function (calEvent, d) {
						var height = ((calEvent.end.getTime() - calEvent.start.getTime()) / 1000 / 60 / 60 * $scope.hourToPx),
							top = (calEvent.start.getTime() - +d) / 1000 / 60 / 60 * $scope.hourToPx,
							width = 100 / calEvent.overlap.max * calEvent.overlap.span,
							left = calEvent.overlap.col * 100 / calEvent.overlap.max;
						height = Math.min(height, 24*$scope.hourToPx-top);
						left++;
						height--;
						width--;
						return "height:" + height+ "px; top:" + top + "px; width: "+width+"%; left: "+left+"%";
					};
					$scope.classFor = function (calEvent,day) {
						var cls = [];
						if(calEvent.start.getYmd() !== calEvent.end.getYmd()) {
							if(calEvent.start.getYmd() === day){
								cls.push('start');
							} else if(calEvent.end.getYmd() === day){
								cls.push('end');
							} else {
								cls.push('mid');
							}
						}
						switch(calEvent.responseStatus) {
							case 1: /* NEEDS-ACTION*/
								cls.push('new');
								break;
							case 2: /* Tentative */
								cls.push('tentative');
								break;
							case 3: /* Accepted */
								break;
							case 4: /* Declined */
								cls.push('declined');
								break;
						}
						return cls;
					};
				}
			],
			link: function (scope, element, attrs, controller, transcludeFn) {

				var d, start, now = new Date();

				now.setHours(0, 0, 0, 0);

				function renderWeekHeader() {
					var str = '<table><tr><th class="time"></th>',
						cls,
						dd = new Date(d.getTime()); // duplicate because we start over after printing header

					for (var i = 0; i < 7; i++) {
						cls = (now > dd) ? ' class="past"' : (+now === +dd) ? ' class="current"' : '';
						str += '<th' + cls + '><small>' + dd.getDayName().substring(0,3) + '</small><br />\
						<strong>' + dd.getDate() + '</strong><div class="events">\
						<div ng-repeat="e in events[\'' + dd.getYmd() + '\'] | filter:{event:{allDay: true}}" \
						ng-style="color(e)" \
						ng-class="classFor(e,\''+dd.getYmd() +'\')" \
						ng-click="edit(e)" >\
						<md-icon ng-if="e.event.hasFiles">attachment</md-icon>\
						<md-icon ng-if="e.hasAlarms">notifications</md-icon>\
						{{e.event.title}}</div>\
						</div></th>';
						dd.setDate(dd.getDate() + 1); // ++
					}
					return str + '<td class="scrollbar-filler"></td></tr></table>';
				}

				function renderWeek() {
					var str = '<table class="events"><tr><th class="time"></th>';
					for (var i = 0; i < 7; i++) {
						str += '<td>' + renderDay() + '</td>';
						d.setDate(d.getDate() + 1); // ++
					}
					return str + '</tr></table>';
				}

				function renderGrid() {
					var str = '<table>',
						hour, wd, cls;

					for (hour = 0; hour < 24; hour++) {
						str += '<tr>';
						//if (i % 4 === 0)
						str += '<th>' + hour + ':00</th>';
						for (wd = 0; wd < 7; wd++) {
							var timeIterator = (+start + wd * 24 * 60 * 60 * 1000);
							cls = (+now === timeIterator) ? ' class="current"' : '';
							str += '<td' + cls + '><div md-ink-ripple="#000000" ng-click="add('+(timeIterator+(hour * 60 * 60 * 1000))+')">' + '</div></td>';
						}
						str += '</tr>';
					}
					return str + '</table>';
				}

				function renderDay() {
					var str = '',
						day = d.getDate(),
						ymd = d.getYmd();
					if(d.getYmd() == now.getYmd()) {
						var just = new Date(),
							hours = (just.getHours() + just.getMinutes()/60);
						str += '<hr class="now" style="top:'+(hours*scope.hourToPx)+'px" />';
					}
					str += '<div ng-repeat="e in events[\'' + ymd + '\'] | filter:{event:{allDay: false}}" ng-click="edit(e)" ng-mousedown="$event.stopPropagation()" \
ng-style="color(e)" ng-class="classFor(e,\''+d.getYmd() +'\')" style="{{calcStyle(e, ' + d.getTime() + ')}}">\
						<md-icon ng-if="e.event.hasFiles">attachment</md-icon>\
						<md-icon ng-if="e.hasAlarms">notifications</md-icon>\
						{{e.event.title}}\
<md-icon style="float:right" ng-if="e.event.isRecurring">refresh</md-icon>\
<br><span>{{e.event.location}}</span></div>';

					return str;
				}

				function render(date) {
					
					d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + Date.firstWeekDay); // start of week
					start = new Date(+d);
					element.html(renderWeekHeader() + '<div>' + renderWeek() + renderGrid() + '</div>');
					$compile(element.contents())(scope);

					element[0].lastChild.scrollTop = 240; // scroll down to 5:00
					$timeout(function(){
						element[0].lastChild.style.top = element[0].firstChild.offsetHeight+'px';
						element[0].lastChild.scrollTop = 240; // scroll down to 5:00
					},240);
					
				};

				function calculateOverlap(items) {
					var cfg = {},
						i,it,id,
						max,
						rows = [],
						position = 0,
						prevMax = 1,
						previous,
						previousCols = [],
						startEndQuarters = function(event) {
							return {
								start: event.start.getHours() * 60 + event.start.getMinutes(),
								end: event.end.getHours() * 60 + event.end.getMinutes()
							};

						};
					// place in rows per quarter
					for(i in items) {
						if(items[i].allDay) {
							continue;
						}
						id = items[i].eventId;
						cfg[id] = {
							start:startEndQuarters(items[i]).start,
							end:startEndQuarters(items[i]).end,
							span:1
						};
						for(it=cfg[id].start; it<cfg[id].end; it++) {
							if(!rows[it]) {
								rows[it] = {};
							}
							rows[it][id]=items[i].event;
						}
					}
					// calc max event at the same time
					for(i in items) {
						if(items[i].event.allDay) {
							continue;
						}
						id = items[i].eventId;
						max = 1;
						for(it=cfg[id].start; it<cfg[id].end; it++) { // loop quarters
							max = Math.max(max, Object.keys(rows[it]).length);
						}
						cfg[id].max = max;
					}

					// last loop to detect collisions
					for(i in items) {
						if(items[i].event.allDay) {
							continue;
						}
						id = items[i].eventId;

						var col = position % prevMax,
							max = cfg[id].max;
						if(col+1 === prevMax) {
							position=0; // next row
						}
						var pcol = position % prevMax,
							ppos = position;
						col = pcol;
						
						while(pcol !== col || ppos === position) {
							ppos++;
							if(typeof previousCols[pcol] === 'undefined') { // first
								pcol = ppos % prevMax;
								continue;
							}
							previous = cfg[previousCols[pcol].id];
							//collision detection
							if(previous.end > cfg[id].start && pcol === col) {
								//push
								position++;
								col = position % prevMax;
								max = Math.max(max, previous.max);
								cfg[previousCols[pcol].id].max = max;
							} else if (previous.end > cfg[id].start) {
								//shrink
								max = Math.max(max, previous.max);
							}
							pcol = ppos % prevMax;
							if(ppos > 12) {
								break; //throw 'To many events on the same time';
							}
						}
						
						col = position % max;
						cfg[id].max = max;
						cfg[id].col = col;

						previousCols[col] = items[i].event;
						prevMax = max;

						// Set to the item object
						items[i].overlap = cfg[id];
//						items[i].clearModified();
					}
					return items;
				};

				scope.$watchCollection('store', function (newStore) {
					var day, items = newStore.itemsByDay();
					for(day in items) {
						items[day] = calculateOverlap(items[day]);
					}
					scope.events = items;
				});

				scope.$watch('date.date', function(value) {
					if (value instanceof Date) {
						render(value);
					}
				},true);
			}
		};
	}
]);
