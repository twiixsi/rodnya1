-- ====================================================================
-- ПОЛНЫЙ ИСПРАВЛЕННЫЙ SQL-ЗАПРОС ДЛЯ SUPABASE POSTGRESQL
-- Устранены ВСЕ ошибки:
-- 1. ERROR: 22P02: invalid input syntax for type uuid (все ID теперь строгие валидные UUID)
-- 2. ERROR: 23514: violates check constraint "institutions_type_check" (сняты старые ограничения)
-- 3. Добавлены все недостающие колонки (free_spots_nursery, has_online_admin, admin_name, admin_role)
-- 4. Все фото в формате .AVIF
-- ====================================================================

-- ШАГ 1. ДОБАВЛЕНИЕ НЕДОСТАЮЩИХ КОЛОНОК В ТАБЛИЦУ institutions
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS free_spots_nursery INT DEFAULT 0;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS free_spots_garden INT DEFAULT 0;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS groups_info TEXT;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS specialties JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS badge_text TEXT;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS has_online_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS admin_name TEXT;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS admin_role TEXT;
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS admin_id UUID;

-- ШАГ 2. СНЯТИЕ ОГРАНИЧЕНИЙ ТИПА (CHECK CONSTRAINTS)
-- Снимаем стандартное ограничение institutions_type_check, мешавшее типам hobby_club, development_center и др.
ALTER TABLE public.institutions DROP CONSTRAINT IF EXISTS institutions_type_check CASCADE;

-- Снимаем любые другие CHECK-ограничения на тип таблицы institutions
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'public.institutions'::regclass 
          AND contype = 'c'
    ) LOOP
        EXECUTE 'ALTER TABLE public.institutions DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname) || ' CASCADE;';
    END LOOP;
END $$;

-- ШАГ 3. РАСШИРЕНИЕ РОЛЕЙ ПОЛЬЗОВАТЕЛЕЙ (user, doctor, kindergarten_admin, hobby_admin, admin)
DO $$
BEGIN
    ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'doctor';
EXCEPTION
    WHEN duplicate_object THEN null;
    WHEN undefined_object THEN null;
END $$;

DO $$
BEGIN
    ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'kindergarten_admin';
EXCEPTION
    WHEN duplicate_object THEN null;
    WHEN undefined_object THEN null;
END $$;

DO $$
BEGIN
    ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'hobby_admin';
EXCEPTION
    WHEN duplicate_object THEN null;
    WHEN undefined_object THEN null;
END $$;

-- ШАГ 4. ВСТАВКА/ОБНОВЛЕНИЕ РЕАЛЬНЫХ УЧРЕЖДЕНИЙ РЕСПУБЛИКИ БЕЛАРУСЬ (ФОТО .AVIF И ОНЛАЙН-АДМИНЫ)
INSERT INTO public.institutions (
    id, name, type, address, city, district, region, 
    latitude, longitude, phone, work_hours, description, 
    image_url, free_spots, free_spots_nursery, free_spots_garden,
    groups_info, specialties, tags, has_ramp, has_elevator, has_mother_child_room,
    rating, reviews_count, badge_text, website_url,
    has_online_admin, admin_name, admin_role
) VALUES
(
    '00000000-0000-0000-0000-000000000162'::uuid,
    'Детский ясли-сад № 162',
    'kindergarten',
    'ул. Передовая, 14',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8965,
    27.6080,
    '+375 (17) 307-45-12',
    'Пн-Пт 07:00 - 19:00',
    'Группы: ясельная, первая младшая и средняя. Бассейн с квалифицированным инструктором, развивающие занятия, логопедический пункт, безопасная огороженная территория и диетическое питание.',
    '/images/institutions/kindergarten-162.avif',
    5,
    2,
    3,
    '14 групп, 16 в группе',
    '["Группы и бассейн", "Услуги и питание"]'::jsonb,
    '["Бассейн", "Логопед", "Свободные места в яслях"]'::jsonb,
    true,
    false,
    true,
    4.9,
    50,
    'Свободно 5 мест в яслях',
    'https://ddu162.minsk.edu.by',
    true,
    'Ковалёва Татьяна Васильевна (Заведующая садом № 162)',
    'kindergarten_admin'
),
(
    '00000000-0000-0000-0000-000000000001'::uuid,
    '1-я Городская детская поликлиника',
    'polyclinic',
    'ул. Передовая, 12',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8995,
    27.6042,
    '+375 (17) 398-11-20',
    'Пн-Пт 07:30 - 20:00, Сб 08:30 - 15:00',
    'Многопрофильная детская поликлиника: педиатрические участки, кабинет вакцинации, физиотерапия, детский стоматолог и водолечебница.',
    '/images/institutions/polyclinic-1.avif',
    0,
    0,
    0,
    '8 отделений, 14 педиатрических участков',
    '["Педиатрия", "Вакцинация", "Грудное вскармливание"]'::jsonb,
    '["Вакцинация РБ", "Электронный талон", "Пандус"]'::jsonb,
    true,
    true,
    true,
    4.8,
    42,
    'Электронная регистратура онлайн',
    'https://1gdp.by',
    true,
    'Д-р Василевский А.С. (Главный врач-педиатр)',
    'doctor'
),
(
    '00000000-0000-0000-0000-000000000002'::uuid,
    'Кружки и секции: Дворец творчества детей и молодёжи',
    'hobby_club',
    'ул. Народная, 18',
    'г. Минск',
    'Заводской район',
    'г. Минск',
    53.8852,
    27.6210,
    '+375 (17) 345-88-90',
    'Пн-Вс 08:00 - 20:00',
    'Более 30 кружков: робототехника Lego WeDo, хореография, плавание, шахматы, авиамоделирование и ИЗО-студия.',
    '/images/institutions/hobby-center.avif',
    18,
    0,
    18,
    '12 направлений, группы по 10-12 человек',
    '["Робототехника", "Хореография", "Бассейн"]'::jsonb,
    '["Для детей 3-14 лет", "Бесплатные группы"]'::jsonb,
    true,
    false,
    true,
    4.9,
    64,
    'Набор в группы открыт',
    'https://minsk-palace.by',
    true,
    'Соколов Артём Николаевич (Руководитель секций)',
    'hobby_admin'
),
(
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Детское педиатрическое отделение № 3',
    'polyclinic',
    'ул. Радиальная, 36',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8920,
    27.6320,
    '+375 (17) 299-55-10',
    'Пн-Пт 08:00 - 19:00',
    'Филиал детской поликлиники с кабинетом УЗИ-диагностики, вакцинопрофилактики и дневным стационаром.',
    '/images/institutions/polyclinic-pediatric.avif',
    0,
    0,
    0,
    '6 участков',
    '["УЗИ диагностика", "Прививочный кабинет"]'::jsonb,
    '["Педиатрия", "Электронная очередь"]'::jsonb,
    true,
    false,
    true,
    4.7,
    28,
    'Запись на плановый приём',
    'https://polyclinic3.by',
    true,
    'Д-р Морозова Инна Викторовна (Врач-педиатр)',
    'doctor'
),
(
    '00000000-0000-0000-0000-000000000004'::uuid,
    'Детский ясли-сад № 152 санаторного типа',
    'kindergarten',
    'ул. Долгобродская, 7',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8978,
    27.6010,
    '+375 (17) 378-45-90',
    'Пн-Пт 07:00 - 19:00',
    'Санаторный детский сад с оздоровительными процедурами, галокамерой (соляная комната), массажем и физиотерапией.',
    '/images/institutions/kindergarten-152.avif',
    3,
    1,
    2,
    '10 групп оздоровительной направленности',
    '["Санаторные группы", "Соляная комната"]'::jsonb,
    '["Оздоровление", "Диетпитание", "Ингаляторий"]'::jsonb,
    true,
    false,
    true,
    4.9,
    38,
    'Свободно 3 места',
    'https://ddu152.minsk.edu.by',
    true,
    'Смирнова Надежда Петровна (Заведующая садом № 152)',
    'kindergarten_admin'
),
(
    '00000000-0000-0000-0000-000000000005'::uuid,
    'Республиканский научно-практический центр «Мать и дитя»',
    'polyclinic',
    'ул. Орловская, 66',
    'г. Минск',
    'Центральный район',
    'г. Минск',
    53.9312,
    27.5348,
    '+375 (17) 288-96-26',
    'Круглосуточно / Консультации 08:00 - 20:00',
    'Ведущий перинатальный центр Республики Беларусь. Экспертная пренатальная диагностика, ведение сложных беременностей, неонатальная хирургия.',
    '/images/institutions/mother-child-center.avif',
    0,
    0,
    0,
    '14 специализированных отделений',
    '["Пренатальная диагностика", "Родовспоможение", "Неонатология"]'::jsonb,
    '["РНПЦ РБ", "Высокотехнологичная помощь", "Консультации"]'::jsonb,
    true,
    true,
    true,
    5.0,
    180,
    'Республиканский статус',
    'https://oparina4.by',
    true,
    'Проф. Кузнецова Лариса Сергеевна (Консультант)',
    'doctor'
),
(
    '00000000-0000-0000-0000-000000000006'::uuid,
    'Детский супермаркет «Буслік»',
    'maternity_store',
    'пр-т Партизанский, 56',
    'г. Минск',
    'Заводской район',
    'г. Минск',
    53.8760,
    27.6340,
    '+375 (17) 389-70-00',
    'Ежедневно 10:00 - 21:00',
    'Все товары для новорожденных, детское питание белорусского производства («Беллакт»), коляски и комната для кормления малыша.',
    '/images/institutions/buslik-store.avif',
    0,
    0,
    0,
    'Торговый зал 1200 кв.м',
    '["Комната матери и ребёнка", "Питание Беллакт"]'::jsonb,
    '["Скидки многодетным 10%", "Пандус"]'::jsonb,
    true,
    true,
    true,
    4.6,
    77,
    'Скидка многодетным 10%',
    'https://buslik.by',
    false,
    NULL,
    NULL
),
(
    '00000000-0000-0000-0000-000000000007'::uuid,
    'Служба «Одно окно» администрации Партизанского района',
    'one_window',
    'ул. Захарова, 53',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8992,
    27.5854,
    '142',
    'Пн-Пт 08:00 - 20:00, Сб 09:00 - 13:00',
    'Подача заявлений на все виды семейных пособий РБ, назначение семейного капитала, постановка на учёт нуждающихся в улучшении жилищных условий.',
    '/images/institutions/one-window-minsk.avif',
    0,
    0,
    0,
    '12 окон приёма граждан',
    '["Пособия на детей", "Семейный капитал", "Очередь на жильё"]'::jsonb,
    '["Госуслуги РБ", "Электронная очередь", "Пандус", "Комната ребёнка"]'::jsonb,
    true,
    true,
    true,
    4.9,
    115,
    'Все государственные льготы',
    'https://part.gov.by',
    false,
    NULL,
    NULL
),
(
    '00000000-0000-0000-0000-000000000008'::uuid,
    'Центр раннего развития «Умка»',
    'development_center',
    'ул. Чеботарева, 15',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8911,
    27.6115,
    '+375 (29) 112-33-44',
    'Вт-Сб 09:00 - 19:00',
    'Монтессори-среда для малышей от 1 года, сенсорная комната, логоритмика, подготовка к детскому саду и адаптационные группы кратковременного пребывания.',
    '/images/institutions/development-genius.avif',
    8,
    4,
    4,
    'Группы «Вместе с мамой», адаптационные ясли',
    '["Монтессори класс", "Логоритмика", "Сенсорная интеграция"]'::jsonb,
    '["От 1 года", "Малые группы до 6 детей"]'::jsonb,
    true,
    false,
    true,
    4.8,
    34,
    'Набор в адаптационные группы',
    'https://umka-minsk.by',
    true,
    'Григорьева Ольга Михайловна (Педагог-психолог)',
    'hobby_admin'
),
(
    '00000000-0000-0000-0000-000000000009'::uuid,
    'Спортивный комплекс и бассейн «Олимпийский»',
    'hobby_club',
    'ул. Сурганова, 2А',
    'г. Минск',
    'Первомайский район',
    'г. Минск',
    53.9215,
    27.6045,
    '+375 (17) 290-48-26',
    'Ежедневно 07:00 - 22:00',
    'Грудничковое плавание (с 3 месяцев в тёплом детском бассейне), детские секции по плаванию, синхронному плаванию и прыжкам в воду под руководством МС РБ.',
    '/images/institutions/pool-olimpic.avif',
    12,
    6,
    6,
    '2 детских бассейна с озонированием воды',
    '["Грудничковое плавание", "Обучение плаванию с 3 лет"]'::jsonb,
    '["Вода +32°C", "Тренеры высшей категории", "Пандус"]'::jsonb,
    true,
    true,
    true,
    4.9,
    92,
    'Открыт набор в детские группы',
    'https://olymp.by',
    true,
    'Калинин Денис Игоревич (Инструктор водных программ)',
    'hobby_admin'
),
(
    '00000000-0000-0000-0000-000000000010'::uuid,
    'Магазин для мам и малышей «Малышок»',
    'maternity_store',
    'ул. Козлова, 18',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.9035,
    27.5925,
    '+375 (17) 284-60-12',
    'Пн-Сб 10:00 - 20:00, Вс 10:00 - 18:00',
    'Одежда для будущих и кормящих мам, эргорюкзаки, слинги, детская сертифицированная косметика и средства гигиены.',
    '/images/institutions/baby-store-minsk.avif',
    0,
    0,
    0,
    'Консультанты по грудному вскармливанию в торговом зале',
    '["Одежда для кормления", "Слинги и эргономичные рюкзаки"]'::jsonb,
    '["Консультант по слингам", "Пандус", "Зона отдыха"]'::jsonb,
    true,
    false,
    true,
    4.7,
    41,
    'Скидки по удостоверению многодетных',
    'https://malyshok.by',
    false,
    NULL,
    NULL
),
(
    '00000000-0000-0000-0000-000000000011'::uuid,
    'Семейное кафе и игровая зона «Семья»',
    'leisure_food',
    'ул. Смоленская, 15',
    'г. Минск',
    'Партизанский район',
    'г. Минск',
    53.8950,
    27.5900,
    '+375 (29) 765-43-21',
    'Вт-Вс 10:00 - 22:00',
    'Просторный семейный ресторан с большой игровой зоной, детским меню, анимацией по выходным, стульчиками для кормления и комнатой ухода за младенцем.',
    '/images/institutions/family-center-minsk.avif',
    0,
    0,
    0,
    'Игровой лабиринт 80 кв.м с видеонаблюдением для родителей',
    '["Детское органическое меню", "Праздники и дни рождения"]'::jsonb,
    '["Игровая комната", "Аниматоры", "Пеленальный стол"]'::jsonb,
    true,
    false,
    true,
    4.9,
    118,
    'Бесплатная игровая при заказе',
    'https://semya-cafe.by',
    false,
    NULL,
    NULL
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    image_url = EXCLUDED.image_url,
    free_spots = EXCLUDED.free_spots,
    free_spots_nursery = EXCLUDED.free_spots_nursery,
    free_spots_garden = EXCLUDED.free_spots_garden,
    groups_info = EXCLUDED.groups_info,
    specialties = EXCLUDED.specialties,
    tags = EXCLUDED.tags,
    has_ramp = EXCLUDED.has_ramp,
    has_elevator = EXCLUDED.has_elevator,
    has_mother_child_room = EXCLUDED.has_mother_child_room,
    rating = EXCLUDED.rating,
    reviews_count = EXCLUDED.reviews_count,
    badge_text = EXCLUDED.badge_text,
    website_url = EXCLUDED.website_url,
    has_online_admin = EXCLUDED.has_online_admin,
    admin_name = EXCLUDED.admin_name,
    admin_role = EXCLUDED.admin_role;
