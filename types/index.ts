export type UserRole = 'user' | 'specialist' | 'moderator' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  region: string;
  district?: string;
  created_at: string;
}

export interface Child {
  id: string;
  user_id: string;
  name: string;
  birth_date: string; // ISO date
  gender: 'male' | 'female';
  photo_url?: string;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  user_id: string;
  full_name: string;
  relationship: 'mother' | 'father' | 'child' | 'grandmother' | 'grandfather' | 'guardian';
  age: number;
}

export interface Benefit {
  id: string;
  code: string;
  title: string;
  short_description: string;
  category: 'birth' | 'care_under_3' | 'family_capital' | 'housing' | 'large_family' | 'targeted_social_assistance' | 'child_over_3';
  base_amount_byn: number;
  payment_period: 'единовременно' | 'ежемесячно' | 'целевое финансирование';
  target_group: string;
  eligibility_conditions: string[];
  required_documents: string[];
  application_procedure: string;
  processing_days: string;
  official_authority: string;
  official_source_url: string;
  last_updated_date: string;
  is_active: boolean;
}

export interface BenefitCalculationInput {
  region: string;
  children_count: number;
  child_order: number; // 1-й, 2-й, 3-й и т.д.
  family_status: 'full' | 'single_mother' | 'single_father' | 'large_family' | 'foster';
  has_child_under_3: boolean;
  has_child_disability: boolean;
  employment_status: 'employed' | 'maternity_leave' | 'student' | 'unemployed';
  average_monthly_income_per_capita?: number; // BYN
  housing_queue_needed?: boolean;
}

export interface BenefitCalculationResult {
  lump_sum_total_byn: number;
  monthly_total_byn: number;
  family_capital_byn: number;
  calculated_at: string;
  matched_benefits: {
    benefit: Benefit;
    amount_byn: number;
    period: string;
    note: string;
    qualification_reason: string;
  }[];
}

export interface ArticleCategory {
  id: string;
  slug: string;
  name: string;
  icon_name: string;
  description: string;
}

export interface Article {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  reading_time_minutes: number;
  target_age_group?: 'pregnancy' | '0-1' | '1-3' | '3-6' | '6-12' | 'all';
  views_count: number;
  likes_count: number;
  author_name: string;
  author_title: string;
  is_published: boolean;
  published_at: string;
}

export interface Specialist {
  id: string;
  user_id?: string;
  full_name: string;
  role_title: string;
  specialty: 'psychologist' | 'pediatrician' | 'family_mediator' | 'speech_therapist' | 'lawyer' | 'lactation_consultant';
  qualification: string;
  education: string;
  experience_years: number;
  avatar_url: string;
  rating: number;
  reviews_count: number;
  bio: string;
  is_online: boolean;
  is_verified: boolean;
  available_slots: string[];
}

export interface Consultation {
  id: string;
  user_id: string;
  specialist_id: string;
  specialist_name: string;
  specialty: string;
  question_category: string;
  subject: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduled_at?: string;
  created_at: string;
}

export interface Institution {
  id: string;
  name: string;
  type: 'kindergarten' | 'polyclinic' | 'family_center' | 'crisis_center' | 'accessible_space';
  address: string;
  city: string;
  district: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  phone: string;
  work_hours: string;
  description: string;
  image_url: string;
  free_spots?: number;
  has_ramp: boolean;
  has_elevator: boolean;
  has_mother_child_room: boolean;
  rating: number;
  reviews_count: number;
  website_url?: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  title: string;
  category: 'passport' | 'birth_certificate' | 'family_certificate' | 'benefit_application' | 'maternity_capital' | 'medical';
  file_name: string;
  file_size_formatted: string;
  file_url: string;
  status: 'active' | 'in_process' | 'needs_update';
  expires_at?: string;
  uploaded_at: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  step_order: number;
  institution_to_visit?: string;
  official_link?: string;
  required_docs_summary?: string[];
}

export interface Checklist {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'maternity_leave' | 'child_birth' | 'kindergarten_queue' | 'large_family_status' | 'family_capital_use';
  badge_color: string;
  items: ChecklistItem[];
}

export interface FamilyEvent {
  id: string;
  user_id: string;
  title: string;
  category: 'medical' | 'vaccine' | 'kindergarten' | 'birthday' | 'benefit' | 'leisure';
  date: string; // YYYY-MM-DD
  time?: string;
  child_name?: string;
  location?: string;
  notes?: string;
  is_completed: boolean;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'benefit' | 'medical' | 'chat' | 'system' | 'news';
  action_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  is_from_user: boolean;
  content: string;
  attachments?: { name: string; url: string; type: string }[];
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  specialist_id: string;
  specialist_name: string;
  specialist_avatar: string;
  specialist_role: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export interface ModerationProposal {
  id: string;
  user_id: string;
  user_name: string;
  facility_name: string;
  category: string;
  address: string;
  city: string;
  feature_type: 'ramp' | 'elevator' | 'mother_child_room' | 'accessible_entrance' | 'safe_playground';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
