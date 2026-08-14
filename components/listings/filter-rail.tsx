"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

const copy = {
  propertyType: { en: "Property type", es: "Tipo de propiedad" },
  status: { en: "Status", es: "Estado" },
  neighborhood: { en: "Neighborhood", es: "Vecindario" },
  minPrice: { en: "Min price", es: "Precio mínimo" },
  maxPrice: { en: "Max price", es: "Precio máximo" },
  beds: { en: "Beds (min)", es: "Recámaras (mín)" },
  baths: { en: "Baths (min)", es: "Baños (mín)" },
  any: { en: "Any", es: "Cualquiera" },
  clear: { en: "Clear filters", es: "Limpiar filtros" },
};

const propertyTypes = [
  { value: "house", en: "House", es: "Casa" },
  { value: "condo", en: "Condo", es: "Condominio" },
  { value: "townhouse", en: "Townhouse", es: "Casa adosada" },
  { value: "land", en: "Land", es: "Terreno" },
  { value: "commercial", en: "Commercial", es: "Comercial" },
];

const statuses = [
  { value: "active", en: "For Sale", es: "En Venta" },
  { value: "pending", en: "Pending", es: "Pendiente" },
  { value: "coming_soon", en: "Coming Soon", es: "Próximamente" },
  { value: "sold", en: "Sold", es: "Vendida" },
];

export function FilterRail() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="space-y-6 rounded-xl border border-black/10 bg-sand p-5 h-fit">
      <div className="space-y-1.5">
        <Label>{copy.propertyType[lang]}</Label>
        <Select value={searchParams.get("type") ?? ""} onValueChange={(v) => setParam("type", v)}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={copy.any[lang]} />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((pt) => (
              <SelectItem key={pt.value} value={pt.value}>
                {pt[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>{copy.status[lang]}</Label>
        <Select value={searchParams.get("status") ?? ""} onValueChange={(v) => setParam("status", v)}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={copy.any[lang]} />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>{copy.neighborhood[lang]}</Label>
        <Select
          value={searchParams.get("neighborhood") ?? ""}
          onValueChange={(v) => setParam("neighborhood", v)}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={copy.any[lang]} />
          </SelectTrigger>
          <SelectContent>
            {siteConfig.serviceAreas
              .filter((a) => a !== "Houston")
              .map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>{copy.minPrice[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            defaultValue={searchParams.get("minPrice") ?? ""}
            onBlur={(e) => setParam("minPrice", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>{copy.maxPrice[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={(e) => setParam("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>{copy.beds[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            defaultValue={searchParams.get("beds") ?? ""}
            onBlur={(e) => setParam("beds", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>{copy.baths[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            defaultValue={searchParams.get("baths") ?? ""}
            onBlur={(e) => setParam("baths", e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={() => router.push(pathname)}
        className="text-sm font-medium text-brand hover:underline"
      >
        {copy.clear[lang]}
      </button>
    </aside>
  );
}
