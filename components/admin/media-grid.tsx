"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const BUCKETS = ["property-images", "blog-images"] as const;

type MediaFile = {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
};

function isFolder(file: { id?: string | null; name: string }): boolean {
  // Supabase Storage marks folders with an id ending in a folder indicator.
  return typeof file.id === "string" && file.id.endsWith("/");
}

async function listBucketFiles(bucket: string): Promise<MediaFile[]> {
  const supabase = createClient();
  const files: MediaFile[] = [];

  async function walk(prefix: string, depth: number) {
    if (depth > 3) return;
    const { data, error } = await supabase.storage.from(bucket).list(prefix, {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error || !data) return;

    for (const entry of data) {
      if (isFolder(entry)) {
        await walk(prefix ? `${prefix}/${entry.name}` : entry.name, depth + 1);
      } else {
        const path = prefix ? `${prefix}/${entry.name}` : entry.name;
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
        files.push({
          name: path,
          url: urlData.publicUrl,
          size: entry.metadata?.size ?? 0,
          updatedAt: entry.updated_at ?? "",
        });
      }
    }
  }

  await walk("", 0);
  return files;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaGrid() {
  const [bucket, setBucket] = useState<(typeof BUCKETS)[number]>("property-images");
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    setLoading(true);
    const list = await listBucketFiles(bucket);
    setFiles(list);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket]);

  const visible = search
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  async function uploadFiles(fileList: FileList | File[]) {
    const supabase = createClient();
    const list = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) {
      toast.error("Only images can be uploaded here.");
      return;
    }
    setUploading(true);
    let ok = 0;
    for (const file of list) {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      } else {
        ok++;
      }
    }
    setUploading(false);
    if (ok > 0) {
      toast.success(`${ok} file${ok > 1 ? "s" : ""} uploaded.`);
      void refresh();
    }
  }

  async function deleteFile(file: MediaFile) {
    if (!confirm(`Delete ${file.name}? This can't be undone.`)) return;
    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).remove([file.name]);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted.");
    setFiles((prev) => prev.filter((f) => f.name !== file.name));
  }

  async function copyUrl(file: MediaFile) {
    try {
      await navigator.clipboard.writeText(file.url);
      toast.success("URL copied.");
    } catch {
      toast.error("Couldn't copy the URL");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border border-black/10 p-1">
          {BUCKETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBucket(b)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                bucket === b ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
              )}
            >
              {b}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files…"
          className="h-9 w-48 rounded-full border border-black/10 px-4 text-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload
          </button>
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
      </div>

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
        className={cn(
          "mt-6 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
          dragOver ? "border-brand bg-brand/5" : "border-black/15"
        )}
      >
        <p className="text-sm text-slate">
          <span className="font-medium text-ink">Drop images here</span> to upload to{" "}
          <code className="rounded bg-sand px-1.5 py-0.5">{bucket}</code>
        </p>
      </div>

      {loading ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-xl bg-sand" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-6 rounded-xl border border-black/10 p-12 text-center">
          <ImageIcon className="mx-auto size-8 text-slate" />
          <p className="mt-2 text-sm text-slate">
            {search ? "No files match your search." : "No images in this bucket yet — upload your first one."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((file) => (
            <div key={file.name} className="group relative overflow-hidden rounded-xl border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.url} alt={file.name} className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="truncate text-xs font-medium text-white">{file.name}</p>
                <p className="text-[11px] text-white/70">{formatSize(file.size)}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => copyUrl(file)}
                  aria-label="Copy URL"
                  className="rounded-full bg-white p-2 hover:bg-white/90"
                >
                  <Copy className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteFile(file)}
                  aria-label="Delete"
                  className="rounded-full bg-white p-2 text-brand hover:bg-white/90"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
