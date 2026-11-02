export interface WeekDetails {
  week: number;
  trimester: 1 | 2 | 3;
  baby_size_fruit: string;
  baby_length_cm: number;
  baby_weight_g: number;
  baby_description: string;
  mother_description: string;
  screenings_recommended: string[];
  tips: string[];
}

export function calculatePregnancyStatus(lmpDateString: string) {
  const lmp = new Date(lmpDateString);
  const now = new Date();
  const diffMs = now.getTime() - lmp.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  
  const currentWeek = Math.min(42, Math.max(1, Math.floor(diffDays / 7) + 1));
  const currentDayOfWeek = (diffDays % 7) + 1;
  
  // Дата предполагаемых родов (Правило Негеле: +1 год - 3 месяца + 7 дней = ~280 дней)
  const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  const daysLeft = Math.max(0, Math.floor((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  let trimester: 1 | 2 | 3 = 1;
  if (currentWeek >= 28) {
    trimester = 3;
  } else if (currentWeek >= 14) {
    trimester = 2;
  }

  const progressPercent = Math.min(100, Math.round((diffDays / 280) * 100));

  return {
    lmpDate: lmpDateString,
    currentWeek,
    currentDayOfWeek,
    trimester,
    estimatedDueDate: edd.toISOString().split('T')[0],
    daysPassed: diffDays,
    daysLeft,
    progressPercent,
    weekDetails: getWeekDetails(currentWeek)
  };
}

export function getWeekDetails(week: number): WeekDetails {
  if (week <= 8) {
    return {
      week,
      trimester: 1,
      baby_size_fruit: 'Малиновая ягодка',
      baby_length_cm: 1.6,
      baby_weight_g: 1.2,
      baby_description: 'Закладываются основные органы: формируется сердечко, крошечные ручки и пальчики. Сердцебиение уже можно услышать на УЗИ!',
      mother_description: 'Возможно проявление раннего токсикоза, чувствительности к запахам и легкой сонливости. Организм активно перестраивает гормональный фон.',
      screenings_recommended: [
        'Постановка на учет в женскую консультацию до 12 недель',
        'Общий и биохимический анализ крови, коагулограмма',
        'Определение группы крови и резус-фактора'
      ],
      tips: [
        'Начните прием фолиевой кислоты (400 мкг в сутки) и йодида калия по назначению врача',
        'Держите рядом сухие крекеры или воду с лимоном от утренней тошноты'
      ]
    };
  }

  if (week <= 13) {
    return {
      week,
      trimester: 1,
      baby_size_fruit: 'Сочный лайм',
      baby_length_cm: 6.5,
      baby_weight_g: 18,
      baby_description: 'Малыш уже двигает ножками, умеет сжимать кулачки и заглатывать околоплодные воды. Сформировались зачатки молочных зубов.',
      mother_description: 'Матка увеличивается до размеров грейпфрута. Токсикоз постепенно отступает, улучшается аппетит и цвет лица.',
      screenings_recommended: [
        'Первый ультразвуковой пренатальный скрининг (11–13 недель 6 дней)',
        'Биохимический скрининг сывороточных маркеров крови (PAPP-A, свободный β-ХГЧ)'
      ],
      tips: [
        'Гуляйте на свежем воздухе не менее 1 часа в день',
        'Используйте увлажняющие кремы от растяжек'
      ]
    };
  }

  if (week <= 20) {
    return {
      week,
      trimester: 2,
      baby_size_fruit: 'Спелое манго',
      baby_length_cm: 25.0,
      baby_weight_g: 320,
      baby_description: 'Экватор беременности! Малыш различает звуки и ваш голос, сосет пальчик и реагирует на прикосновения к животу. Появляются первые отчетливые шевеления.',
      mother_description: 'Животик становится заметным и округлым. Период наивысшего прилива сил и энергии.',
      screenings_recommended: [
        'Второй пренатальный анатомический ультразвуковой скрининг (19–21 неделя)',
        'Эхокардиография плода при показаниях'
      ],
      tips: [
        'Слушайте спокойную классическую музыку и разговаривайте с малышом',
        'Выбирайте удобную обувь на низком ходу'
      ]
    };
  }

  if (week <= 28) {
    return {
      week,
      trimester: 3,
      baby_size_fruit: 'Баклажан',
      baby_length_cm: 37.5,
      baby_weight_g: 1050,
      baby_description: 'Малыш перешагнул отметку в 1 килограмм! Открывает и закрывает глазки, реагирует на яркий свет и тренирует дыхательные движения.',
      mother_description: 'Начало третьего триместра. Нагрузка на поясницу возрастает, возможна легкая одышка при быстрой ходьбе.',
      screenings_recommended: [
        'Глюкозотолерантный тест (ГТТ) на 24–28 неделе для исключения гестационного диабета',
        'Контроль уровня гемоглобина и ферритина'
      ],
      tips: [
        'Используйте дородовой бандаж и подушку для беременных во время сна',
        'Спите на левом боку для наилучшего кровотока к плаценте'
      ]
    };
  }

  if (week <= 36) {
    return {
      week,
      trimester: 3,
      baby_size_fruit: 'Ананас',
      baby_length_cm: 47.0,
      baby_weight_g: 2600,
      baby_description: 'Малыш практически готов к появлению на свет: легкие созрели, накопился подкожный жировой слой. Занимает окончательное положение головкой вниз.',
      mother_description: 'Оформлен больничный лист по беременности и родам на 30-й неделе. Время отдыха, сбор сумки в роддом и выбор детской кроватки.',
      screenings_recommended: [
        'Оформление листка нетрудоспособности по беременности и родам (30 недель)',
        'Кардиотокография (КТГ) плода каждые 7-10 дней',
        'Третье контрольное УЗИ с допплерометрией'
      ],
      tips: [
        'Соберите 3 пакета в роддом (в родильное отделение, послеродовое и на выписку)',
        'Посетите бесплатные курсы подготовки к родам в женской консультации'
      ]
    };
  }

  return {
    week,
    trimester: 3,
    baby_size_fruit: 'Арбуз',
    baby_length_cm: 51.0,
    baby_weight_g: 3400,
    baby_description: 'Полная готовность к встрече с мамой и папой! Малыш затих и накапливает силы для родов.',
    mother_description: 'Опустился животик, стало легче дышать. Тренировочные схватки Брекстона-Хиггса напоминают о скорой встрече.',
    screenings_recommended: [
      'Еженедельный осмотр акушера-гинеколога',
      'Запись КТГ плода',
      'Контроль артериального давления и веса'
    ],
    tips: [
      'Держите документы (паспорт и обменную карту) всегда при себе',
      'Заряжайте телефон и сохраните номер скорой помощи 103'
    ]
  };
}
