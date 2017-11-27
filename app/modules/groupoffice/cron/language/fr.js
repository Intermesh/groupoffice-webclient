angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "Scheduled task": "T\u00e2che planifi\u00e9e",
    "Class name": "Nom de classe",
    "The class does not exist": "La classe n'existe pas",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "Nom de classe non valide, n'\u00e9largit pas IFW\\Donn\u00e9es\\Objet",
    "Method": "M\u00e9thode",
    "The method does not exist": "La m\u00e9thode n'existe pas",
    "Expression": "Expression",
    "Not a valid CRON expression": "Expression CRON non valide",
    "Time zone": "Fuseau horaire",
    "Not a valid time zone": "Fuseau horaire non valide",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Remarque: L'expression est calcul\u00e9e en heure UTC, veuillez tenir compte de votre fuseau horaire",
    "Scheduled tasks": "T\u00e2ches planifi\u00e9es",
    "Running": "En cours",
    "Run now": "Ex\u00e9cuter maintenant",
    "No scheduled tasks": "Pas de t\u00e2ches planifi\u00e9es",
    "Close": "Close",
    "Save": "Save",
    "Name": "Name",
    "This field is required": "This field is required",
    "Add": "Add"
}
				);
			}]);