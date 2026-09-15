import type { Language } from '@/types';

export const translations = {
  en: {
    // Header
    appName: 'Armenia Weather',
    appTagline: 'Multi-source weather verification for every settlement in Armenia',

    // Language switcher
    language: 'Language',
    english: 'English',
    armenian: 'Հայերեն',

    // Location selection
    selectLocation: 'Select location',
    region: 'Region',
    community: 'Community',
    settlement: 'Settlement',
    allRegions: 'All regions',
    allCommunities: 'All communities',
    allSettlements: 'All settlements',
    selectRegion: 'Select a region',
    selectCommunity: 'Select a community',
    selectSettlement: 'Select a settlement',

    // Search
    searchPlaceholder: 'Search for a city or village...',
    searchResults: 'Search results',
    noResults: 'No settlements found',
    settlementType: {
      city: 'City',
      town: 'Town',
      village: 'Village',
      community: 'Community',
    },

    // Weather card
    temperature: 'Temperature',
    feelsLike: 'Feels like',
    weatherCondition: 'Weather condition',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
    humidity: 'Humidity',
    pressure: 'Pressure',
    visibility: 'Visibility',
    precipitation: 'Precipitation',
    uvIndex: 'UV index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    lastUpdated: 'Last updated',
    localTime: 'Armenia local time (GMT+4)',
    loading: 'Loading weather data...',
    fetchingSources: 'Fetching data from multiple sources',

    // Confidence
    confidence: 'Confidence',
    confidenceLevel: 'Confidence level',
    highConfidence: 'High confidence',
    mediumConfidence: 'Medium confidence',
    lowConfidence: 'Low confidence',
    sourcesAgree: 'sources agree',
    sourcesResponded: 'sources responded',

    // Conflict
    dataInconsistent: 'Weather data is inconsistent',
    dataInconsistentDesc: 'The available sources do not provide sufficient agreement to determine a highly reliable final temperature.',
    dataAvailable: 'Weather result calculated from',
    availableSources: 'available sources',
    dataUnavailable: 'Reliable weather data is currently unavailable for this location.',

    // Sources
    viewAllSources: 'View all sources',
    hideSources: 'Hide sources',
    sourceName: 'Source',
    updated: 'updated',
    dataType: 'Data type',
    included: 'Included',
    excluded: 'Excluded',
    dataUnavailableSource: 'Data unavailable',
    noDirectObservation: 'No direct observation is available for this settlement. Weather data from the nearest available source/location is being used.',

    // Refresh
    checkAgain: 'Check Again',
    lastChecked: 'Last checked',
    refreshing: 'Checking...',

    // Map
    interactiveMap: 'Interactive map',
    selectedLocation: 'Selected location',

    // Explanation
    finalTemperature: 'Final temperature',
    explanation: 'Explanation',

    // Settlement info
    nearestData: 'Nearest data point',
    distanceFromLocation: 'from selected location',

    // Units
    celsius: '°C',
    kmh: 'km/h',
    percent: '%',
    hpa: 'hPa',
    meters: 'm',
    mm: 'mm',

    // Empty state
    selectLocationPrompt: 'Select or search for a settlement to see current weather conditions.',
    noLocationSelected: 'No location selected',

    // Error
    errorOccurred: 'An error occurred while fetching weather data. Please try again.',
    retry: 'Retry',
  },
  hy: {
    appName: 'Հայաստանի Եղանակ',
    appTagline: 'Բազմակողմ եղանակային տվյալների ստուգում Հայաստանի բոլոր բնակավայրերի համար',

    language: 'Լեզու',
    english: 'English',
    armenian: 'Հայերեն',

    selectLocation: 'Ընտրել բնակավայր',
    region: 'Մարզ',
    community: 'Համայնք',
    settlement: 'Բնակավայր',
    allRegions: 'Բոլոր մարզերը',
    allCommunities: 'Բոլոր համայնքները',
    allSettlements: 'Բոլոր բնակավայրերը',
    selectRegion: 'Ընտրեք մարզ',
    selectCommunity: 'Ընտրեք համայնք',
    selectSettlement: 'Ընտրեք բնակավայր',

    searchPlaceholder: 'Փնտրել քաղաք կամ գյուղ...',
    searchResults: 'Որոնման արդյունքներ',
    noResults: 'Բնակավայրեր չեն գտնվել',
    settlementType: {
      city: 'Քաղաք',
      town: 'Քաղաք',
      village: 'Գյուղ',
      community: 'Համայնք',
    },

    temperature: 'Ջերմաստիճան',
    feelsLike: 'Զգացվող',
    weatherCondition: 'Եղանակի վիճակ',
    windSpeed: 'Քամու արագություն',
    windDirection: 'Քամու ուղղություն',
    humidity: 'Խոնավություն',
    pressure: 'Մթնոլորտային ճնշում',
    visibility: 'Տեսանելիություն',
    precipitation: 'Տեղումներ',
    uvIndex: 'UV ինդեքս',
    sunrise: 'Արևածագ',
    sunset: 'Արևամուտ',
    lastUpdated: 'Վերջին թարմացում',
    localTime: 'Հայաստանի տեղական ժամանակ (GMT+4)',
    loading: 'Եղանակի տվյալների բեռնում...',
    fetchingSources: 'Տվյալների բեռնում բազմաթիվ աղբյուրներից',

    confidence: 'Վստահություն',
    confidenceLevel: 'Վստահության մակարդակ',
    highConfidence: 'Բարձր վստահություն',
    mediumConfidence: 'Միջին վստահություն',
    lowConfidence: 'Ցածր վստահություն',
    sourcesAgree: 'աղբյուր համաձայն են',
    sourcesResponded: 'աղբյուր արձագանքեց',

    dataInconsistent: 'Եղանակի տվյալները հակասական են',
    dataInconsistentDesc: 'Առկա աղբյուրները բավարար համաձայնություն չեն ցուցաբերում վերջնական ջերմաստիճանը բարձր հավաստիությամբ որոշելու համար։',
    dataAvailable: 'Եղանակի արդյունքը հաշվարկվել է',
    availableSources: 'առկա աղբյուրներից',
    dataUnavailable: 'Այս բնակավայրի համար հուսալի եղանակի տվյալներ այժմ հասանելի չեն։',

    viewAllSources: 'Բոլոր աղբյուրները',
    hideSources: 'Թաքցնել աղբյուրները',
    sourceName: 'Աղբյուր',
    updated: 'թարմացվել է',
    dataType: 'Տվյալների տիպ',
    included: 'Ներառված',
    excluded: 'Բացառված',
    dataUnavailableSource: 'Տվյալներ հասանելի չեն',
    noDirectObservation: 'Այս բնակավայրի համար ուղղակի դիտարկում հասանելի չէ: Օգտագործվում են ամենամոտ առկա աղբյուրի/վայրի եղանակի տվյալները։',

    checkAgain: 'Ստուգել կրկին',
    lastChecked: 'Վերջին ստուգում',
    refreshing: 'Ստուգում...',

    interactiveMap: 'Ինտերակտիվ քարտեզ',
    selectedLocation: 'Ընտրված բնակավայր',

    finalTemperature: 'Վերջնական ջերմաստիճան',
    explanation: 'Բացատրություն',

    nearestData: 'Ամենամոտ տվյալների կետ',
    distanceFromLocation: 'ընտրված բնակավայրից',

    celsius: '°C',
    kmh: 'կմ/ժ',
    percent: '%',
    hpa: 'հՊա',
    meters: 'մ',
    mm: 'մմ',

    selectLocationPrompt: 'Ընտրեք կամ որոնեք բնակավայր՝ ընթացիկ եղանակային պայմանները տեսնելու համար։',
    noLocationSelected: 'Բնակավայր չի ընտրվել',

    errorOccurred: 'Եղանակի տվյալները բեռնելիս սխալ տեղի ունեցավ: Խնդրում ենք կրկին փորձել։',
    retry: 'Կրկին փորձել',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TranslationDict = typeof translations.en;

export function getTranslations(lang: Language): TranslationDict {
  return translations[lang];
}
