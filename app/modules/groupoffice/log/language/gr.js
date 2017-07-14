angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("gr", 
					{
    "Log": "\u0391\u03c1\u03c7\u03b5\u03af\u03bf \u03ba\u03b1\u03c4\u03b1\u03b3\u03c1\u03b1\u03c6\u03ae\u03c2",
    "Time": "\u03a7\u03c1\u03cc\u03bd\u03bf\u03c2",
    "Action": "\u0395\u03bd\u03ad\u03c1\u03b3\u03b5\u03b9\u03b1",
    "Record": "\u039a\u03b1\u03c4\u03b1\u03b3\u03c1\u03b1\u03c6\u03ae",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "X\u03c1\u03ae\u03c3\u03c4\u03b7\u03c2"
}
				);
			}]);