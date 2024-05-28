import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //Upload file to flask server
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const fileUrl = response.data.file_url;
      console.log("File Uploaded Successfully.");
      setUploadMessage(`File uploaded successfully. File URL: ${fileUrl}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('File upload failed');
    }
  };

  

  return (
    <main>
      <div>
        <h1>Upload File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <p>{uploadMessage}</p>
      </div>
    </main>
  );
}

export default App;
