"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { propertySchema, type PropertyFormInput } from "@/lib/schemas";
import { createListing, updateListing, deleteListing } from "@/app/actions/admin-listings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploader } from "@/components/admin/image-uploader";
import { AmenityChips } from "@/components/admin/amenity-chips";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import type { Property } from "@/types/supabase";
import { cn } from "@/lib/utils";

function toFormValues(property?: Property | null): Partial<PropertyFormInput> {
  if (!property) {
    return { property_type: "house", status: "active", featured: false, published: true, images: [] };
  }
  return {
    slug: property.slug,
    title: property.title,
    description: property.description ?? "",
    price: property.price,
    address: property.address,
    city: property.city ?? "Houston",
    state: property.state ?? "TX",
    zip_code: property.zip_code ?? "",
    neighborhood: property.neighborhood ?? "",
    bedrooms: property.bedrooms ?? undefined,
    bathrooms: property.bathrooms ?? undefined,
    square_feet: property.square_feet ?? undefined,
    lot_size: property.lot_size ?? "",
    year_built: property.year_built ?? undefined,
    property_type: property.property_type ?? "house",
    status: property.status,
    images: property.images ?? [],
    virtual_tour_url: property.virtual_tour_url ?? "",
    amenities: (property.amenities ?? []).join(", "),
    mls_number: property.mls_number ?? "",
    featured: property.featured,
    published: property.published,
    meta_title: property.meta_title ?? "",
    meta_description: property.meta_description ?? "",
    og_image: property.og_image ?? "",
  };
}

export function ListingForm({ property }: { property?: Property | null }) {
  const isEdit = !!property;
  const [deleting, setDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: toFormValues(property),
  });

  async function onSubmit(values: PropertyFormInput) {
    const result = isEdit
      ? await updateListing(property!.id, values)
      : await createListing(values);
    if (result && !result.success) {
      toast.error(result.error);
    }
  }

  async function onDelete() {
    if (!property) return;
    if (!confirm(`Delete "${property.title}"? This can't be undone.`)) return;
    setDeleting(true);
    const result = await deleteListing(property.id);
    if (!result.success) {
      toast.error(result.error);
      setDeleting(false);
    } else {
      toast.success("Listing deleted.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title *" error={errors.title?.message}>
          <Input {...register("title")} />
        </Field>
        <Field label="Slug *" error={errors.slug?.message}>
          <Input {...register("slug")} placeholder="123-main-st" />
        </Field>
      </div>

      <Field label="Description">
        <Textarea rows={4} {...register("description")} />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Price *" error={errors.price?.message}>
          <Input type="number" {...register("price")} />
        </Field>
        <Field label="Property type">
          <Controller
            control={control}
            name="property_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Status">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="coming_soon">Coming soon</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Address *" error={errors.address?.message}>
        <Input {...register("address")} />
      </Field>

      <div className="grid grid-cols-4 gap-4">
        <Field label="City">
          <Input {...register("city")} />
        </Field>
        <Field label="State">
          <Input {...register("state")} />
        </Field>
        <Field label="Zip">
          <Input {...register("zip_code")} />
        </Field>
        <Field label="Neighborhood">
          <Input {...register("neighborhood")} />
        </Field>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Field label="Beds">
          <Input type="number" {...register("bedrooms")} />
        </Field>
        <Field label="Baths">
          <Input type="number" step="0.5" {...register("bathrooms")} />
        </Field>
        <Field label="Sqft">
          <Input type="number" {...register("square_feet")} />
        </Field>
        <Field label="Lot size">
          <Input {...register("lot_size")} />
        </Field>
        <Field label="Year built">
          <Input type="number" {...register("year_built")} />
        </Field>
      </div>

      <Field label="Photos" error={errors.images?.message as string | undefined}>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <ImageUploader value={field.value ?? []} onChange={field.onChange} />
          )}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Virtual tour URL">
          <Input {...register("virtual_tour_url")} />
        </Field>
        <Field label="MLS number">
          <Input {...register("mls_number")} />
        </Field>
      </div>

      <Field label="Amenities">
        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <AmenityChips value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Meta title (SEO)">
          <Input {...register("meta_title")} placeholder="Optional — defaults to the listing title" />
        </Field>
        <Field label="Meta description (SEO)">
          <Input {...register("meta_description")} placeholder="Optional — shown in Google results" />
        </Field>
      </div>

      <Field label="Social share image (OG image)" hint="Optional — defaults to the cover photo">
        <Controller
          control={control}
          name="og_image"
          render={({ field }) => (
            <ImageUploader
              value={field.value ? [field.value] : []}
              onChange={(urls) => field.onChange(urls[0] ?? "")}
              bucket="property-images"
              folder="og"
              single
            />
          )}
        />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
            )}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Controller
            control={control}
            name="published"
            render={({ field }) => (
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
            )}
          />
          Published
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-6")}
        >
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create listing"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6 border-brand text-brand")}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-slate">{hint}</p>}
      {error && <p className="text-xs text-brand">{error}</p>}
    </div>
  );
}
