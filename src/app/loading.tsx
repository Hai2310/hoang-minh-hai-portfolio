import { LoadingSkeleton } from "@/components/ui/States";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" role="status" aria-label="Loading page">
      <LoadingSkeleton rows={8} />
    </div>
  );
}
