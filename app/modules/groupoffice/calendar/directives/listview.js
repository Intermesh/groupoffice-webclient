'use strict';

angular.module('GO.Modules.GroupOffice.Calendar').directive('goListview', ['$compile', '$window',
	function ($compile, $window) {
		return {
			restrict: 'E',
			scope: {
				store: "=",
				date: "=",
				calendars: "="
			},
			controller: [
				'$scope',
				function ($scope) {
					var self = this;
					$scope.items = { length: 400 }; // fake months
					self.offset = null;
					$scope.firstRenderableDate = new Date(+$scope.date.date);
					$scope.firstRenderableDate.addMonths(-$scope.items.length / 2);

					function getMonthDistance(start, end) {
						return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
					}

					this.getSelectedMonthIndex = function() {
						self.offset = getMonthDistance($scope.firstRenderableDate, $scope.date.date);
						return self.offset;
					};
					$scope.getSelectedMonthIndex = this.getSelectedMonthIndex;
					
					$scope.$watchCollection('store', function (newStore) {
						self.events = newStore.itemsByDay();
					});

				}
			],
			link: function(scope) {
				
			},
			template: '<md-virtual-repeat-container md-offset-size="-200">'+
				'<table tabindex="0" aria-readonly="true" width="100%">'+
				  '<tbody '+
					'calendars="calendars" ' +
					  'go-listview-body ' +
					  'md-virtual-repeat="i in items" '+
					  'offset="$index" '+
					  'md-start-index="getSelectedMonthIndex()" '+
					  '></tbody>'+
				'</table>'+
			  '</md-virtual-repeat-container>'
		};
	}
]);
angular.module('GO.Modules.GroupOffice.Calendar').directive('goListviewBody',['$compile', '$state',function($compile, $state) {
	return {
		require: ['^^goListview','goListviewBody'],
		scope: { offset: '=', calendars: '=' },
		controller: ['$scope',function($scope) {
			$scope.color= function(cal) {return cal && GO.Calendar.util.color(cal.color);};
			$scope.selectEvent = function (event) {
				$state.go("calendar.list.event", {eventId: event.eventId, calendarId:event.calendarId});
			};
			$scope.classFor = function(event) {
				var cls = [event.event.tag];
				if(event.responseStatus == 1) {
					cls.push('new');
				}
				return cls;
			};
		}],
		link: function(scope, element, attrs, controllers, transcludeFn) {
			var d,fr = scope.$parent.firstRenderableDate,
				now = new Date();
			now.setHours(0,0,0,0);

			scope.listCtrl = controllers[0];

			function render() {
				d =	new Date(fr.getFullYear(), fr.getMonth(), fr.getDate(), 1, 0, 0);
				d.addMonths(scope.offset);
				element.empty();
				element.html('<tr><th class="bd m'+(d.getMonth()+1)+'">'+Date.months[d.getMonth()]+ ' ' +d.getFullYear()+'</th></tr>'+renderWeeks());
				$compile(element.contents())(scope);
			}

			function renderWeeks() {
				var str = '', month = d.getMonth();
				d.setDate(1);
				while (d.getDay() !== 1) { // FF to monday
					d.setDate(d.getDate() + 1);
				}
				// Get all the other Mondays in the month
				while (d.getMonth() === month) {
					str += '<tr><td class="week">Week '+d.getWeek()+', '+d.getDate()+ ' '+Date.months[d.getMonth()].substring(0,3)+ ' &ndash; </td></tr><tr><td>';
					while (d.getDay() !== 1) {
						str += renderDay();
						d.setDate(d.getDate() + 1);
					}
					str += '</td></tr>';
					d.setDate(d.getDate() + 1);
				}
				return str;
			}
			function renderDay() {
				var cls = (now > d) ? ' class="past"' : (+now === +d) ? ' class="current"' : '',
					nowBar = (+now === +d) ? '<hr class="now" />' : '';
				var str = '<time'+cls+' ng-if="events[\'' + d.getYmd() + '\'].length > 0"><h4>'+ d.getDate() +'<small>' + Date.days[d.getDay()].substring(0,3) +'</small></h4></time>\
					<div ng-repeat="e in events[\'' + d.getYmd() + '\']" ng-class="classFor(e)" ng-click="selectEvent(e)" ng-style="color(calendars[e.calendarId])" >\
					<md-icon ng-if="e.event.isRecurring">refresh</md-icon> {{e.event.title}}<br>\
				<span ng-if="!e.event.allDay">{{e.event.startAt.getTimeString()}} &mdash; {{e.event.endAt.getTimeString()}}</span>\n\
				<span ng-if="e.event.location">at {{e.event.location}}</span></div>'+nowBar;
				return str;
			}
			
			render();
			scope.$watch(function() { return scope.listCtrl.events; }, function(events) {
				scope.events = events;
			});

			scope.$watch(function() { return scope.offset; }, function(offset, oldOffset) {
console.log(offset);
				if (offset != oldOffset) {
				  render();
				}
			});
		}
	};

}]);