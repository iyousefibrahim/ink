import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";
import useCreatePost from "../hooks/useCreatePost";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCreatePost();

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutate({
      post: { content },
      imageFile: selectedFile,
    });

    setContent("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Create a Post
            </h2>

            {/* Textarea */}
            <div className="relative">
              <textarea
                className={`w-full min-h-[80px] p-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-blue-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  content.length > 280
                    ? "border-red-300 dark:border-red-600 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                }`}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={330}
              />
              <div className="absolute bottom-2 right-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {content.length}/280
                </span>
              </div>
            </div>

            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              {!selectedFile ? (
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 group"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Image className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                      Add an image
                    </span>
                  </div>
                </label>
              ) : (
                <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-full max-h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end pt-3 border-t border-gray-100 dark:border-gray-800 gap-2">
              {content.trim() && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setContent("");
                    removeSelectedFile();
                  }}
                  className="px-4 py-1 text-sm border-gray-200 dark:text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Clear
                </Button>
              )}

              <Button
                onClick={handlePost}
                disabled={!content.trim() || isPending || content.length > 280}
                className="px-6 py-1 bg-primary text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
