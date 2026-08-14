"use client";

import { useRef, useState } from "react";
import { Star, X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 8;

function extractStoragePath(url: string, bucket: string): string | null {
  const marker = `/object/public/${bucket}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export function ImageUploader({
  value,
  onChange,
  bucket = "property-images",
  folder = "listings",
  single = false,
  maxImages = 15,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  bucket?: string;
  folder?: string;
  single?: boolean;
  maxImages?: number;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    const supabase = createClient();
    let list = Array.from(files);

    if (!single) {
      const remaining = maxImages - value.length;
      if (remaining <= 0) {
        toast.error(`You can have up to ${maxImages} photos.`);
        return;
      }
      if (list.length > remaining) {
        toast.error(`Only ${remaining} more photo${remaining === 1 ? "" : "s"} allowed — uploading the first ${remaining}.`);
        list = list.slice(0, remaining);
      }
    }

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
      const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setUploading(false);
    if (uploaded.length > 0) {
      const next = single ? [...uploaded.slice(-1)] : [...value, ...uploaded];
      onChange(next);
      toast.success(`${next.length} photo${next.length > 1 ? "s" : ""} uploaded.`);
    }
  }

  async function removeImage(index: number) {
    const url = value[index];
    const next = value.filter((_, i) => i !== index);
    onChange(next);

    const path = extractStoragePath(url, bucket);
    if (path) {
      const supabase = createClient();
      await supabase.storage.from(bucket).remove([path]);
    }
  }

  function setCover(index: number) {
    if (index === 0) return;
    const next = [...value];
    const [chosen] = next.splice(index, 1);
    next.unshift(chosen);
    onChange(next);
  }

  function reorder(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    const next = [...value];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
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

      {!single && value.length > 0 && (
        <p className="mt-3 text-xs text-slate">
          {value.length} / {maxImages} photos — drag thumbnails to reorder.
        </p>
      )}

      {value.length > 0 && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {value.map((url, index) => (
            <div
              key={url}
              draggable={!single}
              onDragStart={() => setDraggingIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggingIndex !== null) reorder(draggingIndex, index);
                setDraggingIndex(null);
              }}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-lg border border-black/10 transition-opacity",
                !single && "cursor-grab",
                draggingIndex === index ? "opacity-40" : ""
              )}
            >
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
