import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

interface EditorBlockProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
}

const CLOUD_NAME = "dunid4t4g";
const UPLOAD_PRESET = "sosioloji";

const EditorBlock = ({ data, onChange }: EditorBlockProps) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return {
      success: 1,
      file: {
        url: data.secure_url,
      },
    };
  };

  useEffect(() => {
    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data,
        autofocus: true,
        onChange: async () => {
          const savedData = await editor.save();
          onChange(savedData);
        },
        onReady: () => {
          ejInstance.current = editor;
          setIsEditorReady(true);
        },
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: uploadToCloudinary,
              },
            },
          },
        },
      });
    }

    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div
        id="editorjs"
        className="border border-gray-300 rounded-md p-4 min-h-[300px] bg-white"
      />
      {!isEditorReady && <p className="text-gray-400">Loading editor...</p>}
    </div>
  );
};

export default EditorBlock;
