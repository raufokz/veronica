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
export type LeadStatus = "new" | "contacted" | "nurturing" | "closed" | "archived";

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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Neighborhood = Database["public"]["Tables"]["neighborhoods"]["Row"];
