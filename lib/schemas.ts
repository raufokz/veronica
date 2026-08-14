import { z } from "zod";

export const leadSchema = z.object({
  full_name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  interest_type: z.enum(["buying", "selling", "investing", "valuation", "other"]),
  message: z.string().max(2000).optional(),
  preferred_language: z.enum(["en", "es"]).default("en"),
  property_id: z.string().uuid().optional().or(z.literal("")),
  source_page: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot — must stay empty
});

// Input: shape before defaults are applied (what forms submit — defaulted fields optional).
export type LeadInput = z.input<typeof leadSchema>;
// Output: shape after parsing (defaults applied) — what the server action works with internally.
export type ParsedLead = z.output<typeof leadSchema>;

export const propertySchema = z.object({
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  address: z.string().min(2, "Address is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  neighborhood: z.string().optional(),
  bedrooms: z.coerce.number().int().optional(),
  bathrooms: z.coerce.number().optional(),
  square_feet: z.coerce.number().int().optional(),
  lot_size: z.string().optional(),
  year_built: z.coerce.number().int().optional(),
  property_type: z.enum(["house", "condo", "townhouse", "land", "commercial"]),
  status: z.enum(["active", "pending", "sold", "coming_soon"]),
  images: z.array(z.string()).default([]),
  virtual_tour_url: z.string().optional(),
  amenities: z.string().optional(), // comma-separated in the form, split before saving
  mls_number: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(200).optional(),
  og_image: z.string().optional(),
});

export type PropertyFormInput = z.input<typeof propertySchema>;

export const testimonialSchema = z.object({
  client_name: z.string().min(2, "Name is required"),
  client_location: z.string().optional(),
  content: z.string().min(2, "Testimonial content is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  transaction_type: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
});

export type TestimonialFormInput = z.input<typeof testimonialSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, "Write some content first"),
  category: z.enum(["market_trends", "buying_tips", "selling_guide", "investment", "community"]).optional(),
  cover_image: z.string().optional(),
  tags: z.string().optional(), // comma-separated in the form, split before saving
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
  published_at: z.string().optional(), // ISO date, "" means now for published
  author: z.string().optional(),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(200).optional(),
  og_image: z.string().optional(),
});

export type BlogPostFormInput = z.input<typeof blogPostSchema>;

export const siteSettingsSchema = z.object({
  site_title: z.string().optional(),
  site_description: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email("Enter a valid email").or(z.literal("")).optional(),
  contact_address: z.string().optional(),
  facebook_url: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  instagram_url: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  pinterest_url: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  youtube_url: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  hero_headline: z.string().optional(),
  hero_subtitle: z.string().optional(),
  hero_cta_primary: z.string().optional(),
  hero_cta_secondary: z.string().optional(),
  license_number: z.string().optional(),
  mls_id: z.string().optional(),
  brokerage_name: z.string().optional(),
});

export type SiteSettingsFormInput = z.input<typeof siteSettingsSchema>;

export const appointmentSchema = z.object({
  client_name: z.string().min(2, "Client name is required"),
  client_email: z.string().email("Enter a valid email").or(z.literal("")).optional(),
  client_phone: z.string().optional(),
  appointment_date: z.string().min(1, "Date is required"),
  appointment_time: z.string().min(1, "Time is required"),
  duration_minutes: z.coerce.number().int().min(15).default(60),
  appointment_type: z.enum(["showing", "open_house", "consultation", "closing"]).default("showing"),
  notes: z.string().optional(),
  property_id: z.string().uuid().or(z.literal("")).optional(),
  lead_id: z.string().uuid().or(z.literal("")).optional(),
});

export type AppointmentFormInput = z.input<typeof appointmentSchema>;
