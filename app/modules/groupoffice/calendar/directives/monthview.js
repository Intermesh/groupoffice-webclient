'use strict';

angular.module('GO.Modules.GroupOffice.Calendar').directive('goMonthview', ['$compile',
	function ($compile) {
		return {
			restrict: 'E',
			scope: {
				store: "=",
				calendars: "=",
				date: "=",
				showWeeknbs: "@showWeeknbs"
			},
			controller: [
				'$scope',
				function ($scope) {
					$scope.color= function(cal, event) {
						return cal && GO.Calendar.util.color(cal.color, (event.responseStatus == 1) /*NEEDS-ACTION*/);
					};
					$scope.edit = function (calEvent, $event) {
						$scope.$parent.openEventDialog(calEvent.eventId,calEvent.event.startAt,calEvent.groupId);
						$event.stopPropagation(); // do not bubble
					};
					$scope.classFor = function (calEvent,day) {
						var cls = [];
						if(calEvent.event.startAt.getYmd() !== calEvent.event.endAt.getYmd()) {
							if(calEvent.event.startAt.getYmd() === day){
								cls.push('start');
							} else if(calEvent.event.endAt.getYmd() === day){
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
					$scope.add = function(ymd) {
						ymd = ymd.split('-');
						var begin = new Date(ymd[0], ymd[1]-1, ymd[2]);
						begin.setHours(13);
						var end = new Date(+begin);
						end.setHours(begin.getHours() + 1);
						$scope.$parent.openEventDialog(null,null,null, {startAt: begin, endAt: end});
					};
				}
			],
			link: function (scope, element, attr, controller, transcludeFn) {
				//console.log($scope);
				var d,nav,
					now = new Date(),
					showWeeknbs = (attr.showWeeknbs === 'true'),
					monsun = Date.firstWeekDay === 0 ? 7 : 1;
				//totalDays = (new Date(attr.year, attr.month+1, 0)).getDate();
				function renderMonth() {
					var tmpl = '<table>';
					tmpl += renderWeekdays();
					while (d.getMonth() <= nav.getMonth() && d.getFullYear() == nav.getFullYear()  || d.getFullYear() < nav.getFullYear()) {
						tmpl += renderWeek();
					}

					return tmpl + '</table>';
				}

				function renderWeekdays() {
					var str = '<tr>',
						cls = '';
					;
					if (showWeeknbs) {
						str += '<th>&nbsp;</th>';
					}
					for (var i = 0; i < 7; i++) {
						cls = (now.getMonth() == nav.getMonth() && now.getDay() == i + 1) ? ' class="current"' : '';
						str += '<th' + cls + '>' + Date.days[(i+Date.firstWeekDay)%7].substring(0,3) + '</th>';
					}
					return str + '</tr>';
				}

				function renderWeek() {
					var str = '<tr>';
					if (showWeeknbs) {
						var cls = (d.getWeek() == now.getWeek() && d.getFullYear() == now.getFullYear()) ? ' current' : '';
						str += '<td class="weeknb' + cls + '" ng-click="$parent.nav.setWeek('+d.getWeek()+')" ui-sref="calendar.week">' + d.getWeek() + '</td>'; //hacky
					}
					for (var i = 0; i < 7; i++) {
						str += renderDay();
						d.setDate(d.getDate() + 1); // ++
					}
					return str + '</tr>';

				}

				function renderDay() {
					var str,
						cls = '',
						day = d.getDate(),
						ymd = d.getYmd();
					if (d.getYmd() === now.getYmd()) {
						cls = ' class="today"';
					}
					if (d.getMonth() !== nav.getMonth()) {
						cls = ' class="other"';
					}
					str = '<td' + cls + ' md-ink-ripple="#000000" ng-click="add(\''+ymd+'\')"><span>' + day + '</span><div class="events">';
					str += '<div ng-mousedown="$event.stopPropagation()" ng-repeat="e in events[\'' + ymd + '\']" ng-style="color(calendars[e.calendarId], e)" ng-class="classFor(e,\''+ymd+'\')" \n\
ng-click="edit(e, $event)">\n\
<md-icon ng-if="e.event.hasFiles">attachment</md-icon>\
<md-icon ng-if="e.hasAlarms">notifications</md-icon>\
 {{e.event.title}}\
<span ng-if="!e.event.allDay">\
{{e.event.startAt.getTimeString()}} &ndash; {{e.event.endAt.getTimeString()}}\
<md-icon ng-if="e.event.isRecurring">refresh</md-icon></span>\
</div>';
					str += '</div></td>';

					return str;
				}

				function render(date) {
					nav = date;
					d = new Date(date.getFullYear(), date.getMonth(), 1);
					d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() || 7) + monsun); // start of week
					element.html(renderMonth());
					$compile(element.contents())(scope);
				};

				scope.$watch('date.date', function(value) {
					if (value instanceof Date) {
						render(value);
					}
				},true);

				scope.$watchCollection('store.items', function (newItems) {
					scope.events = scope.store.itemsByDay();
				});

				render(now);
			}
		};
	}
]);
