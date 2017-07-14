angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "Send": "Trimite",
    "None": "Niciunul",
    "Archive all incoming": "Arhiva\u0163i tot ce intr\u0103",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Server intrare",
    "Hostname": "Nume host",
    "Encryption": "Criptare",
    "Port": "Port",
    "Outgoing server": "Server ie\u015fire",
    "E-mail address": "Adres\u0103 de e-mail",
    "Sender name": "Nume expeditor",
    "Signatures": "Semn\u0103turi",
    "Invalid e-mail address": "Adres\u0103 de e-mail nevalabil\u0103",
    "Could not connect to server": "Nu s-a putut conecta la server",
    "SMTP account": "Cont SMTP"
}
				);
			}]);