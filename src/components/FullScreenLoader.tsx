import { Loader2 } from "lucide-react";

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}

export default FullScreenLoader;
