"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImageToCloudinary, CloudinaryUploadResult } from "@/lib/cloudinary";

interface CloudinaryUploaderProps {
  onUploaded: (result: CloudinaryUploadResult) => void;
  onClear?: () => void;
}

export default function CloudinaryUploader({ onUploaded, onClear }: CloudinaryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setProgress(0);

    try {
      const result = await uploadImageToCloudinary(file, setProgress);
      onUploaded(result);
      setProgress(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      setProgress(null);
    }
  }

  function handleClear() {
    setPreview(null);
    setProgress(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">Image</label>

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
            border-white/15 bg-white/[0.03] px-6 py-10 text-slate-400 transition-colors hover:border-teal-400/40
            hover:bg-white/[0.05] hover:text-slate-200"
        >
          <ImagePlus className="h-8 w-8" />
          <span className="text-sm">Click to choose an image</span>
          <span className="text-xs text-slate-500">Uploads directly to Cloudinary</span>
        </button>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Selected preview" className="max-h-64 w-full object-cover" />

          {progress !== null && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-night-950/70 backdrop-blur-sm">
              <Loader2 className="h-6 w-6 animate-spin text-teal-400" />
              <span className="text-sm text-slate-200">Uploading… {progress}%</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full
              bg-night-950/80 text-slate-200 backdrop-blur transition-colors hover:bg-night-950"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
