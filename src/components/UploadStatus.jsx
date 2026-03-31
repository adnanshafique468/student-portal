// import { useState } from 'react';
// import { uploadFile } from '../services/api';

// function UploadStatus({ studentId, onUploadComplete }) {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file');
//       return;
//     }

//     setUploading(true);
//     try {
//       const fileUrl = await uploadFile(file, studentId, 'documents');
//       setMessage('File uploaded successfully!');
//       onUploadComplete(fileUrl);
//     } catch (error) {
//       setMessage('Upload failed!');
//       console.error(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="border p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-3">Upload Document</h3>
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </div>
//   );
// }

// // export default UploadStatus;


// import { useState } from 'react';

// function UploadStatus({ studentId, onUploadComplete }) {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [progress, setProgress] = useState(0);

//   const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
//   const REGION = import.meta.env.VITE_AWS_REGION;

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file');
//       return;
//     }

//     if (!studentId) {
//       setMessage('Please select a student first');
//       return;
//     }

//     if (!BUCKET_NAME) {
//       setMessage('❌ Bucket name not configured in .env');
//       return;
//     }

//     setUploading(true);
//     setMessage('');
//     setProgress(0);

//     try {
//       const key = `${studentId}/documents/${Date.now()}_${file.name}`;
//       const uploadUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
      
//       console.log("Upload URL:", uploadUrl);
//       console.log("File:", file.name, file.size, file.type);

//       // Use XMLHttpRequest for better progress tracking
//       const xhr = new XMLHttpRequest();
      
//       xhr.upload.addEventListener('progress', (e) => {
//         if (e.lengthComputable) {
//           const percent = (e.loaded / e.total) * 100;
//           setProgress(percent);
//           console.log(`Upload progress: ${percent.toFixed(1)}%`);
//         }
//       });

//       xhr.addEventListener('load', () => {
//         console.log("Upload response status:", xhr.status);
//         if (xhr.status === 200) {
//           setMessage('✅ File uploaded successfully!');
//           onUploadComplete(uploadUrl);
//         } else {
//           setMessage(`❌ Upload failed: ${xhr.status} ${xhr.statusText}`);
//           if (xhr.status === 403) {
//             setMessage('❌ Access Denied! Check S3 bucket policy and permissions');
//           }
//           if (xhr.status === 404) {
//             setMessage('❌ Bucket not found! Check bucket name in .env');
//           }
//         }
//         setUploading(false);
//       });

//       xhr.addEventListener('error', () => {
//         console.error("XHR error occurred");
//         setMessage('❌ Network error! Check your internet connection and CORS settings');
//         setUploading(false);
//       });

//       xhr.open('PUT', uploadUrl);
//       xhr.setRequestHeader('Content-Type', file.type);
//       xhr.send(file);

//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage(`❌ Error: ${error.message}`);
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="border p-4 rounded-lg bg-white">
//       <h3 className="text-lg font-semibold mb-3">📎 Upload Document</h3>
      
//       {/* Debug Info */}
//       <div className="bg-gray-50 p-3 rounded mb-3 text-xs font-mono">
//         <p className="font-semibold mb-1">🔧 Debug Info:</p>
//         <p>Bucket: <span className="text-blue-600">{BUCKET_NAME || '❌ Not set'}</span></p>
//         <p>Region: <span className="text-blue-600">{REGION || '❌ Not set'}</span></p>
//         <p>Student ID: <span className="text-blue-600">{studentId || '❌ Not selected'}</span></p>
//       </div>
      
//       {/* File Input */}
//       <input
//         type="file"
//         onChange={(e) => {
//           setFile(e.target.files[0]);
//           setMessage('');
//         }}
//         className="mb-3 block w-full text-sm text-gray-500
//           file:mr-4 file:py-2 file:px-4
//           file:rounded-full file:border-0
//           file:text-sm file:font-semibold
//           file:bg-blue-50 file:text-blue-700
//           hover:file:bg-blue-100"
//         disabled={uploading}
//       />
      
//       {/* Progress Bar */}
//       {uploading && progress > 0 && (
//         <div className="mb-3">
//           <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div 
//               className="bg-blue-600 rounded-full h-2 transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <p className="text-sm text-gray-600 mt-1 text-center">{Math.round(progress)}% uploaded</p>
//         </div>
//       )}
      
//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         disabled={uploading || !file || !studentId}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg 
//           hover:bg-blue-700 transition disabled:bg-gray-400 
//           disabled:cursor-not-allowed font-semibold"
//       >
//         {uploading ? '⏳ Uploading...' : '📤 Upload File'}
//       </button>
      
//       {/* Message Display */}
//       {message && (
//         <div className={`mt-3 p-3 rounded-lg text-sm ${
//           message.includes('✅') ? 'bg-green-100 text-green-700 border border-green-200' : 
//           message.includes('❌') ? 'bg-red-100 text-red-700 border border-red-200' :
//           'bg-yellow-100 text-yellow-700 border border-yellow-200'
//         }`}>
//           {message}
//         </div>
//       )}
      
//       {/* File Info */}
//       {file && !uploading && (
//         <div className="mt-3 text-xs text-gray-500">
//           Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadStatus;


import { useState } from 'react';

function UploadStatus({ studentId, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [filePreview, setFilePreview] = useState(null);

  const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
  const REGION = import.meta.env.VITE_AWS_REGION;

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
      
      // Preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    if (!studentId) {
      setMessage('Please select a student first');
      return;
    }

    setUploading(true);
    setMessage('');
    setProgress(0);

    try {
      const key = `${studentId}/documents/${Date.now()}_${file.name}`;
      const uploadUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          setProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setMessage('✅ File uploaded successfully!');
          setFile(null);
          setFilePreview(null);
          onUploadComplete(uploadUrl);
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage(`❌ Upload failed: ${xhr.statusText}`);
        }
        setUploading(false);
        setProgress(0);
      });

      xhr.addEventListener('error', () => {
        setMessage('❌ Network error. Please try again.');
        setUploading(false);
        setProgress(0);
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);

    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Upload failed. Please try again.');
      setUploading(false);
      setProgress(0);
    }
  };

  const getFileIcon = () => {
    if (!file) return '📄';
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type === 'application/pdf') return '📑';
    if (file.type.startsWith('text/')) return '📝';
    return '📎';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">📎</span>
          Upload Document
        </h3>
        <p className="text-sm text-gray-500 mt-1">Upload student documents, photos, or assignments</p>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* File Input Area */}
        <div className="mb-6">
          <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
            ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="text-4xl mb-2">{getFileIcon()}</span>
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, Images, Documents (MAX. 10MB)</p>
            </div>
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Selected File Info */}
        {file && !uploading && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFileIcon()}</span>
                <div>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setFilePreview(null);
                }}
                className="text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
            {filePreview && (
              <div className="mt-3">
                <img src={filePreview} alt="Preview" className="max-h-32 rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Uploading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !file || !studentId}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${(uploading || !file || !studentId) 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-[1.02]'}`}
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <span>📤</span>
              Upload File
            </>
          )}
        </button>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Student Info (subtle) */}
        {studentId && !uploading && !file && (
          <p className="mt-4 text-xs text-center text-gray-400">
            Ready to upload for student: {studentId}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadStatus;