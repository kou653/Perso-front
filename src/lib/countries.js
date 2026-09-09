/**
 * Liste des pays avec leurs indicatifs téléphoniques, drapeaux et formats indicatifs,
 * classés par ordre alphabétique.
 */
const rawCountries = [
  { code: 'ZA', name: 'Afrique du Sud', dialCode: '+27', flag: '🇿🇦', placeholder: '71 123 4567' },
  { code: 'DZ', name: 'Algérie', dialCode: '+213', flag: '🇩🇿', placeholder: '5 12 34 56 78' },
  { code: 'DE', name: 'Allemagne', dialCode: '+49', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: 'BE', name: 'Belgique', dialCode: '+32', flag: '🇧🇪', placeholder: '470 12 34 56' },
  { code: 'BJ', name: 'Bénin', dialCode: '+229', flag: '🇧🇯', placeholder: '97 12 34 56' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫', placeholder: '70 12 34 56' },
  { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮', placeholder: '79 12 34 56' },
  { code: 'CM', name: 'Cameroun', dialCode: '+237', flag: '🇨🇲', placeholder: '6 12 34 56 78' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '514 123-4567' },
  { code: 'CF', name: 'Centrafrique', dialCode: '+236', flag: '🇨🇫', placeholder: '70 12 34 56' },
  { code: 'KM', name: 'Comores', dialCode: '+269', flag: '🇰🇲', placeholder: '321 23 45' },
  { code: 'CG', name: 'Congo-Brazzaville', dialCode: '+242', flag: '🇨🇬', placeholder: '06 123 4567' },
  { code: 'CI', name: "Côte d'Ivoire", dialCode: '+225', flag: '🇨🇮', placeholder: '07 12 34 56 78' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯', placeholder: '77 12 34 56' },
  { code: 'ES', name: 'Espagne', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: 'US', name: 'États-Unis', dialCode: '+1', flag: '🇺🇸', placeholder: '202 555-0123' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: 'GA', name: 'Gabon', dialCode: '+241', flag: '🇬🇦', placeholder: '06 12 34 56' },
  { code: 'GN', name: 'Guinée', dialCode: '+224', flag: '🇬🇳', placeholder: '620 12 34 56' },
  { code: 'GQ', name: 'Guinée Équatoriale', dialCode: '+240', flag: '🇬🇶', placeholder: '222 12 34 56' },
  { code: 'HT', name: 'Haïti', dialCode: '+509', flag: '🇭🇹', placeholder: '34 12 3456' },
  { code: 'IT', name: 'Italie', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', placeholder: '621 123 456' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬', placeholder: '32 12 345 67' },
  { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱', placeholder: '70 12 34 56' },
  { code: 'MA', name: 'Maroc', dialCode: '+212', flag: '🇲🇦', placeholder: '6 12 34 56 78' },
  { code: 'MU', name: 'Maurice', dialCode: '+230', flag: '🇲🇺', placeholder: '5123 4567' },
  { code: 'MR', name: 'Mauritanie', dialCode: '+222', flag: '🇲🇷', placeholder: '22 12 34 56' },
  { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪', placeholder: '90 12 34 56' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', placeholder: '912 345 678' },
  { code: 'CD', name: 'RDC (Congo-Kinshasa)', dialCode: '+243', flag: '🇨🇩', placeholder: '81 234 5678' },
  { code: 'GB', name: 'Royaume-Uni', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼', placeholder: '788 123 456' },
  { code: 'SN', name: 'Sénégal', dialCode: '+221', flag: '🇸🇳', placeholder: '77 123 45 67' },
  { code: 'CH', name: 'Suisse', dialCode: '+41', flag: '🇨🇭', placeholder: '79 123 45 67' },
  { code: 'TD', name: 'Tchad', dialCode: '+235', flag: '🇹🇩', placeholder: '66 12 34 56' },
  { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬', placeholder: '90 12 34 56' },
  { code: 'TN', name: 'Tunisie', dialCode: '+216', flag: '🇹🇳', placeholder: '98 123 456' },
];

export const COUNTRIES = [...rawCountries].sort((a, b) => a.name.localeCompare(b.name, 'fr'));

export const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'FR') || COUNTRIES[0];
