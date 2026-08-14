export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PropertyType = "house" | "condo" | "townhouse" | "land" | "commercial";
export type PropertyStatus = "active" | "pending" | "sold" | "coming_soon";
export type InterestType = "buying" | "selling" | "investing" | "valuation" | "other";
export type PreferredLanguage = "en" | "es";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "showing_scheduled"
  | "offer_made"
  | "closed_won"
  | "closed_lost"
  | "archived";
export type BlogCategory = "market_trends" | "buying_tips" | "selling_guide" | "investment" | "community";
export type BlogStatus = "draft" | "published" | "scheduled" | "archived";
export type AppointmentType = "showing" | "open_house" | "consultation" | "closing";
export type AppointmentStatus = "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";

type PropertiesRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  address: string;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  neighborhood: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: string | null;
  year_built: number | null;
  property_type: PropertyType | null;
  status: PropertyStatus;
  images: string[];
  virtual_tour_url: string | null;
  amenities: string[];
  mls_number: string | null;
  featured: boolean;
  published: boolean;
};

type LeadsRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  interest_type: InterestType | null;
  property_id: string | null;
  message: string | null;
  preferred_language: PreferredLanguage;
  source_page: string | null;
  status: LeadStatus;
  notes: string | null;
};

type LeadNotesRow = {
  id: string;
  lead_id: string;
  note: string;
  created_by: string | null;
  created_at: string;
};

type ActivityLogsRow = {
  id: string;
  created_at: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Json | null;
  ip_address: string | null;
};

type AppointmentsRow = {
  id: string;
  created_at: string;
  lead_id: string | null;
  property_id: string | null;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  appointment_type: AppointmentType | null;
  notes: string | null;
  status: AppointmentStatus;
  timezone: string;
  reminder_sent: boolean;
  client_confirmed: boolean;
};

type SiteSettingsRow = {
  id: number;
  site_title: string | null;
  site_description: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  contact_address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  pinterest_url: string | null;
  youtube_url: string | null;
  hero_headline: string | null;
  hero_subtitle: string | null;
  hero_cta_primary: string | null;
  hero_cta_secondary: string | null;
  license_number: string | null;
  mls_id: string | null;
  brokerage_name: string | null;
  updated_at: string;
};

type TestimonialsRow = {
  id: string;
  created_at: string;
  client_name: string;
  client_location: string | null;
  content: string;
  rating: number | null;
  transaction_type: string | null;
  is_featured: boolean;
  is_published: boolean;
};

type NeighborhoodsRow = {
  id: string;
  created_at: string;
  slug: string;
  name: string;
  headline: string | null;
  body_md: string | null;
  hero_image: string | null;
  median_price: number | null;
  highlights: string[];
  published: boolean;
};

type BlogPostsRow = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: BlogCategory | null;
  cover_image: string | null;
  tags: string[];
  status: BlogStatus;
  published_at: string | null;
  author: string | null;
  meta_description: string | null;
  view_count: number;
};

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: PropertiesRow;
        Insert: Partial<Omit<PropertiesRow, "id" | "created_at" | "updated_at">> & {
          slug: string;
          title: string;
          price: number;
          address: string;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: LeadsRow;
        Insert: Partial<Omit<LeadsRow, "id" | "created_at">> & {
          full_name: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_notes: {
        Row: LeadNotesRow;
        Insert: Partial<Omit<LeadNotesRow, "id" | "created_at">> & {
          lead_id: string;
          note: string;
        };
        Update: Partial<Database["public"]["Tables"]["lead_notes"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      activity_logs: {
        Row: ActivityLogsRow;
        Insert: Partial<Omit<ActivityLogsRow, "id" | "created_at">> & {
          action: string;
          entity_type: string;
        };
        Update: Partial<Database["public"]["Tables"]["activity_logs"]["Insert"]>;
        Relationships: [];
      };
      appointments: {
        Row: AppointmentsRow;
        Insert: Partial<Omit<AppointmentsRow, "id" | "created_at">> & {
          client_name: string;
          appointment_date: string;
          appointment_time: string;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "appointments_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Partial<SiteSettingsRow> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialsRow;
        Insert: Partial<Omit<TestimonialsRow, "id" | "created_at">> & {
          client_name: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };
      neighborhoods: {
        Row: NeighborhoodsRow;
        Insert: Partial<Omit<NeighborhoodsRow, "id" | "created_at">> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["neighborhoods"]["Insert"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostsRow;
        Insert: Partial<Omit<BlogPostsRow, "id" | "created_at" | "updated_at" | "view_count">> & {
          title: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_blog_view: {
        Args: { row_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadNote = Database["public"]["Tables"]["lead_notes"]["Row"];
export type ActivityLog = Database["public"]["Tables"]["activity_logs"]["Row"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Neighborhood = Database["public"]["Tables"]["neighborhoods"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
