import { 
  Benefit, 
  Institution, 
  Specialist, 
  Article, 
  Checklist, 
  UserProfile, 
  Child, 
  FamilyMember,
  FamilyEvent, 
  NotificationItem, 
  UserDocument,
  Conversation,
  ChatMessage
} from '@/types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-bel-001',
  email: 'anna.ivanova@rodnya.by',
  full_name: 'Анна Иванова',
  role: 'user',
  avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  phone: '+375 (29) 678-43-21',
  region: 'г. Минск',
  district: 'Центральный район',
  created_at: '2026-01-15T10:00:00Z',
};

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'ch-01',
    user_id: 'usr-bel-001',
    name: 'Анечка',
    birth_date: '2023-04-12',
    gender: 'female',
    photo_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80',
    notes: 'Аллергия на цитрусовые, группа в саду «Пчёлки»',
  },
  {
    id: 'ch-02',
    user_id: 'usr-bel-001',
    name: 'Максим',
    birth_date: '2025-11-20',
    gender: 'male',
    photo_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80',
    notes: 'Период прорезывания зубов, грудное вскармливание',
  }
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  { id: 'fm-1', user_id: 'usr-bel-001', full_name: 'Анна (Мама)', relationship: 'mother', age: 32 },
  { id: 'fm-2', user_id: 'usr-bel-001', full_name: 'Дмитрий (Папа)', relationship: 'father', age: 34 },
  { id: 'fm-3', user_id: 'usr-bel-001', full_name: 'Аня (Дочь)', relationship: 'child', age: 3 },
  { id: 'fm-4', user_id: 'usr-bel-001', full_name: 'Максим (Сын)', relationship: 'child', age: 1 }
];

export const MOCK_BENEFITS: Benefit[] = [
  {
    id: 'b-01',
    code: 'BEN-01',
    title: 'Единовременное пособие в связи с рождением первого ребенка',
    short_description: 'Выплата в размере 10 бюджетов прожиточного минимума (БПМ) при рождении первого малыша.',
    category: 'birth',
    base_amount_byn: 4378.00,
    payment_period: 'единовременно',
    target_group: 'Семьи при рождении первого ребенка',
    eligibility_conditions: [
      'Постоянное проживание в Республике Беларусь',
      'Регистрация рождения в органах ЗАГС РБ',
      'Обращение за назначением не позднее 6 месяцев со дня рождения'
    ],
    required_documents: [
      'Паспорта обоих родителей',
      'Справка о рождении ребенка из ЗАГСа (оригинал)',
      'Свидетельство о рождении ребенка',
      'Справка о месте жительства и составе семьи'
    ],
    application_procedure: 'Подается в комиссию по назначению пособий по месту работы матери (или отца, если мать не работает), либо в УТЗСН по месту жительства.',
    processing_days: '10 рабочих дней',
    official_authority: 'Министерство труда и социальной защиты Республики Беларусь',
    official_source_url: 'https://mintrud.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-02',
    code: 'BEN-02',
    title: 'Единовременное пособие в связи с рождением второго и последующих детей',
    short_description: 'Увеличенная единовременная государственная выплата в размере 14 БПМ.',
    category: 'birth',
    base_amount_byn: 6129.20,
    payment_period: 'единовременно',
    target_group: 'Семьи при рождении второго, третьего и последующих детей',
    eligibility_conditions: [
      'Постоянное проживание родителей и ребенка в Республике Беларусь',
      'Наличие в семье старшего ребенка (детей)'
    ],
    required_documents: [
      'Паспорта родителей',
      'Свидетельства о рождении всех детей',
      'Справка о составе семьи',
      'Заявление установленной формы'
    ],
    application_procedure: 'По основному месту работы родителя либо в управление социальной защиты населения.',
    processing_days: '10 рабочих дней',
    official_authority: 'Фонд социальной защиты населения (ФСЗН)',
    official_source_url: 'https://ssf.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-03',
    code: 'BEN-03',
    title: 'Ежемесячное пособие по уходу за ребенком в возрасте до 3 лет (на первого ребенка)',
    short_description: '35% от среднемесячной заработной платы работников в республике (СЗП).',
    category: 'care_under_3',
    base_amount_byn: 845.50,
    payment_period: 'ежемесячно',
    target_group: 'Родители в отпуске по уходу за первым ребенком',
    eligibility_conditions: [
      'Фактический уход за ребенком до достижения им 3-летнего возраста',
      'Занятость не более чем на 0.5 ставки при выходе на работу'
    ],
    required_documents: [
      'Свидетельство о рождении ребенка',
      'Приказ работодателя о предоставлении отпуска по уходу за ребенком',
      'Паспорт заявителя'
    ],
    application_procedure: 'Назначается по месту работы матери (отца) с первого дня отпуска.',
    processing_days: 'Со дня подачи до даты следующей выплаты зарплаты',
    official_authority: 'Министерство труда и соцзащиты РБ',
    official_source_url: 'https://mintrud.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-04',
    code: 'BEN-04',
    title: 'Ежемесячное пособие по уходу за ребенком до 3 лет (на второго и последующих)',
    short_description: 'Повышенный размер 40% от среднемесячной заработной платы по стране.',
    category: 'care_under_3',
    base_amount_byn: 966.30,
    payment_period: 'ежемесячно',
    target_group: 'Родители с двумя и более детьми в отпуске по уходу',
    eligibility_conditions: [
      'Воспитание в семье двух и более детей',
      'Возраст младшего ребенка до 3 лет'
    ],
    required_documents: [
      'Свидетельства о рождении всех детей',
      'Справка о месте жительства и составе семьи',
      'Трудовая книжка или справка с места работы'
    ],
    application_procedure: 'Оформляется через комиссию по назначению пособий предприятия или УТЗСН.',
    processing_days: '10 рабочих дней',
    official_authority: 'Министерство труда и соцзащиты РБ',
    official_source_url: 'https://mintrud.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-05',
    code: 'BEN-05',
    title: 'Семейный капитал при рождении третьего или последующих детей',
    short_description: 'Безналичная выплата многодетным семьям в размере 31 426 BYN с правом досрочного использования на жилье, медицину или образование.',
    category: 'family_capital',
    base_amount_byn: 31426.00,
    payment_period: 'целевое финансирование',
    target_group: 'Многодетные семьи (3 и более несовершеннолетних детей)',
    eligibility_conditions: [
      'Рождение (усыновление) третьего или последующего ребенка',
      'Гражданство Республики Беларусь одного из родителей',
      'Постоянное проживание на территории Беларуси'
    ],
    required_documents: [
      'Паспорт гражданина Республики Беларусь',
      'Свидетельства о рождении всех несовершеннолетних детей',
      'Удостоверение многодетной семьи',
      'Справка о месте жительства и составе семьи'
    ],
    application_procedure: 'Заявление подается в районный или городской исполнительный комитет по месту жительства в течение 6 месяцев со дня рождения ребенка.',
    processing_days: '1 месяц со дня подачи заявления',
    official_authority: 'Районные исполнительные комитеты / ОАО «АСБ Беларусбанк»',
    official_source_url: 'https://belarusbank.by',
    last_updated_date: '2026-01-01',
    is_active: true,
  },
  {
    id: 'b-06',
    code: 'BEN-06',
    title: 'Единовременное пособие женщинам, ставшим на учет до 12 недель',
    short_description: 'Поощрительная выплата в размере 100% БПМ за своевременную заботу о здоровье будущего малыша.',
    category: 'birth',
    base_amount_byn: 437.80,
    payment_period: 'единовременно',
    target_group: 'Женщины, ставшие на медицинский учет до 12-недельного срока',
    eligibility_conditions: [
      'Постановка на учет в государственной женской консультации до 12 недель',
      'Регулярное посещение врачей и выполнение рекомендаций'
    ],
    required_documents: [
      'Заключение (справка) врачебно-консультационной комиссии женской консультации',
      'Паспорт',
      'Заявление'
    ],
    application_procedure: 'Назначается одновременно с единовременным пособием при рождении ребенка.',
    processing_days: '10 рабочих дней',
    official_authority: 'Министерство здравоохранения Республики Беларусь',
    official_source_url: 'https://minzdrav.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-07',
    code: 'BEN-07',
    title: 'Пособие на детей от 3 до 18 лет в период воспитания ребенка до 3 лет',
    short_description: 'Ежемесячная выплата 50% БПМ семьям со старшими детьми школьного и дошкольного возраста.',
    category: 'child_over_3',
    base_amount_byn: 218.90,
    payment_period: 'ежемесячно',
    target_group: 'Семьи, где одновременно есть ребенок до 3 лет и дети от 3 до 18 лет',
    eligibility_conditions: [
      'Воспитание в семье ребенка в возрасте до 3 лет',
      'Наличие детей в возрасте от 3 до 18 лет, обучающихся в школе, колледже или вузе'
    ],
    required_documents: [
      'Свидетельства о рождении детей',
      'Справка из школы или детского сада',
      'Справка о составе семьи'
    ],
    application_procedure: 'Оформляется по месту получения основного пособия на ребенка до 3 лет.',
    processing_days: '10 рабочих дней',
    official_authority: 'ФСЗН / Министерство труда и соцзащиты РБ',
    official_source_url: 'https://ssf.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  },
  {
    id: 'b-08',
    code: 'BEN-08',
    title: 'Льготные субсидии на строительство и покупку жилья (Указ № 240)',
    short_description: 'Государственная адресная субсидия на погашение процентов и основного долга по ипотечному кредиту.',
    category: 'housing',
    base_amount_byn: 48500.00,
    payment_period: 'целевое финансирование',
    target_group: 'Многодетные семьи, молодые семьи с двумя несовершеннолетними детьми',
    eligibility_conditions: [
      'Нахождение в очереди нуждающихся в улучшении жилищных условий',
      'Строительство или покупка жилья в установленных нормах'
    ],
    required_documents: [
      'Решение райисполкома о постановке на учет нуждающихся',
      'Справки о доходах членов семьи за 12 месяцев',
      'Договор долевого строительства или купли-продажи'
    ],
    application_procedure: 'Служба «Одно окно» районного исполнительного комитета.',
    processing_days: '30 календарных дней',
    official_authority: 'Министерство архитектуры и строительства Республики Беларусь',
    official_source_url: 'https://mas.gov.by',
    last_updated_date: '2026-01-01',
    is_active: true,
  },
  {
    id: 'b-09',
    code: 'BEN-09',
    title: 'Скидка 50% и 100% на питание в детских садах для многодетных семей',
    short_description: 'Снижение стоимости питания малышей: 50% для семей с 3 детьми, 100% для семей с 4+ детьми.',
    category: 'large_family',
    base_amount_byn: 135.00,
    payment_period: 'ежемесячно',
    target_group: 'Многодетные семьи Республики Беларусь',
    eligibility_conditions: [
      'Посещение государственного учреждения дошкольного образования',
      'Статус многодетной семьи'
    ],
    required_documents: [
      'Удостоверение многодетной семьи (копия и оригинал)',
      'Справка о месте жительства и составе семьи',
      'Заявление на имя руководителя учреждения'
    ],
    application_procedure: 'Подается заведующему детским садом при поступлении.',
    processing_days: '3 рабочих дня',
    official_authority: 'Министерство образования Республики Беларусь',
    official_source_url: 'https://edu.gov.by',
    last_updated_date: '2026-01-01',
    is_active: true,
  },
  {
    id: 'b-10',
    code: 'BEN-10',
    title: 'Бесплатное обеспечение продуктами питания детей первых двух лет жизни',
    short_description: 'Предоставление качественных детских молочных смесей, мясных и фруктовых пюре «Беллакт».',
    category: 'targeted_social_assistance',
    base_amount_byn: 310.00,
    payment_period: 'ежемесячно',
    target_group: 'Малообеспеченные семьи со среднедушевым доходом ниже БПМ, а также семьи при рождении двойни/тройни (без учета дохода)',
    eligibility_conditions: [
      'Возраст ребенка до 2 лет',
      'Доход на члена семьи ниже БПМ (при многоплодной беременности доход не учитывается)'
    ],
    required_documents: [
      'Справка педиатра с перечнем рекомендованного детского питания',
      'Сведения о доходах за предшествующие 12 месяцев',
      'Свидетельства о рождении детей'
    ],
    application_procedure: 'Управление по труду, занятости и социальной защите администрации района.',
    processing_days: '15 рабочих дней',
    official_authority: 'Органы социальной защиты РБ',
    official_source_url: 'https://mintrud.gov.by',
    last_updated_date: '2026-08-01',
    is_active: true,
  }
];

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-01',
    name: 'Детский ясли-сад № 152',
    type: 'kindergarten',
    address: 'ул. Ленина, 15',
    city: 'г. Минск',
    district: 'Центральный район',
    region: 'г. Минск',
    coordinates: [53.9015, 27.5622],
    phone: '+375 (17) 327-45-12',
    work_hours: 'Пн-Пт: 07:00 – 19:00',
    description: 'Государственный ясли-сад с современным бассейном, инклюзивной группой, сенсорной комнатой и видеонаблюдением.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    free_spots: 12,
    has_ramp: true,
    has_elevator: false,
    has_mother_child_room: true,
    rating: 4.9,
    reviews_count: 38,
    website_url: 'https://ddu152.minsk.edu.by'
  },
  {
    id: 'inst-02',
    name: 'Детский ясли-сад № 87 «Звёздочка»',
    type: 'kindergarten',
    address: 'ул. Сурганова, 22',
    city: 'г. Минск',
    district: 'Советский район',
    region: 'г. Минск',
    coordinates: [53.9268, 27.5910],
    phone: '+375 (17) 292-14-30',
    work_hours: 'Пн-Пт: 07:30 – 18:30',
    description: 'Уютный детский сад с художественно-эстетическим уклоном, соляной комнатой и зеленым эко-двором.',
    image_url: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80',
    free_spots: 5,
    has_ramp: true,
    has_elevator: false,
    has_mother_child_room: true,
    rating: 4.8,
    reviews_count: 24,
    website_url: 'https://ddu87.minsk.edu.by'
  },
  {
    id: 'inst-03',
    name: 'Дошкольный центр развития ребёнка «Солнышко»',
    type: 'kindergarten',
    address: 'ул. Горького, 72',
    city: 'г. Гродно',
    district: 'Ленинский район',
    region: 'Гродненская область',
    coordinates: [53.6931, 23.8294],
    phone: '+375 (152) 74-12-09',
    work_hours: 'Пн-Пт: 07:00 – 19:00',
    description: 'Ведущий центр дошкольного образования Гродно с адаптационными группами кратковременного пребывания.',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    free_spots: 9,
    has_ramp: true,
    has_elevator: true,
    has_mother_child_room: true,
    rating: 4.9,
    reviews_count: 42,
    website_url: 'https://dcrr-grodno.schools.by'
  },
  {
    id: 'inst-04',
    name: '2-я городская детская клиническая поликлиника',
    type: 'polyclinic',
    address: 'ул. Червякова, 31',
    city: 'г. Минск',
    district: 'Центральный район',
    region: 'г. Минск',
    coordinates: [53.9212, 27.5501],
    phone: '+375 (17) 378-22-10',
    work_hours: 'Пн-Пт: 07:00 – 20:00, Сб: 08:30 – 15:00',
    description: 'Многопрофильная детская поликлиника с центром раннего вмешательства для малышей и водолечебницей.',
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    free_spots: 0,
    has_ramp: true,
    has_elevator: true,
    has_mother_child_room: true,
    rating: 4.7,
    reviews_count: 56,
    website_url: 'https://2gdp.by'
  },
  {
    id: 'inst-05',
    name: 'РНПЦ «Мать и дитя»',
    type: 'polyclinic',
    address: 'ул. Орловская, 66',
    city: 'г. Минск',
    district: 'Центральный район',
    region: 'г. Минск',
    coordinates: [53.9314, 27.5348],
    phone: '+375 (17) 288-96-26',
    work_hours: 'Круглосуточно / Консультации: 08:00 – 19:00',
    description: 'Ведущий национальный медицинский центр Беларуси по охране репродуктивного здоровья, родовспоможению и выхаживанию новорожденных.',
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    free_spots: 0,
    has_ramp: true,
    has_elevator: true,
    has_mother_child_room: true,
    rating: 5.0,
    reviews_count: 145,
    website_url: 'https://oparina4.ru'
  },
  {
    id: 'inst-06',
    name: 'Кризисный центр для женщин и детей (ТЦСОН)',
    type: 'crisis_center',
    address: 'ул. Кнорина, 17',
    city: 'г. Минск',
    district: 'Первомайский район',
    region: 'г. Минск',
    coordinates: [53.9385, 27.6087],
    phone: '8 (801) 100-88-01',
    work_hours: 'Круглосуточно 24/7',
    description: 'Бесплатное безопасное убежище («кризисная комната»), срочная помощь юриста, психолога и социального педагога.',
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    free_spots: 4,
    has_ramp: true,
    has_elevator: false,
    has_mother_child_room: true,
    rating: 5.0,
    reviews_count: 19,
    website_url: 'https://mintrud.gov.by'
  },
  {
    id: 'inst-07',
    name: 'Брестская городская детская поликлиника № 1',
    type: 'polyclinic',
    address: 'ул. Кижеватова, 74',
    city: 'г. Брест',
    district: 'Ленинский район',
    region: 'Брестская область',
    coordinates: [52.1124, 23.6845],
    phone: '+375 (162) 53-11-20',
    work_hours: 'Пн-Пт: 07:30 – 19:30',
    description: 'Современная медицинская помощь детям, вакцинальный центр, физиотерапевтическое отделение и кабинет грудного вскармливания.',
    image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    free_spots: 0,
    has_ramp: true,
    has_elevator: true,
    has_mother_child_room: true,
    rating: 4.8,
    reviews_count: 31,
    website_url: 'https://bgdp1.by'
  },
  {
    id: 'inst-08',
    name: 'Семейный инклюзивный центр «Вместе для детей»',
    type: 'family_center',
    address: 'пр-т Независимости, 116',
    city: 'г. Минск',
    district: 'Первомайский район',
    region: 'г. Минск',
    coordinates: [53.9328, 27.6432],
    phone: '+375 (29) 112-44-88',
    work_hours: 'Вт-Вс: 09:00 – 20:00',
    description: 'Творческое семейное пространство: развивающие студии, сенсорная интеграция, тренинги для родителей и комната матери и ребенка.',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    free_spots: 18,
    has_ramp: true,
    has_elevator: true,
    has_mother_child_room: true,
    rating: 4.9,
    reviews_count: 47,
    website_url: 'https://vmeste-center.by'
  }
];

export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: 'spec-01',
    full_name: 'Елена Михайловна Ковалёва',
    role_title: 'Перинатальный и семейный психолог',
    specialty: 'psychologist',
    qualification: 'Член Белорусской ассоциации психотерапевтов',
    education: 'БГПУ им. М. Танка, специализация «Клиническая психология»',
    experience_years: 14,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviews_count: 64,
    bio: 'Бережно сопровождаю женщин во время беременности, помогаю преодолеть послеродовую депрессию, тревожность и кризисы взросления малыша.',
    is_online: true,
    is_verified: true,
    available_slots: ['Завтра, 14:00', 'Завтра, 16:30', 'Пт, 11:00']
  },
  {
    id: 'spec-02',
    full_name: 'Д-р Андрей Сергеевич Василевский',
    role_title: 'Врач-педиатр первой категории, неонатолог',
    specialty: 'pediatrician',
    qualification: 'Практикующий врач РНПЦ «Мать и дитя»',
    education: 'Белорусский государственный медицинский университет (БГМУ)',
    experience_years: 11,
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews_count: 89,
    bio: 'Консультирую родителей по уходу за новорожденным, грудному вскармливанию, вакцинации по национальному календарю и лечению частых ОРВИ.',
    is_online: true,
    is_verified: true,
    available_slots: ['Сегодня, 18:00', 'Ср, 10:00', 'Сб, 11:30']
  },
  {
    id: 'spec-03',
    full_name: 'Ольга Николаевна Савицкая',
    role_title: 'Семейный медиатор и юрист',
    specialty: 'family_mediator',
    qualification: 'Включена в реестр медиаторов Минюста Республики Беларусь',
    education: 'БГУ, юридический факультет и психологическая переподготовка',
    experience_years: 9,
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews_count: 52,
    bio: 'Мирное разрешение семейных разногласий, согласование порядка воспитания детей, распределение семейного бюджета и обязанностей без суда.',
    is_online: false,
    is_verified: true,
    available_slots: ['Чт, 15:00', 'Пт, 17:00']
  },
  {
    id: 'spec-04',
    full_name: 'Татьяна Викторовна Кузнецова',
    role_title: 'Логопед-дефектолог высшей категории',
    specialty: 'speech_therapist',
    qualification: 'Специалист по раннему запуску речи (от 1.5 лет)',
    education: 'БГПУ им. М. Танка, факультет специального образования',
    experience_years: 8,
    avatar_url: 'https://images.unsplash.com/photo-1594824813576-90f703e7e8c3?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviews_count: 43,
    bio: 'Запуск речи у неговорящих детей, постановка и автоматизация звуков, артикуляционная гимнастика в игровой форме.',
    is_online: true,
    is_verified: true,
    available_slots: ['Пн, 16:00', 'Ср, 17:30']
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-01',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    slug: 'pregnancy-calendar-guide',
    title: 'Календарь беременности: что происходит с мамой и малышом по неделям',
    excerpt: 'Подробный медицинский гид по триместрам, срокам скринингов и анализам в белорусских женских консультациях.',
    content: `Беременность — удивительный период в жизни семьи. В Республике Беларусь все будущие мамы находятся под постоянной медицинской опекой государственного здравоохранения.\n\n### Первый триместр (1–13 недели)\nКлючевая задача — стать на учет в женскую консультацию до 12-недельного срока. Это позволяет своевременно пройти ультразвуковой и биохимический скрининг пороков развития, а также получить право на единовременную государственную выплату 100% БПМ.\n\n### Второй триместр (14–27 недели)\nПериод расцвета: уходит токсикоз, на 18–20 неделе мама начинает ощущать первые шевеления малыша. На 19–21 неделе проводится детальный анатомический ультразвуковой скрининг.\n\n### Третий триместр (28–40 недели)\nВ 30 недель (в 28 при многоплодной беременности) оформляется листок нетрудоспособности и начинается оплачиваемый дородовой отпуск. Готовим сумку в роддом и выбираем имя малышу!`,
    image_url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
    reading_time_minutes: 7,
    target_age_group: 'pregnancy',
    views_count: 1420,
    likes_count: 312,
    author_name: 'Д-р Андрей Василевский',
    author_title: 'Врач-неонатолог',
    is_published: true,
    published_at: '2026-10-15T09:00:00Z'
  },
  {
    id: 'art-02',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    slug: 'dekret-bez-byurokratii-2026',
    title: 'Декрет без бюрократии: пошаговый план оформления всех выплат и документов в РБ',
    excerpt: 'Четкий алгоритм: от роддома до получения единовременного пособия, выплат до 3 лет и постановки в очередь детского сада.',
    content: `Оформление мер государственной поддержки в Беларуси стало намного удобнее благодаря цифровизации и службе «Одно окно».\n\n### Шаг 1. Роддом и ЗАГС\nПри выписке из роддома выдается медицинская справка о рождении. С ней и паспортами родителей вы обращаетесь в отдел ЗАГС или службу «Одно окно» и получаете Свидетельство о рождении и справку для пособий.\n\n### Шаг 2. Единовременное пособие\nПодается по месту работы матери или отца: 10 БПМ на первого ребенка, 14 БПМ на второго и последующих.\n\n### Шаг 3. Ежемесячные выплаты до 3 лет\nНазначаются с первого дня после окончания больничного листа по беременности и родам в размере 35% или 40% среднемесячной заработной платы по стране.\n\n### Шаг 4. Очередь в детский сад\nПодайте заявление в службу «Одно окно» районной администрации сразу после получения свидетельства о рождении, чтобы забронировать место в ближайшем саду.`,
    image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    reading_time_minutes: 6,
    target_age_group: 'all',
    views_count: 2840,
    likes_count: 689,
    author_name: 'Юрист Ольга Савицкая',
    author_title: 'Консультант по социальным гарантиям',
    is_published: true,
    published_at: '2026-09-28T11:30:00Z'
  },
  {
    id: 'art-03',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    slug: 'sos-burnout-parents',
    title: 'Эмоциональное выгорание родителей: как восстановить силы и не винить себя',
    excerpt: 'Практические упражнения от семейного психолога для мам и пап в период усталости и недосыпа.',
    content: `Родительство — это марафон, а не спринт. Чувство хронической усталости, раздражения и вины за то, что «я устала от собственного ребенка» — классический признак истощения нервной системы, а не дефицита любви.\n\n### 3 правила первой помощи при выгорании:\n1. **Правило кислородной маски**: сначала наденьте маску на себя, потом на ребенка. Сон и питание мамы — это базовый приоритет безопасности семьи.\n2. **Делегирование рутины**: разделите купание, прогулки и укладывание спать с партнером или бабушками.\n3. **Кнопка SOS в «Родныя»**: если вы чувствуете, что не справляетесь, воспользуйтесь нашей бесплатной круглосуточной психологической поддержкой.`,
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    reading_time_minutes: 5,
    target_age_group: 'all',
    views_count: 1980,
    likes_count: 514,
    author_name: 'Елена Ковалёва',
    author_title: 'Перинатальный психолог',
    is_published: true,
    published_at: '2026-10-02T14:15:00Z'
  },
  {
    id: 'art-04',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    slug: 'adaptaciya-k-detskomu-sadu',
    title: 'Мягкая адаптация к детскому саду: секреты спокойного расставания',
    excerpt: 'Как подготовить ребёнка от 2 до 3 лет к новому коллективу без слез и истерик.',
    content: `Первые недели в детском саду — испытание не только для малыша, но и для мамы. Детский сад № 152 и другие садики Минска предлагают постепенную схему привыкания.\n\nНачните с 1.5–2 часов совместной прогулки на площадке детского сада. Никогда не убегайте тайком, когда ребенок отвлекся: это подрывает доверие. Придумайте ритуал прощания (поцелуй в ладошку, секретное объятие) и обязательно дайте с собой любимую маленькую игрушку-«помощника».`,
    image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    reading_time_minutes: 6,
    target_age_group: '1-3',
    views_count: 1650,
    likes_count: 420,
    author_name: 'Татьяна Кузнецова',
    author_title: 'Педагог-дефектолог',
    is_published: true,
    published_at: '2026-08-20T10:00:00Z'
  }
];

export const MOCK_CHECKLISTS: Checklist[] = [
  {
    id: 'chk-01',
    slug: 'maternity-leave-checklist',
    title: 'Оформление декретного отпуска',
    subtitle: 'Пошаговый план для будущей мамы на сроке 30 недель беременности',
    category: 'maternity_leave',
    badge_color: '#34785D',
    items: [
      {
        id: 'ci-01',
        title: 'Получить листок нетрудоспособности по беременности и родам',
        description: 'Оформляется врачом женской консультации ровно в 30 недель (при многоплодной беременности в 28 недель).',
        step_order: 1,
        institution_to_visit: 'Женская консультация по месту прикрепления',
        official_link: 'https://minzdrav.gov.by',
        required_docs_summary: ['Паспорт', 'Обменная карта беременной']
      },
      {
        id: 'ci-02',
        title: 'Предоставить больничный лист в бухгалтерию работодателя',
        description: 'Больничный лист оплачивается единовременно за весь срок (126 или 140 календарных дней).',
        step_order: 2,
        institution_to_visit: 'Место работы / кадровая служба',
        official_link: 'https://ssf.gov.by'
      },
      {
        id: 'ci-03',
        title: 'Получить справку о постановке на учет до 12 недель',
        description: 'Справка ВКК подтверждает право на единовременную государственную выплату 100% БПМ.',
        step_order: 3,
        institution_to_visit: 'Женская консультация',
        official_link: 'https://minzdrav.gov.by'
      }
    ]
  },
  {
    id: 'chk-02',
    slug: 'newborn-registration',
    title: 'Первые документы новорождённого в РБ',
    subtitle: 'Свидетельство о рождении, регистрация, пособия и очередь в детский сад',
    category: 'child_birth',
    badge_color: '#E58A7D',
    items: [
      {
        id: 'ci-04',
        title: 'Медицинская справка о рождении в роддоме',
        description: 'Выдается неонатологом в день выписки из роддома.',
        step_order: 1,
        institution_to_visit: 'Родильный дом / РНПЦ',
        required_docs_summary: ['Обменная карта', 'Паспорт мамы']
      },
      {
        id: 'ci-05',
        title: 'Оформить Свидетельство о рождении в ЗАГСе',
        description: 'Получить гербовый документ гражданина Беларуси и справку для единовременного пособия.',
        step_order: 2,
        institution_to_visit: 'Отдел ЗАГС администрации района',
        official_link: 'https://minjust.gov.by',
        required_docs_summary: ['Справка из роддома', 'Паспорта обоих родителей', 'Свидетельство о браке']
      },
      {
        id: 'ci-06',
        title: 'Подать заявление на единовременное пособие и выплаты до 3 лет',
        description: 'Выплаты назначаются по месту работы либо в управлении социальной защиты.',
        step_order: 3,
        institution_to_visit: 'Бухгалтерия работодателя / УТЗСН',
        official_link: 'https://mintrud.gov.by'
      },
      {
        id: 'ci-07',
        title: 'Зарегистрировать ребенка по месту жительства (прописка)',
        description: 'Оформляется в расчетно-справочном центре (РСЦ) бесплатно.',
        step_order: 4,
        institution_to_visit: 'Расчетно-справочный центр (РСЦ)'
      },
      {
        id: 'ci-08',
        title: 'Встать на очередь в детский сад',
        description: 'Зарегистрироваться в службе «Одно окно» для получения путевки в желаемый детский сад.',
        step_order: 5,
        institution_to_visit: 'Служба «Одно окно» районного исполкома',
        official_link: 'https://edu.gov.by'
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    user_id: 'usr-bel-001',
    title: 'Пособие на ребёнка начислено',
    message: 'Ежемесячное пособие по уходу за ребёнком до 3 лет в размере 966,30 BYN успешно перечислено на ваш расчётный счёт.',
    type: 'benefit',
    action_url: '/benefits',
    is_read: false,
    created_at: '2026-10-31T07:24:00Z',
  },
  {
    id: 'notif-02',
    user_id: 'usr-bel-001',
    title: 'Напоминание: плановый приём у педиатра',
    message: 'Завтра в 10:00 назначен плановый осмотр Анечки в 2-й детской поликлинике (кабинет 214).',
    type: 'medical',
    action_url: '/family',
    is_read: false,
    created_at: '2026-10-30T15:00:00Z',
  },
  {
    id: 'notif-03',
    user_id: 'usr-bel-001',
    title: 'Обновлён календарь профилактических прививок',
    message: 'В Республике Беларусь утвержден обновленный график вакцинации детей первого года жизни.',
    type: 'news',
    action_url: '/health',
    is_read: true,
    created_at: '2026-10-28T09:12:00Z',
  },
  {
    id: 'notif-04',
    user_id: 'usr-bel-001',
    title: 'Ответ специалиста на ваш вопрос',
    message: 'Психолог Елена Ковалёва оставила ответ в диалоге «Мягкая адаптация в саду».',
    type: 'chat',
    action_url: '/chats',
    is_read: true,
    created_at: '2026-10-27T16:40:00Z',
  }
];

export const MOCK_DOCUMENTS: UserDocument[] = [
  {
    id: 'doc-01',
    user_id: 'usr-bel-001',
    title: 'Паспорт гражданина Республики Беларусь (Мама)',
    category: 'passport',
    file_name: 'passport_ivanova_a.pdf',
    file_size_formatted: '2.4 МБ',
    file_url: '#',
    status: 'active',
    expires_at: '2032-05-12',
    uploaded_at: '2026-02-10T11:00:00Z'
  },
  {
    id: 'doc-02',
    user_id: 'usr-bel-001',
    title: 'Свидетельство о рождении дочери (Аня)',
    category: 'birth_certificate',
    file_name: 'birth_cert_anya_2023.pdf',
    file_size_formatted: '1.8 МБ',
    file_url: '#',
    status: 'active',
    uploaded_at: '2026-02-10T11:05:00Z'
  },
  {
    id: 'doc-03',
    user_id: 'usr-bel-001',
    title: 'Справка о месте жительства и составе семьи',
    category: 'family_certificate',
    file_name: 'family_composition_spravka.pdf',
    file_size_formatted: '940 КБ',
    file_url: '#',
    status: 'in_process',
    uploaded_at: '2026-10-25T14:20:00Z'
  },
  {
    id: 'doc-04',
    user_id: 'usr-bel-001',
    title: 'Заявление на семейный капитал',
    category: 'maternity_capital',
    file_name: 'family_capital_application.pdf',
    file_size_formatted: '1.2 МБ',
    file_url: '#',
    status: 'in_process',
    uploaded_at: '2026-10-29T16:00:00Z'
  }
];

export const MOCK_EVENTS: FamilyEvent[] = [
  {
    id: 'ev-01',
    user_id: 'usr-bel-001',
    title: 'Осмотр у педиатра (Д-р Василевский)',
    category: 'medical',
    date: '2026-11-04',
    time: '10:00',
    child_name: 'Анечка',
    location: '2-я детская поликлиника, каб. 214',
    notes: 'Взять амбулаторную карту и прививочный паспорт',
    is_completed: false
  },
  {
    id: 'ev-02',
    user_id: 'usr-bel-001',
    title: 'Вакцинация против полиомиелита (ИПВ)',
    category: 'vaccine',
    date: '2026-11-12',
    time: '11:30',
    child_name: 'Максим',
    location: 'Прививочный кабинет детской поликлиники',
    is_completed: false
  },
  {
    id: 'ev-03',
    user_id: 'usr-bel-001',
    title: 'День рождения Анечки (4 года!)',
    category: 'birthday',
    date: '2026-04-12',
    time: '15:00',
    child_name: 'Анечка',
    location: 'Семейный инклюзивный центр «Вместе»',
    is_completed: false
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-01',
    user_id: 'usr-bel-001',
    specialist_id: 'spec-01',
    specialist_name: 'Елена Ковалёва',
    specialist_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialist_role: 'Перинатальный психолог',
    last_message: 'Здравствуйте, Анна! Отличные новости. Вы проделали большую работу над режимом сна.',
    last_message_at: '2026-10-31T14:20:00Z',
    unread_count: 1
  },
  {
    id: 'conv-02',
    user_id: 'usr-bel-001',
    specialist_id: 'spec-02',
    specialist_name: 'Д-р Андрей Василевский',
    specialist_avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    specialist_role: 'Врач-педиатр',
    last_message: 'Ждем вас на плановый осмотр в четверг. До встречи!',
    last_message_at: '2026-10-29T10:15:00Z',
    unread_count: 0
  }
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    conversation_id: 'conv-01',
    sender_id: 'usr-bel-001',
    sender_name: 'Анна',
    is_from_user: true,
    content: 'Елена Михайловна, добрый день! Стали применять вечерние расслабляющие сказки, Анечка стала засыпать намного спокойнее.',
    created_at: '2026-10-31T13:45:00Z'
  },
  {
    id: 'msg-02',
    conversation_id: 'conv-01',
    sender_id: 'spec-01',
    sender_name: 'Елена Ковалёва',
    sender_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    is_from_user: false,
    content: 'Здравствуйте, Анна! Отличные новости. Вы проделали большую работу над режимом сна. Закрепите этот ритуал еще на неделю.',
    created_at: '2026-10-31T14:20:00Z'
  }
];
