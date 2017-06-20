'use strict';

angular.module('GO.Modules.GroupOffice.Calendar').directive('goYearview', ['$compile', function ($compile) {
	return {
		restrict: 'E',
		scope: {
			date: "=",
			store: "=",
			calendars: "=",
			showWeeknbs: "@showWeeknbs"
		},
		controller: ['$scope', function ($scope) {
				$scope.color= function(cal) {return cal && GO.Calendar.util.color(cal.color);};
		}],
		link: function (scope, element, attr, controller, transcludeFn) {
			var i, str, nav, d, data = [],
				now = new Date(),
				showWeeknbs = (attr.showWeeknbs == 'true');

			function renderYear() {
				var cls, tmpl = '';
				for(i = 0; i < Date.months.length; i++) {
					cls = (now.getMonth() === i) ? ' class="current"' : '';
					tmpl += '<div><table>\n\
						<caption'+cls+' ng-click="$parent.nav.setMonth('+i+')" ui-sref="calendar.month">'+Date.months[i]+'</caption>'+
						renderWeekdays()+
						renderMonth(i)+
						'</table></div>';
				}
				return tmpl;
			}

			function renderWeekdays() {
				str = '<tr>';
				if(showWeeknbs) {
					str += '<td>&nbsp;</td>';
				}
				for(var i = 0; i < 7; i++) {
					str += '<th>'+Date.days[(i+Date.firstWeekDay)%7].substring(0,1)+'</th>';
				}
				return str+'</tr>';
			}

			function calcDayOffset(n) {
				var firstDay = (new Date(nav.getFullYear(),n,1)).getDay();
				if(Date.firstWeekDay === 0) { // sunday
					return firstDay;
				} else { // monday
					firstDay--;
					return (firstDay < 0) ? 6 : firstDay;
				}
			}

			function renderMonth(n) {
				var firstWeekdayOfMonth = calcDayOffset(n),
				totalDays = (new Date(nav.getFullYear(), n+1, 0)).getDate(), //0th day of next month
				cls, str = '<tr>';
				if(showWeeknbs) {
					str += '<td class="weeknb" ng-click="$parent.nav.setWeek('+d.getWeek()+')" ui-sref="calendar.week">'+d.getWeek()+'</td>';
				}
				for(var j = 0; j < firstWeekdayOfMonth; j++) {
					str += '<td>&nbsp;</td>';
				}
				for(var i = firstWeekdayOfMonth; i < totalDays+firstWeekdayOfMonth; i++) {
					if((i) % 7 === 0 && i !== 0) {
						str+='</tr><tr>';
						if(showWeeknbs) {
							str += '<td class="weeknb" ng-click="$parent.nav.setWeek('+d.getWeek()+')" ui-sref="calendar.week">'+d.getWeek()+'</td>';
						}
					}
					cls = (now.getYmd() === d.getYmd()) ? ' class="current"' : '';
					str += '<td'+cls+' ng-click="open(d)"><span>' + d.getDate()+'</span><div>';
					str += '<p ng-repeat="e in ::events[\'' + d.getYmd() + '\']" ng-style="color(calendars[e.calendarId])" title="{{::e.title}} - {{::e.$start.getTimeString()}}"></p></div></td>';
					d.setDate(d.getDate()+1);
				}
				return str+'</tr>';
			}

			function render(date) {
				nav = date;
				d = new Date(date.getFullYear(), 0, 1);
				element.html(renderYear());
				$compile(element.contents())(scope);
			};

			scope.$watchCollection('store.items', function (newStore) {
				console.log('all years items');
				scope.events = scope.store.itemsByDay();
			});

			scope.$watch('date.date', function(value) {
				if (value instanceof Date) {
					render(value);
				}
			},true);
		}
	};
}]);
