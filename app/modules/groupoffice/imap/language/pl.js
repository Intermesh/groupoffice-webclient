angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "Send": "Wy\u015blij",
    "None": "Brak",
    "Archive all incoming": "Archiwizuj wszystkie przychodz\u0105ce elementy",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Serwer przychodz\u0105cy",
    "Hostname": "Nazwa hosta",
    "Encryption": "Szyfrowanie",
    "Port": "Brama",
    "Outgoing server": "Serwer wychodz\u0105cy",
    "E-mail address": "Adres e-mail",
    "Sender name": "Nazwa nadawcy",
    "Signatures": "Podpisy",
    "Invalid e-mail address": "Nieprawid\u0142owy adres e-mail",
    "Could not connect to server": "Could not connect to server",
    "SMTP account": "SMTP account"
}
				);
			}]);