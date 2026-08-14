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
