angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Send": "Send",
    "None": "None",
    "Archive all incoming": "Archive all incoming",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Incoming server",
    "Hostname": "Hostname",
    "Encryption": "Encryption",
    "Port": "Port",
    "Outgoing server": "Outgoing server",
    "E-mail address": "E-mail address",
    "Sender name": "Sender name",
    "Signatures": "Signatures",
    "createImapAccountText": "createImapAccountText",
    "Invalid e-mail address": "Invalid e-mail address"
}
				);
			}]);