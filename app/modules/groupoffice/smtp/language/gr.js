angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("gr", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "\u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7 email",
    "Sender name": "\u038c\u03bd\u03bf\u03bc\u03b1 \u03b1\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ad\u03b1",
    "Hostname": "\u038c\u03bd\u03bf\u03bc\u03b1 \u03ba\u03b5\u03bd\u03c4\u03c1\u03b9\u03ba\u03bf\u03cd \u03c5\u03c0\u03bf\u03bb\u03bf\u03b3\u03b9\u03c3\u03c4\u03ae",
    "Encryption": "\u039a\u03c1\u03c5\u03c0\u03c4\u03bf\u03b3\u03c1\u03ac\u03c6\u03b7\u03c3\u03b7",
    "None": "\u039a\u03b1\u03bd\u03ad\u03bd\u03b1",
    "Port": "\u0398\u03cd\u03c1\u03b1"
}
				);
			}]);