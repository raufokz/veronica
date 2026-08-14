"use client";

import { useRef, useState } from "react";
import { Star, X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const BUCKET = "property-images";
const MAX_SIZE_MB = 8;

function extractStoragePath(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    const supabase = createClient();
    const list = Array.from(files);

    const valid = list.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} isn't an image.`);
        return false;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} is over ${MAX_SIZE_MB}MB.`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of valid) {
      const ext = file.name.split(".").pop();
      const path = `listings/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setUploading(false);
    if (uploaded.length > 0) {
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} uploaded.`);
    }
  }

  async function removeImage(index: number) {
    const url = value[index];
    const next = value.filter((_, i) => i !== index);
    onChange(next);

    const path = extractStoragePath(url);
    if (path) {
      const supabase = createClient();
      await supabase.storage.from(BUCKET).remove([path]);
    }
  }

  function setCover(index: number) {
    if (index === 0) return;
    const next = [...value];
    const [chosen] = next.splice(index, 1);
    next.unshift(chosen);
    onChange(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          dragOver ? "border-brand bg-brand/5" : "border-black/15 hover:border-black/30"
        )}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-brand" />
        ) : (
          <Upload className="size-6 text-slate" />
        )}
        <p className="text-sm text-slate">
          <span className="font-medium text-ink">Drag photos here</span> or click to browse
        </p>
        <p className="text-xs text-slate">JPG, PNG, WebP — up to {MAX_SIZE_MB}MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {value.map((url, index) => (
            <div key={url} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />

              {index === 0 && (
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-brand px-2 py-1 text-[11px] font-medium text-white">
                  <Star className="size-3 fill-white" />
                  Cover
                </span>
              )}

              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setCover(index)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium hover:bg-white/90"
                  >
                    Set as cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Remove photo"
                  className="rounded-full bg-white p-1.5 hover:bg-white/90"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
