angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "Send": "K\u00fcld\u00e9s",
    "None": "Nincs",
    "Archive all incoming": "\u00d6sszes bej\u00f6v\u0151 archiv\u00e1l\u00e1sa",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Bej\u00f6v\u0151 szerver",
    "Hostname": "Hostn\u00e9v",
    "Encryption": "Titkos\u00edt\u00e1s",
    "Port": "Port",
    "Outgoing server": "Kimen\u0151 szerver",
    "E-mail address": "E-mail c\u00edm",
    "Sender name": "K\u00fcld\u0151 neve",
    "Signatures": "Al\u00e1\u00edr\u00e1sok",
    "Invalid e-mail address": "\u00c9rv\u00e9nytelen e-mail c\u00edm.",
    "Could not connect to server": "Nem siker\u00fclt kapcsol\u00f3dni a szerverhez",
    "SMTP account": "SMTP fi\u00f3k",
    "Authentication failed": "Authentication failed"
}
				);
			}]);