import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

function ImageUpload({ label, onChange, disabled, value }: DropZoneProps) {
  const [base64, setBase64] = useState(value);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  console.log(selectedImages);

  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });
    try {
      const response = await axios.post("/api/upload", formData);
      console.log(response?.data?.url);
      // setBase64(response?.data?.url)
      onChange(response?.data?.url);
      setUploadStatus("upload successful");
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
  };

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <div
      className={`w-full p-4 text-white text-center cursor-pointer hover:border-indigo-400 border-2 border-dotted rounded-md border-neutral-600`}
    >
      <div className={`flex items-center justify-center`} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop file(s) here, or click to select files</p>
        )}
      </div>
      <div className={"flex items-center justify-center"}>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img
              src={`${URL.createObjectURL(image)}`}
              width={100}
              height={100}
              key={index}
              alt=""
            />
          ))}
      </div>
      {selectedImages.length > 0 && (
        <div
          className={
            "w-fit m-auto cursor-pointer hover:bg-fuchsia-400 p-1 border-[1px] border-white "
          }
        >
          <button onClick={onUpload}>Upload to Cloudinary</button>
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
