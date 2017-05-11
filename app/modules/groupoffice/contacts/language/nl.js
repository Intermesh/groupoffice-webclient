angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Contacts": "Contactpersonen",
    "GO\\Modules\\GroupOffice\\Contacts\\Module": "Contactpersonen",
		"GO\\Modules\\GroupOffice\\Contacts\\Model\\Account": 'GroupOffice Contactpersonen',
    "First name": "Voornaam",
    "Middle name": "Tussenvoegsel",
    "Last name": "Achternaam",
    "Organization": "Organisatie",
    "Organizations": "Organisaties",
    "E-mail addresses": "E-mail adressen",
    "Dates": "Data",
    "No contacts found": "Geen contacten gevonden",
    "Contact": "Contacten",
    "Edit profile": "Profiel bewerken",
    "Activities": "Activiteiten",
    "No activities found": "Geen activiteiten gevonden",
    "Street": "Straat",
    "ZIP Code": "Postcode",
    "State": "Staat",
    "Add date": "Datum toevoegen",
    "Gender unknown": "Geslacht onbekend",
    "Private": "Priv\u00e9",
    "Share with group": "Deel met groep",
    "Persons": "Personen",
    "Edit selection": "Bewerk selectie",
    "Write": "Schrijf",
    "Download": "Download",
    "Import": "Importeer",
    "Debtor number": "Nummer debiteur",
    "Chamber of Commerce": "Kamer van Koophandel",
    "IBAN": "IBAN",
    "Business details": "Bedrijfsdetails",
    "URL's": "URL's"
}
				);
			}]);