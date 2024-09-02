import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/upload.module.css";
import Image from "next/image";

interface BucketFile {
  name: string;
  url: string;
  contentType: string;
  size: string;
  updated: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bucketFiles, setBucketFiles] = useState<BucketFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    try {
      const response = await axios.post("/api/upload/postUploads", {
        fileName: file.name,
      });

      const { url, fields } = response.data;

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await axios.post(url, formData, {
        headers: {"Content-type": "multi-part/formdata"}
      });

      if (uploadResponse.status === 204) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed:", uploadResponse.status, uploadResponse.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const getUploads = async() => {
    try {
      const response = await axios.get("/api/upload/getUploads");
      const data = response.data;
      setBucketFiles(data);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUploads();
  }, [])
  
  const photoFiles = bucketFiles.filter((file) => file.contentType.startsWith("image/"));
  const videoFiles = bucketFiles.filter((file) => file.contentType.startsWith("video/"));

  return (
    <div>
      <div className={styles.upload_container_parent}>
        <div className={styles.upload_container}>
          <label htmlFor="file-upload" className={styles.upload_label}>
            <img
              src="/upload-icon.jpg"
              alt="Upload Icon"
              className={styles.upload}
              width={30}
              height={30}
            />
            {file && file.name}
          </label>
          <input
            id="file-upload"
            className={styles.hidden}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <button className={styles.submit_button} onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
      
      <div className={styles.files_section}>
          <h1>Uploaded Photos</h1>
          <div className={styles.photos_grid}>
            {photoFiles.map((file) => (
              <div key={file.name} className={styles.file_item}>
                <img
                  src={file.url}
                  alt={file.name}
                  width={100}
                  height={100}
                  className={styles.file_preview}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.files_section}>
          <h1>Uploaded Videos</h1>
          <div className={styles.video_grid}>
            {videoFiles.map((file) => (
              <div key={file.name} className={styles.file_item}>
                <video 
                  src={file.url} 
                  controls 
                  className={styles.file_preview} 
                  width={500} 
                  height={200} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Upload;