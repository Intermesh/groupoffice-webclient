angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "GO\\Core\\Cron\\Model\\Job": "Zadanie systemowe",
    "Group management": "Zarz\u0105dzanie grupami",
    "User management": "Zarz\u0105dzanie kontami u\u017cytkownik\u00f3w",
    "Custom fields": "Pola dodatkowe",
    "Announcements": "Wiadomo\u015bci",
    "Yes": "Tak",
    "No": "Nie",
    "Edit": "Edytuj",
    "Continue": "Kontynuuj",
    "Delete": "Usu\u0144",
    "Cancel": "Anuluj",
    "Save": "Zapisz",
    "Back": "Powr\u00f3t",
    "OK": "OK",
    "Search": "Szukaj",
    "Login": "Logowanie",
    "Username": "Nazwa u\u017cytkownika",
    "Password": "Has\u0142o",
    "Login to GroupOffice": "Zaloguj do GroupOffice",
    "Access denied": "Brak dost\u0119pu",
    "Are you sure you want to delete '{name}'?": "Czy na pewno chcesz usun\u0105\u0107 \u201e{name}\u201d?",
    "Share": "Podziel si\u0119",
    "Group": "Grupa",
    "Loading...": "Trwa \u0142adowanie...",
    "Remember my login": "Zapami\u0119taj logowanie",
    "Field set": "Grupa p\u00f3l",
    "Name": "Imi\u0119 i nazwisko",
    "Model": "Wz\u00f3r",
    "Fields": "Pola",
    "Field": "Pole",
    "Type": "Typ",
    "Database name": "Nazwa bazy danych",
    "Default value": "Warto\u015b\u0107 standardowa",
    "Placeholder": "Symbol zast\u0119pczy",
    "Field is required": "Pole wymagane",
    "Field can be filtered on": "W tym polu dozwolone jest filtrowanie",
    "Max length": "Maks. d\u0142ugo\u015b\u0107",
    "Height": "Wysoko\u015b\u0107",
    "Select options": "Opcje menu wyboru",
    "Field sets": "Grupy p\u00f3l",
    "Properties": "W\u0142a\u015bciwo\u015bci",
    "Enabled": "W\u0142\u0105czono",
    "E-mail": "E-mail",
    "Confirm password": "Potwierd\u017a has\u0142o",
    "Groups": "Grupy",
    "No groups selected": "Nie wybrano grup",
    "View profile": "Zobacz profil",
    "Created at": "Sporz\u0105dzono dnia",
    "Modified at": "Zmieniono dnia",
    "Select groups": "Wybierz grupy",
    "Date": "Data",
    "To": "Do",
    "by": "przez",
    "No items found": "Nie znaleziono element\u00f3w",
    "New post": "Nowa wiadomo\u015b\u0107",
    "Title": "Tytu\u0142",
    "Group name": "Nazwa grupy",
    "Grant permission to new items automatically": "Automatycznie nadaj prawa tej grupie podczas tworzenia nowych element\u00f3w",
    "Enabled modules": "W\u0142\u0105czone modu\u0142y",
    "Use access": "Uprawnienia u\u017cytkownika",
    "Create access": "Utw\u00f3rz prawa",
    "Users in group": "U\u017cytkownicy w grupie",
    "No users selected": "Nie wybrano u\u017cytkownik\u00f3w",
    "Route": "Trasa",
    "GET Parameters": "Parametry GET",
    "Add parameter": "Dodaj parametr",
    "Restore": "Ustaw ponownie",
    "Content": "Spis tre\u015bci",
    "Add todo item": "Dodaj zadanie",
    "Done": "Gotowe",
    "Close": "Zamknij",
    "Filters": "Filtry",
    "Reset": "Reset",
    "Pin": "Pin",
    "Gender": "P\u0142e\u0107",
    "Tags": "Tagi",
    "Enter tags...": "Wprowad\u017a tagi...",
    "Add files": "Dodaj pliki",
    "Rename": "Nazwij ponownie",
    "Phone numbers": "Numery telefonu",
    "Company": "Firma",
    "yr": "r.",
    "Address": "Adres",
    "Employees": "Pracownicy",
    "Notes": "Notatki",
    "Files": "Pliki",
    "Comments": "Uwagi",
    "Projects": "Projekty",
    "Contracts": "Umowy",
    "Invoices": "Faktury",
    "Quotes": "Oferty",
    "at": "dnia",
    "Open": "Otwarte",
    "Unknown": "Nieznany",
    "Male": "M\u0119\u017cczyzna",
    "Female": "Kobieta",
    "Special dates": "Specjalne daty",
    "Add special date": "Dodaj dat\u0119",
    "Add e-mail address": "Dodaj adres e-mail",
    "Phone": "Telefon",
    "Add phone number": "Dodaj numer telefonu",
    "Add tags...": "Dodaj tagi...",
    "Create new company": "Utw\u00f3rz firm\u0119",
    "Addresses": "Adresy",
    "Street address": "Adres",
    "Zip code": "Kod pocztowy",
    "City": "Miejscowo\u015b\u0107",
    "State \/ Province \/ Region": "Stan \/ Prowincja \/ Region",
    "Country": "Kraj",
    "Add address": "Dodaj adres",
    "New Comment": "Nowa wiadomo\u015b\u0107",
    "Timeline": "Linia czasu",
    "This name is already taken": "Ta nazwa jest ju\u017c u\u017cywana",
    "This field is required": "To pole jest obowi\u0105zkowe",
    "The password is not strong enough.": "Has\u0142o jest zbyt s\u0142abe",
    "It must be at least {minLength} characters long.": "Musi mie\u0107 d\u0142ugo\u015b\u0107 co najmniej {minLength} znak\u00f3w.",
    "It must be at least {minUniqueChars} unique characters.": "Musi zawiera\u0107 co najmniej {minUniqueChars} niepowtarzalnych znak\u00f3w.",
    "It must have an uppercase character.": "Musi zawiera\u0107 du\u017c\u0105 liter\u0119.",
    "It must have a lowercase character.": "Musi zawiera\u0107 ma\u0142\u0105 liter\u0119.",
    "It must have a number in it.": "Musi zawiera\u0107 numer.",
    "The e-mail address is invalid": "Adres e-mail jest nieprawid\u0142owy",
    "Disabled": "Wy\u0142\u0105czono",
    "Checked": "Zaznaczono",
    "UnChecked": "Odznaczono",
    "Login failed": "Logowanie nie powiod\u0142o si\u0119",
    "Work": "Praca",
    "Home": "Dom",
    "Billing": "Fakturowanie",
    "Other": "Inne",
    "Mobile": "Telefon kom\u00f3rkowy",
    "Birthday": "Urodziny",
    "Anniversary": "Jubileusz",
    "The form contains errors. Please check your input.": "Formularz zawiera b\u0142\u0119dy. Sprawd\u017a sw\u00f3j wpis",
    "Age": "Wiek",
    "Your changes have been saved": "Twoje zmiany zosta\u0142y zapisane",
    "Your password has been changed": "Twoje has\u0142o uleg\u0142o zmianie",
    "You entered an incorrect username or password": "Wprowadzono nieprawid\u0142ow\u0105 nazw\u0119 u\u017cytkownika lub has\u0142o",
    "Please wait": "Prosz\u0119 czeka\u0107",
    "Number of logins": "Liczba logowa\u0144",
    "Last login": "Ostatnie logowanie",
    "January": "Stycze\u0144",
    "February": "Luty",
    "March": "Marzec",
    "April": "Kwiecie\u0144",
    "May": "Maj",
    "June": "Czerwiec",
    "July": "Lipiec",
    "August": "Sierpie\u0144",
    "September": "Wrzesie\u0144",
    "October": "Pa\u017adziernik",
    "November": "Listopad",
    "December": "Grudzie\u0144",
    "Monday": "Poniedzia\u0142ek",
    "Tuesday": "Wtorek",
    "Wednesday": "\u015aroda",
    "Thursday": "Czwartek",
    "Friday": "Pi\u0105tek",
    "Saturday": "Sobota",
    "Sunday": "Niedziela",
    "Intermesh\\Modules\\Contacts\\Model\\Contact": "Osoba do kontaktu",
    "Add": "Dodaj",
    "Drag to reorder": "Przenie\u015b, aby sortowa\u0107",
    "Sort": "Sortuj",
    "Ascending": "Rosn\u0105co",
    "Descending": "Malej\u0105co",
    "Description": "Opis",
    "Undo delete": "Anuluj usuwanie",
    "Language": "J\u0119zyk",
    "Info": "Info",
    "Email": "E-mail",
    "Amount": "Kwota",
    "Quantity": "Liczba",
    "Save changes": "Zapisz zmiany",
    "Do you want to save your changes?": "Czy chcesz zapisa\u0107 zmiany?",
    "Discard": "Anuluj",
    "A stupid question": "G\u0142upie pytanie",
    "Do you really want to edit this contact?": "Czy na pewno chcesz edytowa\u0107 t\u0119 umow\u0119?",
    "No, take me away!": "Nie, zabierz mnie st\u0105d!",
    "Saved successfully": "Pomy\u015blnie zapisano",
    "Years": "Lata",
    "Months": "Miesi\u0105ce",
    "Weeks": "Tygodnie",
    "Days": "Dni",
    "Hours": "Godziny",
    "Minutes": "Minuty",
    "Seconds": "Sekundy",
    "Failed to save file": "Zapisanie nie powid\u0142o si\u0119",
    "Read less ...": "Poka\u017c mniej...",
    "Year": "Rok",
    "Month": "Miesi\u0105c",
    "Week": "Tydzie\u0144",
    "Day": "Dzie\u0144",
    "Hour": "Godzina",
    "Minute": "Minuta",
    "Second": "Sekunda",
    "Remove": "Usu\u0144",
    "Select file": "Wybierz plik",
    "More options": "Wi\u0119cej opcji",
    "Set new image": "Ustaw nowy obraz",
    "Hold the Ctrl key to launch in a new browser tab": "Trzymaj przycisk Ctrl wci\u015bni\u0119ty, aby otworzy\u0107 w nowej zak\u0142adce przegl\u0105darki",
    "No files found": "Nie znaleziono plik\u00f3w",
    "Add file": "Dodaj plik",
    "Refresh": "Od\u015bwie\u017c",
    "All years": "Wszystkie lata",
    "All months": "Wszystkie miesi\u0105ce",
    "All": "Wszystko",
    "Open side navigation": "Otw\u00f3rz pasek nawigacji",
    "PDF template": "Szablon PDF",
    "Margins": "Mar\u017ce",
    "Top": "G\u00f3ra",
    "Right": "Prawo",
    "Bottom": "D\u00f3\u0142",
    "Left": "Lewo",
    "Layout": "Uk\u0142ad",
    "Page size": "Wielko\u015b\u0107 strony",
    "Measure unit": "Jednostka miary",
    "Landscape": "Poziomo",
    "Blocks": "Bloki",
    "Data": "Dane",
    "Stationary PDF": "Papier listowy PDF",
    "PDF templates": "Szablony PDF",
    "No PDF templates set": "Nie ustawiono szablon\u00f3w PDF",
    "Add comment": "Dodaj uwag\u0119",
    "Attach file": "Za\u0142\u0105cz plik",
    "E-mail template": "Szablon e-mail",
    "Subject": "Temat",
    "E-mail templates": "Szablony e-mail",
    "No e-mail templates set": "Nie ustawiono szablon\u00f3w PDF",
    "Preview": "Podgl\u0105d",
    "By default all blocks are drawn one by one, width is 100% and height is automatic. If you need an absolute position you can set the position and dimensions.": "Standardowo podpisuje si\u0119 kolejno wszystkie bloki. Szeroko\u015b\u0107 wynosi 100%, a wysoko\u015b\u0107 jest okre\u015blana automatycznie. Je\u015bli co\u015b koniecznie trzeba ustawi\u0107, mo\u017cesz wprowadzi\u0107 pozycj\u0119 i wymiary.",
    "Positioning": "Pozycjonowanie",
    "X": "X",
    "Y": "Y",
    "Dimensions": "Wymiary",
    "Width": "Szeroko\u015b\u0107",
    "Add groups to share": "Dodaj grupy do udost\u0119pnienia",
    "Copy": "Kopiuj",
    "Add filter": "Dodaj filtr",
    "Comparator": "Por\u00f3wnywarka",
    "Equals": "Jest r\u00f3wny z",
    "Doesn't equal": "Nie jest r\u00f3wny z",
    "Greather than": "Wi\u0119kszy od",
    "Lower than": "Mniejszy od",
    "By default all blocks are drawn one by one  width is 100% and height is automatic. If you need an absolute position you can set the position and dimensions.": "Standardowo podpisuje si\u0119 kolejno wszystkie bloki. Szeroko\u015b\u0107 wynosi 100%, a wysoko\u015b\u0107 jest okre\u015blana automatycznie. Je\u015bli co\u015b koniecznie trzeba ustawi\u0107, mo\u017cesz wprowadzi\u0107 pozycj\u0119 i wymiary.",
    "Please enter your username and password": "Wprowad\u017a nazw\u0119 u\u017cytkownika i has\u0142o",
    "Forgot password?": "Nie pami\u0119tasz has\u0142a?",
    "Reset your password": "Ustaw ponownie has\u0142o",
    "Please enter your registered e-mail address to receive a link to reset your password.": "Wprowad\u017a sw\u00f3j zarejestrowany adres e-mail, aby otrzyma\u0107 link do ponownego ustawienia has\u0142a.",
    "Dear {{user.username}},\n\nWe received a request to reset your {title} password. To reset your password, click on the link below (or copy and paste the URL into your browser).\n\n{link}\n\nIf you didn't make this request yourself, ignore this e-mail and contact your administrator.": "Witaj {{user.username}},\n\notrzymali\u015bmy pro\u015bb\u0119 o ponowne ustawienie Twojego {title} has\u0142a. Kliknij poni\u017cszy link (lub skopiuj go do paska adresu przegl\u0105darki): {link}\n\nJe\u015bli ta pro\u015bba nie by\u0142a z\u0142o\u017cona przez Ciebie, zignoruj t\u0119 wiadomo\u015b\u0107 e-mail i powiadom o tym administratora systemu.",
    "The e-mail was sent to {email}.": "E-mail zosta\u0142 wys\u0142any na adres {email}.",
    "An error occured": "Wyst\u0105pi\u0142 b\u0142\u0105d",
    "Please create a new password": "Utw\u00f3rz nowe has\u0142o",
    "Your password has been reset. Continue to the login screen.": "Twoje has\u0142o ustawiono ponownie. Przejd\u017a do ekranu logowania.",
    "Owner": "W\u0142a\u015bciciel",
    "Search phrase": "Wyszukiwany termin",
    "Like": "Like"
}
				);
			}]);