// components/FileDropInputWithPreview.tsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud } from "lucide-react";

interface Props {
  label: string;
  accept: string;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
}

const FileDropInputWithPreview: React.FC<Props> = ({
  label,
  accept,
  multiple = false,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [files, multiple, onFilesChange]
  );

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    onFilesChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    multiple,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition ${
          isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center text-gray-600 flex flex-col items-center">
          <UploadCloud className="w-6 h-6 mb-1" />
          <p>{label}</p>
          <p className="text-sm text-gray-400">Click or drag files here</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");

            return (
              <div key={index} className="relative group">
                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded shadow"
                  />
                ) : isVideo ? (
                  <video
                    src={URL.createObjectURL(file)}
                    className="h-20 w-20 object-cover rounded shadow"
                    controls
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded shadow">
                    {file.name}
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-0 right-0 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileDropInputWithPreview;
