import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

interface Props {
  value: string;
  onChange: (newContent: string) => void;
}

// Replace with your actual Cloudinary details
const CLOUDINARY_UPLOAD_PRESET = 'sosioloji';
const CLOUDINARY_CLOUD_NAME = 'dunid4t4g';

const JoditEditorComponent: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const config = {
      height: 800, 
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
      url: '', // disables default upload prompt
    },
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'link', '|',
      'align', 'undo', 'redo', '|',
      {
        name: 'uploadImageCustom',
        iconURL: 'https://img.icons8.com/ios/24/upload.png',
        exec: () => inputRef.current?.click(),
        tooltip: 'Upload Image',
      }
    ],
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const url = data.secure_url;

      console.log('✅ Uploaded image:', url);

      // ✅ Insert image by updating the value
      const imgHTML = `<img src="${url}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
      onChange(value + imgHTML); // append image HTML

    } catch (err) {
      console.error('❌ Image upload failed:', err);
    }
  };

  return (
    <div>
      <JoditEditor
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => onChange(newContent)}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default JoditEditorComponent;
