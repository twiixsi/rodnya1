-- ====================================================================
-- Цифровая экосистема «Родныя» — Структура базы данных Supabase PostgreSQL
-- Разработано для конкурса «100 идей для Беларуси — 2027»
-- ====================================================================

-- 1. ТИПЫ И ПЕРЕЧИСЛЕНИЯ
CREATE TYPE user_role_type AS ENUM ('user', 'specialist', 'moderator', 'admin');
CREATE TYPE doc_status_type AS ENUM ('active', 'in_process', 'needs_update');
CREATE TYPE proposal_status_type AS ENUM ('pending', 'approved', 'rejected');

-- 2. ТАБЛИЦА ПРОФИЛЕЙ ПОЛЬЗОВАТЕЛЕЙ
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role_type DEFAULT 'user'::user_role_type,
    avatar_url TEXT,
    phone TEXT,
    region TEXT DEFAULT 'г. Минск',
    district TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ДЕТИ ПОЛЬЗОВАТЕЛЯ
CREATE TABLE IF NOT EXISTS public.children (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female')),
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ЧЛЕНЫ СЕМЬИ
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    age INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. МЕРЫ ГОСУДАРСТВЕННОЙ ПОДДЕРЖКИ (ПОСОБИЯ, ЛЬГОТЫ, СЕМЕЙНЫЙ КАПИТАЛ)
CREATE TABLE IF NOT EXISTS public.benefits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    category TEXT NOT NULL,
    base_amount_byn NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    payment_period TEXT NOT NULL,
    target_group TEXT NOT NULL,
    eligibility_conditions JSONB DEFAULT '[]'::jsonb,
    required_documents JSONB DEFAULT '[]'::jsonb,
    application_procedure TEXT,
    processing_days TEXT DEFAULT '10-15 рабочих дней',
    official_authority TEXT NOT NULL,
    official_source_url TEXT NOT NULL,
    last_updated_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. КАТЕГОРИИ СТАТЕЙ
CREATE TABLE IF NOT EXISTS public.article_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon_name TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. СТАТЬИ И ГИДЫ
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    reading_time_minutes INT DEFAULT 5,
    target_age_group TEXT DEFAULT 'all',
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    author_name TEXT NOT NULL,
    author_title TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ИЗБРАННЫЕ СТАТЬИ
CREATE TABLE IF NOT EXISTS public.saved_articles (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, article_id)
);

-- 9. СПЕЦИАЛИСТЫ (ПСИХОЛОГИ, ПЕДИАТРЫ, МЕДИАТОРЫ)
CREATE TABLE IF NOT EXISTS public.specialists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    specialty TEXT NOT NULL,
    qualification TEXT NOT NULL,
    education TEXT NOT NULL,
    experience_years INT NOT NULL,
    avatar_url TEXT NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INT DEFAULT 0,
    bio TEXT,
    is_online BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT TRUE,
    available_slots JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ЗАПИСИ НА КОНСУЛЬТАЦИИ
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
    question_category TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    scheduled_at TIMESTAMPTZ,
    meeting_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. УЧРЕЖДЕНИЯ (ДЕТСКИЕ САДЫ, ПОЛИКЛИНИКИ, ЦЕНТРЫ)
CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('kindergarten', 'polyclinic', 'family_center', 'crisis_center', 'accessible_space')),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    region TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone TEXT NOT NULL,
    work_hours TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    free_spots INT DEFAULT 0,
    has_ramp BOOLEAN DEFAULT FALSE,
    has_elevator BOOLEAN DEFAULT FALSE,
    has_mother_child_room BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 4.8,
    reviews_count INT DEFAULT 0,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ИЗБРАННЫЕ УЧРЕЖДЕНИЯ
CREATE TABLE IF NOT EXISTS public.user_favorites (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, institution_id)
);

-- 13. ПРЕДЛОЖЕНИЯ ПОЛЬЗОВАТЕЛЕЙ ПО ДОСТУПНОЙ СРЕДЕ (МОДЕРАЦИЯ)
CREATE TABLE IF NOT EXISTS public.moderation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    facility_name TEXT NOT NULL,
    category TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    feature_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status proposal_status_type DEFAULT 'pending'::proposal_status_type,
    admin_comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ДОКУМЕНТЫ ПОЛЬЗОВАТЕЛЯ
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_formatted TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status doc_status_type DEFAULT 'active'::doc_status_type,
    expires_at DATE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. ЧЕК-ЛИСТЫ И ИХ ЭЛЕМЕНТЫ
CREATE TABLE IF NOT EXISTS public.checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    category TEXT NOT NULL,
    badge_color TEXT DEFAULT '#34785D',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.checklist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    step_order INT NOT NULL,
    institution_to_visit TEXT,
    official_link TEXT,
    required_docs_summary JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.user_checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
    completed_items JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, checklist_id)
);

-- 16. СЕМЕЙНЫЕ СОБЫТИЯ И КАЛЕНДАРЬ
CREATE TABLE IF NOT EXISTS public.user_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    event_date DATE NOT NULL,
    time TEXT,
    child_name TEXT,
    location TEXT,
    notes TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. БЕРЕМЕННОСТЬ И МЕДИЦИНСКИЙ ПРОФИЛЬ
CREATE TABLE IF NOT EXISTS public.pregnancy_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lmp_date DATE NOT NULL,
    estimated_due_date DATE NOT NULL,
    current_week INT DEFAULT 1,
    doctor_name TEXT,
    hospital_name TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. УВЕДОМЛЕНИЯ
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. ДИАЛОГИ И СООБЩЕНИЯ (ЧАТ С ПОМОЩНИКОМ И СПЕЦИАЛИСТАМИ)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialist_id UUID REFERENCES public.specialists(id) ON DELETE SET NULL,
    subject TEXT DEFAULT 'Консультация',
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    unread_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    is_from_user BOOLEAN DEFAULT TRUE,
    content TEXT NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. ЖУРНАЛ АУДИТА ДЛЯ АДМИНИСТРАТИВНОЙ ПАНЕЛИ
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. НАСТРОЙКИ ПЛАТФОРМЫ
CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- НАСТРОЙКА ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Публичные политики (чтение для всех)
CREATE POLICY "Публичный просмотр активных мер поддержки" ON public.benefits FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Публичный просмотр опубликованных статей" ON public.articles FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Публичный просмотр категорий статей" ON public.article_categories FOR SELECT USING (TRUE);
CREATE POLICY "Публичный просмотр каталога учреждений" ON public.institutions FOR SELECT USING (TRUE);
CREATE POLICY "Публичный просмотр специалистов" ON public.specialists FOR SELECT USING (is_verified = TRUE);

-- Приватные политики пользователя (доступ только к своим данным)
CREATE POLICY "Пользователь управляет своим профилем" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Пользователь видит своих детей" ON public.children FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит членов своей семьи" ON public.family_members FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои документы" ON public.documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои события в календаре" ON public.user_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои записи о беременности" ON public.pregnancy_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои уведомления" ON public.notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои диалоги" ON public.conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Пользователь видит свои сообщения" ON public.messages FOR ALL USING (auth.uid() = sender_id OR auth.uid() IN (SELECT user_id FROM public.conversations WHERE id = conversation_id));
