import { createStore } from 'solid-js/store';

export enum StepTransitions {
    // general
    SetupComplete = 'SetupComplete',
    ForgotPassword = 'ForgotPassword',
    ResetPassword = 'ResetPassword',
    VerifyAccount = 'ClientVerifyAccount',
    // clients
    ClientLanding = 'ClientLanding',
    ClientCreateAccount = 'ClientCreateAccount',
    ClientWelcomeBack = 'ClientWelcomeBack',
    // artisans
    ArtisanCreateAccount = 'ArtisanCreateAccount',
    ArtisanSkillsNTitle = 'ArtisanSkillsNTitle',
    ArtisanLocationNAvailability = 'ArtisanLocationNAvailability',
    ArtisanSelfDescription = 'ArtisanSelfDescription',
    ArtisanVerificationNTrust = 'ArtisanVerificationNTrust',
}

export type StepTransitionType =
    // clients
    | StepTransitions.ClientLanding
    | StepTransitions.ClientCreateAccount
    | StepTransitions.ClientWelcomeBack
    // general
    | StepTransitions.SetupComplete
    | StepTransitions.ForgotPassword
    | StepTransitions.ResetPassword
    | StepTransitions.VerifyAccount
    // artisans
    | StepTransitions.ArtisanCreateAccount
    | StepTransitions.ArtisanSkillsNTitle
    | StepTransitions.ArtisanLocationNAvailability
    | StepTransitions.ArtisanSelfDescription
    | StepTransitions.ArtisanVerificationNTrust;

export enum AccountEnum {
    Provider = 'Provider',
    Client = 'Client',
}

export type AccountType = AccountEnum.Provider | AccountEnum.Client;
type AvailabilityType =
    | 'Full-time'
    | 'Part-time'
    | 'Evenings/Weekends'
    | 'Emergency calls'
    | 'Project-based';

interface LanguageType {
    language: string;
    id: number; // Unique identifier for keying and deletion
    isRemovable: boolean;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native' | string;
}

export type LoginStore = {
    // 1. ⚙️ Flow & State Management Attributes
    activeProfile: AccountType;
    currentStep: StepTransitionType;
    updatingPassword: boolean; // Flag used during ResetPassword / ForgotPassword
    // 2. 🔐 General Account/Verification Data
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;

    verificationCode: string; // Used for OTPCard
    resetToken: string | null; // Token received for password reset
    acceptedTerms: boolean;
    // 3. 👤 Client/Login Specific Data
    clientName: string;
    // 4. 🎨 Artisan/Signup Specific Data
    title: string;
    description: string;
    languages: LanguageType[];
    address: string;
    skills: string[];
    yearsOfExperience: string;
    location: string;
    availabilities: AvailabilityType[];
    profileImage: File | null;
    idDocument: File | null;
    countryCallingCode: string;
    phoneNumber: string;
    // 5. 🛠️ Store Methods (Updated for clarity)

    /**
     * Updates a single attribute in the store (e.g., email, clientName).
     * @param key The key of the attribute to update.
     * @param value The new value for the attribute.
     */
    updateStore: (
        key: keyof Omit<
            LoginStore,
            | 'updateStore'
            | 'setCurrentStep'
            | 'setActiveProfile'
            | 'handleTransition'
        >,
        value: any
    ) => void;

    /**
     * Changes the current step, triggering the component transition in the <Switch>.
     * This is the core method for flow control.
     * @param step The new StepTransitionType to navigate to.
     */
    setCurrentStep: (step: StepTransitionType) => void;

    /**
     * Initializes the account type for the flow.
     * @param type The ActiveProfile ('Client' or 'Provider').
     */
    setActiveProfile: (type: AccountType) => void;

    // /**
    //  * Handles complex transitions or API calls that result in a step change.
    //  * The implementation would decide the next step based on the current state.
    //  * @param action A string or enum describing the action (e.g., 'SUBMIT_LOGIN', 'NEXT_SIGNUP_STEP').
    //  */
    // handleTransition: (action: string) => void;
};

export const createLoginStore = () => {
    // 1. Initial State Definition (Same as yours)
    const initialStoreState = {
        // --- Flow & State Management ---
        activeProfile: AccountEnum.Client as AccountType,
        currentStep: StepTransitions.ClientLanding as StepTransitionType,
        updatingPassword: false,

        // personal info
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
        email: '',
        verificationCode: '',
        resetToken: null as string | null,

        // --- Client/Login Data ---
        clientName: '',

        // --- Artisan/Signup Data ---
        address: '',
        title: '',
        description: '',
        languages: [
            {
                id: Date.now(),
                language: 'English',
                proficiency: 'Native',
                isRemovable: false,
            },
        ],
        skills: [],
        yearsOfExperience: 'Years of experience',
        location: '',
        availabilities: [] as AvailabilityType[],
        profileImage: null,
        idDocument: null,
        countryCallingCode: '+1',
        phoneNumber: '',

        setCurrentStep: (step: StepTransitionType) => {
            setStore('currentStep', step);
        },

        updateStore: (key: string, value: any) => {
            setStore((state) => ({ ...state, [key]: value }));
        },

        setActiveProfile: (type: AccountType) => {
            setStore((state) => ({ ...state, activeProfile: type }));
        },
    };

    // 2. Create the reactive store
    const [store, setStore] = createStore<LoginStore>(initialStoreState);

    // 4. Return the complete LoginStore object
    return store;
};

export interface NominatimAddress {
    office?: string;
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    'ISO3166-2-lvl4'?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
}

export interface LocationSearchResult {
    place_id: number;
    licence: string;
    osm_type: 'node' | 'way' | 'relation';
    osm_id: number;
    // Coordinates are often returned as strings in API responses
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name?: string; // May be null or missing for generic locations
    display_name: string;
    address: NominatimAddress;
    // Bounding box contains four string coordinates
    boundingbox: [string, string, string, string];
    geokml?: string;
}

export const COUNTRIES = [
    {
        country: 'United States',
        dialCode: '+1',
        flag: '🇺🇸',
    },
    {
        country: 'Canada',
        dialCode: '+1',
        flag: '🇨🇦',
    },
    {
        country: 'Bahamas',
        dialCode: '+1-242',
        flag: '🇧🇸',
    },
    {
        country: 'Barbados',
        dialCode: '+1-246',
        flag: '🇧🇧',
    },
    {
        country: 'Anguilla',
        dialCode: '+1-264',
        flag: '🇦🇮',
    },
    {
        country: 'Antigua and Barbuda',
        dialCode: '+1-268',
        flag: '🇦🇬',
    },
    {
        country: 'British Virgin Islands',
        dialCode: '+1-284',
        flag: '🇻🇬',
    },
    {
        country: 'Cayman Islands',
        dialCode: '+1-345',
        flag: '🇰🇾',
    },
    {
        country: 'Bermuda',
        dialCode: '+1-441',
        flag: '🇧🇲',
    },
    {
        country: 'Grenada',
        dialCode: '+1-473',
        flag: '🇬🇩',
    },
    {
        country: 'Turks and Caicos Islands',
        dialCode: '+1-649',
        flag: '🇹🇨',
    },
    {
        country: 'Montserrat',
        dialCode: '+1-664',
        flag: '🇲🇸',
    },
    {
        country: 'Northern Mariana Islands',
        dialCode: '+1-670',
        flag: '🇲🇵',
    },
    {
        country: 'Guam',
        dialCode: '+1-671',
        flag: '🇬🇺',
    },
    {
        country: 'Jamaica',
        dialCode: '+1-876',
        flag: '🇯🇲',
    },
    {
        country: 'Saint Kitts and Nevis',
        dialCode: '+1-869',
        flag: '🇰🇳',
    },
    {
        country: 'Saint Lucia',
        dialCode: '+1-758',
        flag: '🇱🇨',
    },
    {
        country: 'Saint Vincent and the Grenadines',
        dialCode: '+1-784',
        flag: '🇻🇨',
    },
    {
        country: 'Trinidad and Tobago',
        dialCode: '+1-868',
        flag: '🇹🇹',
    },
    {
        country: 'Puerto Rico',
        dialCode: '+1-787 / +1-939',
        flag: '🇵🇷',
    },
    {
        country: 'Dominican Republic',
        dialCode: '+1-809 / +1-829 / +1-849',
        flag: '🇩🇴',
    },
    {
        country: 'Egypt',
        dialCode: '+20',
        flag: '🇪🇬',
    },
    {
        country: 'South Sudan',
        dialCode: '+211',
        flag: '🇸🇸',
    },
    {
        country: 'Morocco',
        dialCode: '+212',
        flag: '🇲🇦',
    },
    {
        country: 'Algeria',
        dialCode: '+213',
        flag: '🇩🇿',
    },
    {
        country: 'Tunisia',
        dialCode: '+216',
        flag: '🇹🇳',
    },
    {
        country: 'Libya',
        dialCode: '+218',
        flag: '🇱🇾',
    },
    {
        country: 'Gambia',
        dialCode: '+220',
        flag: '🇬🇲',
    },
    {
        country: 'Senegal',
        dialCode: '+221',
        flag: '🇸🇳',
    },
    {
        country: 'Mauritania',
        dialCode: '+222',
        flag: '🇲🇷',
    },
    {
        country: 'Mali',
        dialCode: '+223',
        flag: '🇲🇱',
    },
    {
        country: 'Guinea',
        dialCode: '+224',
        flag: '🇬🇳',
    },
    {
        country: "Ivory Coast (Côte d'Ivoire)",
        dialCode: '+225',
        flag: '🇨🇮',
    },
    {
        country: 'Burkina Faso',
        dialCode: '+226',
        flag: '🇧🇫',
    },
    {
        country: 'Niger',
        dialCode: '+227',
        flag: '🇳🇪',
    },
    {
        country: 'Togo',
        dialCode: '+228',
        flag: '🇹🇬',
    },
    {
        country: 'Benin',
        dialCode: '+229',
        flag: '🇧🇯',
    },
    {
        country: 'Mauritius',
        dialCode: '+230',
        flag: '🇲🇺',
    },
    {
        country: 'Liberia',
        dialCode: '+231',
        flag: '🇱🇷',
    },
    {
        country: 'Sierra Leone',
        dialCode: '+232',
        flag: '🇸🇱',
    },
    {
        country: 'Ghana',
        dialCode: '+233',
        flag: '🇬🇭',
    },
    {
        country: 'Nigeria',
        dialCode: '+234',
        flag: '🇳🇬',
    },
    {
        country: 'Chad',
        dialCode: '+235',
        flag: '🇹🇩',
    },
    {
        country: 'Central African Republic',
        dialCode: '+236',
        flag: '🇨🇫',
    },
    {
        country: 'Cameroon',
        dialCode: '+237',
        flag: '🇨🇲',
    },
    {
        country: 'Cape Verde',
        dialCode: '+238',
        flag: '🇨🇻',
    },
    {
        country: 'São Tomé and Príncipe',
        dialCode: '+239',
        flag: '🇸🇹',
    },
    {
        country: 'Equatorial Guinea',
        dialCode: '+240',
        flag: '🇬🇶',
    },
    {
        country: 'Gabon',
        dialCode: '+241',
        flag: '🇬🇦',
    },
    {
        country: 'Republic of the Congo',
        dialCode: '+242',
        flag: '🇨🇬',
    },
    {
        country: 'Democratic Republic of the Congo',
        dialCode: '+243',
        flag: '🇨🇩',
    },
    {
        country: 'Angola',
        dialCode: '+244',
        flag: '🇦🇴',
    },
    {
        country: 'Guinea-Bissau',
        dialCode: '+245',
        flag: '🇬🇼',
    },
    {
        country: 'British Indian Ocean Territory',
        dialCode: '+246',
        flag: '🇮🇴',
    },
    {
        country: 'Ascension Island',
        dialCode: '+247',
        flag: '🇦🇨',
    },
    {
        country: 'Seychelles',
        dialCode: '+248',
        flag: '🇸🇨',
    },
    {
        country: 'Sudan',
        dialCode: '+249',
        flag: '🇸🇩',
    },
    {
        country: 'Rwanda',
        dialCode: '+250',
        flag: '🇷🇼',
    },
    {
        country: 'Ethiopia',
        dialCode: '+251',
        flag: '🇪🇹',
    },
    {
        country: 'Somalia',
        dialCode: '+252',
        flag: '🇸🇴',
    },
    {
        country: 'Djibouti',
        dialCode: '+253',
        flag: '🇩🇯',
    },
    {
        country: 'Kenya',
        dialCode: '+254',
        flag: '🇰🇪',
    },
    {
        country: 'Tanzania',
        dialCode: '+255',
        flag: '🇹🇿',
    },
    {
        country: 'Uganda',
        dialCode: '+256',
        flag: '🇺🇬',
    },
    {
        country: 'Burundi',
        dialCode: '+257',
        flag: '🇧🇮',
    },
    {
        country: 'Mozambique',
        dialCode: '+258',
        flag: '🇲🇿',
    },
    {
        country: 'Zambia',
        dialCode: '+260',
        flag: '🇿🇲',
    },
    {
        country: 'Madagascar',
        dialCode: '+261',
        flag: '🇲🇬',
    },
    {
        country: 'Réunion',
        dialCode: '+262',
        flag: '🇷🇪',
    },
    {
        country: 'Zimbabwe',
        dialCode: '+263',
        flag: '🇿🇼',
    },
    {
        country: 'Namibia',
        dialCode: '+264',
        flag: '🇳🇦',
    },
    {
        country: 'Malawi',
        dialCode: '+265',
        flag: '🇲🇼',
    },
    {
        country: 'Lesotho',
        dialCode: '+266',
        flag: '🇱🇸',
    },
    {
        country: 'Botswana',
        dialCode: '+267',
        flag: '🇧🇼',
    },
    {
        country: 'Eswatini',
        dialCode: '+268',
        flag: '🇸🇿',
    },
    {
        country: 'Comoros',
        dialCode: '+269',
        flag: '🇰🇲',
    },
    {
        country: 'South Africa',
        dialCode: '+27',
        flag: '🇿🇦',
    },
    {
        country: 'Saint Helena, Ascension and Tristan da Cunha',
        dialCode: '+290',
        flag: '🇸🇭',
    },
    {
        country: 'Eritrea',
        dialCode: '+291',
        flag: '🇪🇷',
    },
    {
        country: 'Aruba',
        dialCode: '+297',
        flag: '🇦🇼',
    },
    {
        country: 'Faroe Islands',
        dialCode: '+298',
        flag: '🇫🇴',
    },
    {
        country: 'Greenland',
        dialCode: '+299',
        flag: '🇬🇱',
    },
    {
        country: 'Greece',
        dialCode: '+30',
        flag: '🇬🇷',
    },
    {
        country: 'Netherlands',
        dialCode: '+31',
        flag: '🇳🇱',
    },
    {
        country: 'Belgium',
        dialCode: '+32',
        flag: '🇧🇪',
    },
    {
        country: 'France',
        dialCode: '+33',
        flag: '🇫🇷',
    },
    {
        country: 'Spain',
        dialCode: '+34',
        flag: '🇪🇸',
    },
    {
        country: 'Gibraltar',
        dialCode: '+350',
        flag: '🇬🇮',
    },
    {
        country: 'Portugal',
        dialCode: '+351',
        flag: '🇵🇹',
    },
    {
        country: 'Luxembourg',
        dialCode: '+352',
        flag: '🇱🇺',
    },
    {
        country: 'Ireland',
        dialCode: '+353',
        flag: '🇮🇪',
    },
    {
        country: 'Iceland',
        dialCode: '+354',
        flag: '🇮🇸',
    },
    {
        country: 'Albania',
        dialCode: '+355',
        flag: '🇦🇱',
    },
    {
        country: 'Malta',
        dialCode: '+356',
        flag: '🇲🇹',
    },
    {
        country: 'Cyprus',
        dialCode: '+357',
        flag: '🇨🇾',
    },
    {
        country: 'Finland',
        dialCode: '+358',
        flag: '🇫🇮',
    },
    {
        country: 'Bulgaria',
        dialCode: '+359',
        flag: '🇧🇬',
    },
    {
        country: 'Hungary',
        dialCode: '+36',
        flag: '🇭🇺',
    },
    {
        country: 'Lithuania',
        dialCode: '+370',
        flag: '🇱🇹',
    },
    {
        country: 'Latvia',
        dialCode: '+371',
        flag: '🇱🇻',
    },
    {
        country: 'Estonia',
        dialCode: '+372',
        flag: '🇪🇪',
    },
    {
        country: 'Moldova',
        dialCode: '+373',
        flag: '🇲🇩',
    },
    {
        country: 'Armenia',
        dialCode: '+374',
        flag: '🇦🇲',
    },
    {
        country: 'Belarus',
        dialCode: '+375',
        flag: '🇧🇾',
    },
    {
        country: 'Andorra',
        dialCode: '+376',
        flag: '🇦🇩',
    },
    {
        country: 'Monaco',
        dialCode: '+377',
        flag: '🇲🇨',
    },
    {
        country: 'San Marino',
        dialCode: '+378',
        flag: '🇸🇲',
    },
    {
        country: 'Ukraine',
        dialCode: '+380',
        flag: '🇺🇦',
    },
    {
        country: 'Serbia',
        dialCode: '+381',
        flag: '🇷🇸',
    },
    {
        country: 'Montenegro',
        dialCode: '+382',
        flag: '🇲🇪',
    },
    {
        country: 'Croatia',
        dialCode: '+385',
        flag: '🇭🇷',
    },
    {
        country: 'Slovenia',
        dialCode: '+386',
        flag: '🇸🇮',
    },
    {
        country: 'Bosnia and Herzegovina',
        dialCode: '+387',
        flag: '🇧🇦',
    },
    {
        country: 'North Macedonia',
        dialCode: '+389',
        flag: '🇲🇰',
    },
    {
        country: 'Italy',
        dialCode: '+39',
        flag: '🇮🇹',
    },
    {
        country: 'Romania',
        dialCode: '+40',
        flag: '🇷🇴',
    },
    {
        country: 'Switzerland',
        dialCode: '+41',
        flag: '🇨🇭',
    },
    {
        country: 'Czechia (Czech Republic)',
        dialCode: '+420',
        flag: '🇨🇿',
    },
    {
        country: 'Slovakia',
        dialCode: '+421',
        flag: '🇸🇰',
    },
    {
        country: 'Liechtenstein',
        dialCode: '+423',
        flag: '🇱🇮',
    },
    {
        country: 'Austria',
        dialCode: '+43',
        flag: '🇦🇹',
    },
    {
        country: 'United Kingdom',
        dialCode: '+44',
        flag: '🇬🇧',
    },
    {
        country: 'Channel Islands',
        dialCode: '+44-1534 / +44-1481',
        flag: '🇯🇪 🇬🇬',
    },
    {
        country: 'Denmark',
        dialCode: '+45',
        flag: '🇩🇰',
    },
    {
        country: 'Sweden',
        dialCode: '+46',
        flag: '🇸🇪',
    },
    {
        country: 'Norway',
        dialCode: '+47',
        flag: '🇳🇴',
    },
    {
        country: 'Svalbard and Jan Mayen',
        dialCode: '+47-79',
        flag: '🇸🇯',
    },
    {
        country: 'Poland',
        dialCode: '+48',
        flag: '🇵🇱',
    },
    {
        country: 'Germany',
        dialCode: '+49',
        flag: '🇩🇪',
    },
    {
        country: 'Falkland Islands',
        dialCode: '+500',
        flag: '🇫🇰',
    },
    {
        country: 'Belize',
        dialCode: '+501',
        flag: '🇧🇿',
    },
    {
        country: 'Guatemala',
        dialCode: '+502',
        flag: '🇬🇹',
    },
    {
        country: 'El Salvador',
        dialCode: '+503',
        flag: '🇸🇻',
    },
    {
        country: 'Honduras',
        dialCode: '+504',
        flag: '🇭🇳',
    },
    {
        country: 'Nicaragua',
        dialCode: '+505',
        flag: '🇳🇮',
    },
    {
        country: 'Costa Rica',
        dialCode: '+506',
        flag: '🇨🇷',
    },
    {
        country: 'Panama',
        dialCode: '+507',
        flag: '🇵🇦',
    },
    {
        country: 'Saint Pierre and Miquelon',
        dialCode: '+508',
        flag: '🇵🇲',
    },
    {
        country: 'Haiti',
        dialCode: '+509',
        flag: '🇭🇹',
    },
    {
        country: 'Peru',
        dialCode: '+51',
        flag: '🇵🇪',
    },
    {
        country: 'Mexico',
        dialCode: '+52',
        flag: '🇲🇽',
    },
    {
        country: 'Cuba',
        dialCode: '+53',
        flag: '🇨🇺',
    },
    {
        country: 'Argentina',
        dialCode: '+54',
        flag: '🇦🇷',
    },
    {
        country: 'Brazil',
        dialCode: '+55',
        flag: '🇧🇷',
    },
    {
        country: 'Chile',
        dialCode: '+56',
        flag: '🇨🇱',
    },
    {
        country: 'Colombia',
        dialCode: '+57',
        flag: '🇨🇴',
    },
    {
        country: 'Venezuela',
        dialCode: '+58',
        flag: '🇻🇪',
    },
    {
        country: 'Guadeloupe',
        dialCode: '+590',
        flag: '🇬🇵',
    },
    {
        country: 'Bolivia',
        dialCode: '+591',
        flag: '🇧🇴',
    },
    {
        country: 'Guyana',
        dialCode: '+592',
        flag: '🇬🇾',
    },
    {
        country: 'Ecuador',
        dialCode: '+593',
        flag: '🇪🇨',
    },
    {
        country: 'French Guiana',
        dialCode: '+594',
        flag: '🇬🇫',
    },
    {
        country: 'Paraguay',
        dialCode: '+595',
        flag: '🇵🇾',
    },
    {
        country: 'Martinique',
        dialCode: '+596',
        flag: '🇲🇶',
    },
    {
        country: 'Suriname',
        dialCode: '+597',
        flag: '🇸🇷',
    },
    {
        country: 'Uruguay',
        dialCode: '+598',
        flag: '🇺🇾',
    },
    {
        country: 'Curaçao',
        dialCode: '+599',
        flag: '🇨🇼',
    },
    {
        country: 'Sint Maarten (Dutch part)',
        dialCode: '+599-7',
        flag: '🇸🇽',
    },
    {
        country: 'Malaysia',
        dialCode: '+60',
        flag: '🇲🇾',
    },
    {
        country: 'Australia',
        dialCode: '+61',
        flag: '🇦🇺',
    },
    {
        country: 'Christmas Island',
        dialCode: '+61-89164',
        flag: '🇨🇽',
    },
    {
        country: 'Cocos (Keeling) Islands',
        dialCode: '+61-89162',
        flag: '🇨🇨',
    },
    {
        country: 'Indonesia',
        dialCode: '+62',
        flag: '🇮🇩',
    },
    {
        country: 'Philippines',
        dialCode: '+63',
        flag: '🇵🇭',
    },
    {
        country: 'New Zealand',
        dialCode: '+64',
        flag: '🇳🇿',
    },
    {
        country: 'Singapore',
        dialCode: '+65',
        flag: '🇸🇬',
    },
    {
        country: 'Thailand',
        dialCode: '+66',
        flag: '🇹🇭',
    },
    {
        country: 'East Timor',
        dialCode: '+670',
        flag: '🇹🇱',
    },
    {
        country: 'Brunei',
        dialCode: '+673',
        flag: '🇧🇳',
    },
    {
        country: 'Nauru',
        dialCode: '+674',
        flag: '🇳🇷',
    },
    {
        country: 'Papua New Guinea',
        dialCode: '+675',
        flag: '🇵🇬',
    },
    {
        country: 'Tonga',
        dialCode: '+676',
        flag: '🇹🇴',
    },
    {
        country: 'Solomon Islands',
        dialCode: '+677',
        flag: '🇸🇧',
    },
    {
        country: 'Vanuatu',
        dialCode: '+678',
        flag: '🇻🇺',
    },
    {
        country: 'Fiji',
        dialCode: '+679',
        flag: '🇫🇯',
    },
    {
        country: 'Palau',
        dialCode: '+680',
        flag: '🇵🇼',
    },
    {
        country: 'Wallis and Futuna',
        dialCode: '+681',
        flag: '🇼🇫',
    },
    {
        country: 'Cook Islands',
        dialCode: '+682',
        flag: '🇨🇰',
    },
    {
        country: 'Niue',
        dialCode: '+683',
        flag: '🇳🇺',
    },
    {
        country: 'Samoa',
        dialCode: '+685',
        flag: '🇼🇸',
    },
    {
        country: 'Kiribati',
        dialCode: '+686',
        flag: '🇰🇮',
    },
    {
        country: 'New Caledonia',
        dialCode: '+687',
        flag: '🇳🇨',
    },
    {
        country: 'Tuvalu',
        dialCode: '+688',
        flag: '🇹🇻',
    },
    {
        country: 'French Polynesia',
        dialCode: '+689',
        flag: '🇵🇫',
    },
    {
        country: 'Tokelau',
        dialCode: '+690',
        flag: '🇹🇰',
    },
    {
        country: 'Micronesia (FSM)',
        dialCode: '+691',
        flag: '🇫🇲',
    },
    {
        country: 'Marshall Islands',
        dialCode: '+692',
        flag: '🇲🇭',
    },
    {
        country: 'Russia',
        dialCode: '+7',
        flag: '🇷🇺',
    },
    {
        country: 'Kazakhstan',
        dialCode: '+7-7xx',
        flag: '🇰🇿',
    },
    {
        country: 'Japan',
        dialCode: '+81',
        flag: '🇯🇵',
    },
    {
        country: 'South Korea',
        dialCode: '+82',
        flag: '🇰🇷',
    },
    {
        country: 'Vietnam',
        dialCode: '+84',
        flag: '🇻🇳',
    },
    {
        country: 'North Korea',
        dialCode: '+850',
        flag: '🇰🇵',
    },
    {
        country: 'Hong Kong',
        dialCode: '+852',
        flag: '🇭🇰',
    },
    {
        country: 'Macau',
        dialCode: '+853',
        flag: '🇲🇴',
    },
    {
        country: 'Cambodia',
        dialCode: '+855',
        flag: '🇰🇭',
    },
    {
        country: 'Laos',
        dialCode: '+856',
        flag: '🇱🇦',
    },
    {
        country: 'China',
        dialCode: '+86',
        flag: '🇨🇳',
    },
    {
        country: 'Bangladesh',
        dialCode: '+880',
        flag: '🇧🇩',
    },
    {
        country: 'Taiwan',
        dialCode: '+886',
        flag: '🇹🇼',
    },
    {
        country: 'Turkey',
        dialCode: '+90',
        flag: '🇹🇷',
    },
    {
        country: 'India',
        dialCode: '+91',
        flag: '🇮🇳',
    },
    {
        country: 'Pakistan',
        dialCode: '+92',
        flag: '🇵🇰',
    },
    {
        country: 'Afghanistan',
        dialCode: '+93',
        flag: '🇦🇫',
    },
    {
        country: 'Sri Lanka',
        dialCode: '+94',
        flag: '🇱🇰',
    },
    {
        country: 'Myanmar',
        dialCode: '+95',
        flag: '🇲🇲',
    },
    {
        country: 'Iran',
        dialCode: '+98',
        flag: '🇮🇷',
    },
    {
        country: 'Uzbekistan',
        dialCode: '+998',
        flag: '🇺🇿',
    },
    {
        country: 'Nepal',
        dialCode: '+977',
        flag: '🇳🇵',
    },
    {
        country: 'Azerbaijan',
        dialCode: '+994',
        flag: '🇦🇿',
    },
    {
        country: 'Tajikistan',
        dialCode: '+992',
        flag: '🇹🇯',
    },
    {
        country: 'Kyrgyzstan',
        dialCode: '+996',
        flag: '🇰🇬',
    },
    {
        country: 'Turkmenistan',
        dialCode: '+993',
        flag: '🇹🇲',
    },
    {
        country: 'Maldives',
        dialCode: '+960',
        flag: '🇲🇻',
    },
    {
        country: 'Lebanon',
        dialCode: '+961',
        flag: '🇱🇧',
    },
    {
        country: 'Jordan',
        dialCode: '+962',
        flag: '🇯🇴',
    },
    {
        country: 'Syria',
        dialCode: '+963',
        flag: '🇸🇾',
    },
    {
        country: 'Iraq',
        dialCode: '+964',
        flag: '🇮🇶',
    },
    {
        country: 'Kuwait',
        dialCode: '+965',
        flag: '🇰🇼',
    },
    {
        country: 'Saudi Arabia',
        dialCode: '+966',
        flag: '🇸🇦',
    },
    {
        country: 'Yemen',
        dialCode: '+967',
        flag: '🇾🇪',
    },
    {
        country: 'Oman',
        dialCode: '+968',
        flag: '🇴🇲',
    },
    {
        country: 'Palestine',
        dialCode: '+970',
        flag: '🇵🇸',
    },
    {
        country: 'United Arab Emirates',
        dialCode: '+971',
        flag: '🇦🇪',
    },
    {
        country: 'Israel',
        dialCode: '+972',
        flag: '🇮🇱',
    },
    {
        country: 'Bahrain',
        dialCode: '+973',
        flag: '🇧🇭',
    },
    {
        country: 'Qatar',
        dialCode: '+974',
        flag: '🇶🇦',
    },
    {
        country: 'Bhutan',
        dialCode: '+975',
        flag: '🇧🇹',
    },
    {
        country: 'Mongolia',
        dialCode: '+976',
        flag: '🇲🇳',
    },
];
