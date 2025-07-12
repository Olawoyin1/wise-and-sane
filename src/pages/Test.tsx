// import React, { useRef } from 'react';
// import JoditEditor from 'jodit-react';

// interface Props {
//   value: string;
//   onChange: (newContent: string) => void;
// }

// // Replace with your actual Cloudinary details
// const CLOUDINARY_UPLOAD_PRESET = 'sosioloji';
// const CLOUDINARY_CLOUD_NAME = 'dunid4t4g';

// const JoditEditorComponent: React.FC<Props> = ({ value, onChange }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const config = {
//       height: 800, 
//     readonly: false,
//     uploader: {
//       insertImageAsBase64URI: true,
//       url: '', // disables default upload prompt
//     },
//     buttons: [
//       'bold', 'italic', 'underline', '|',
//       'ul', 'ol', '|',
//       'link', '|',
//       'align', 'undo', 'redo', '|',
//       {
//         name: 'uploadImageCustom',
//         iconURL: 'https://img.icons8.com/ios/24/upload.png',
//         exec: () => inputRef.current?.click(),
//         tooltip: 'Upload Image',
//       }
//     ],
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     try {
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       const url = data.secure_url;

//       console.log('✅ Uploaded image:', url);

//       // ✅ Insert image by updating the value
//       const imgHTML = `<img src="${url}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
//       onChange(value + imgHTML); // append image HTML

//     } catch (err) {
//       console.error('❌ Image upload failed:', err);
//     }
//   };

//   return (
//     <div>
//       <JoditEditor
//         value={value}
//         config={config}
//         tabIndex={1}
//         onBlur={(newContent) => onChange(newContent)}
//       />
//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={handleImageUpload}
//       />
//     </div>
//   );
// };

// export default JoditEditorComponent;



import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

interface Props {
  value: string;
  onChange: (newContent: string) => void;
}

const CLOUDINARY_UPLOAD_PRESET = 'sosioloji';
const CLOUDINARY_CLOUD_NAME = 'dunid4t4g';

const JoditEditorComponent: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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

      const imgHTML = `
        <div style="text-align: center;">
          <img src="${url}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
        </div>
      `;
      onChange(value + imgHTML);
    } catch (err) {
      console.error('❌ Image upload failed:', err);
    }
  };

  const config = {
    height: 800,
    readonly: false,
    iframe: false,
    contentStyle: `
      h1 {
        font-size: 2rem !important;
        font-weight: bold !important;
        color: #1a1a1a;
        margin: 1.5rem 0 1rem;
      }

      div[data-toc="true"] {
        font-size: 1.25rem;
        font-weight: 600;
        padding: 10px;
        background-color: #f8fafc;
        border: 2px dashed #94a3b8;
        border-radius: 6px;
        text-align: center;
        margin: 1.5rem 0;
      }
    `,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'link', '|',
      'align', 'undo', 'redo', '|',
      {
        name: 'insertTOC',
        iconURL: 'https://img.icons8.com/ios/24/book.png',
        exec: (editor: any) => {
          editor.selection.insertHTML(
            `<div data-toc="true">📚 Table of Contents</div><p></p>`
          );
        },
        tooltip: 'Insert Table of Contents',
      },
      {
        name: 'uploadImageCustom',
        iconURL: 'https://img.icons8.com/ios/24/upload.png',
        exec: () => inputRef.current?.click(),
        tooltip: 'Upload Image',
      },
    ],
  };

  return (
    <div>
      <JoditEditor
        value={value}
        config={config}
        tabIndex={1}
        onBlur={onChange}
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
