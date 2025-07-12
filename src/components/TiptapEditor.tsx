
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import Underline from '@tiptap/extension-underline'
// import React, { useRef, useState, useEffect } from 'react'

// const CLOUDINARY_UPLOAD_PRESET = 'sosioloji'
// const CLOUDINARY_CLOUD_NAME = 'dunid4t4g'

// interface TiptapEditorProps {
//   value: string
//   onChange: (newContent: string) => void
// }

// const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null)
//   const [isFullscreen, setIsFullscreen] = useState(false)

//   const editor = useEditor({
//     extensions: [StarterKit, Underline, Image],
//     content: value || `<h1>Blog Title</h1><p>Write something...</p>`,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML())
//     },
//   })

//   // If parent content changes (value), update the editor
//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value)
//     }
//   }, [value, editor])

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file || !editor) return

//     const formData = new FormData()
//     formData.append('file', file)
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       )

//       const data = await res.json()
//       const url = data.secure_url

//       editor.chain().focus().setImage({ src: url }).run()
//     } catch (error) {
//       console.error('Upload failed:', error)
//     }
//   }

//   if (!editor) return null

//   return (
//     <div className={`editor-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
//       {/* Toolbar */}
//       <div className="toolbar">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive('bold') ? 'active' : ''}
//         >
//           Bold
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive('italic') ? 'active' : ''}
//         >
//           Italic
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={editor.isActive('underline') ? 'active' : ''}
//         >
//           Underline
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//           className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
//         >
//           H1
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
//         >
//           H2
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive('bulletList') ? 'active' : ''}
//         >
//           • List
//         </button>
//         <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//           ―
//         </button>
//         <button onClick={() => fileInputRef.current?.click()}>
//           Upload Image
//         </button>
//         <button onClick={() => setIsFullscreen(!isFullscreen)}>
//           {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
//         </button>
//       </div>

//       {/* Image input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={handleImageUpload}
//       />

//       <EditorContent editor={editor} className="custom-editor min-h-[700px]" />
//     </div>
//   )
// }

// export default TiptapEditor


import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import React, { useRef, useState, useEffect } from 'react'

const CLOUDINARY_UPLOAD_PRESET = 'sosioloji'
const CLOUDINARY_CLOUD_NAME = 'dunid4t4g'

interface TiptapEditorProps {
  value: string
  onChange: (newContent: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: value || `<h1>Blog Title</h1><p>Write something...</p>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync with parent value
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await res.json()
      const url = data.secure_url

      editor.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  if (!editor) return null

  return (
    <div className={`editor-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Toolbar */}
      <div className="toolbar flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'active' : ''}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'active' : ''}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          ―
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* Image input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {/* Editor content with Enter key fix */}
      <EditorContent
        editor={editor}
        className="custom-editor min-h-[700px]"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation() // Prevent Enter from bubbling to form
          }
        }}
      />
    </div>
  )
}

export default TiptapEditor
