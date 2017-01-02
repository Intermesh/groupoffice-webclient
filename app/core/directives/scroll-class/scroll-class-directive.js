/**
 * @ngdoc directive
 * @name GO.Core.goScrollClass
 * @element ANY
 *
 * @description
 * Add's a class called "scrolled" to the element when a the nearest "md-content" element
 * scrolls down.
 *
 * @example 
 * <md-toolbar class="md-hue-1" go-scroll-class>
 * </md-toolbar>
 * <md-content></md-content>
 */
angular.module('GO.Core')
				.directive('goScrollClass', [ function () {
						
						return {
							restrict: 'A',
							link: function (scope, element, attrs) {
								var nextMdContent = element.parent().find('md-content');
								
								element.addClass('go-scroll');
								
								//Difference in height when the class scrolled is added
								var diffHeight = 100;
							
								
								nextMdContent.on('scroll', function() {
									if(!element.hasClass('scrolled') && nextMdContent[0].scrollTop > 10 && nextMdContent[0].scrollHeight > nextMdContent[0].clientHeight + diffHeight) {
										element.addClass('scrolled');
									}
									
									if(element.hasClass('scrolled') && nextMdContent[0].scrollTop < 10) 
									{
										element.removeClass('scrolled');
									}
								});
							}
						};
						
}]);

