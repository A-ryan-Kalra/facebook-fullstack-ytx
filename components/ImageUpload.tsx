import axios from "axios";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

interface DropZoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}
export const uploadAtom = atom(false);

function ImageUpload({ label, onChange, disabled, value }: DropZoneProps) {
  const [base64, setBase64] = useState(value);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [upload, setUpload] = useAtom(uploadAtom);

  useEffect(() => {
    if (selectedImages.length > 0) {
      setUpload(true);
    } else {
      setUpload(false);
    }
  }, [selectedImages, setUpload]);

  const onUpload = async () => {
    setUploadStatus("Uploading....");

    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("file", image);
    });

    formData.append("upload_preset", "myUploads");

    try {
      // const response = await axios.post("/api/upload", formData);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwv9j6k7g/image/upload`,
        formData
      );

      // console.log(response);
      // console.log(response?.data?.url);
      // setBase64(response?.data?.url)
      onChange(response?.data?.secure_url);
      setUpload(false);

      setUploadStatus("upload successful");
      toast.success("Image Uploaded");
    } catch (error) {
      console.log("imageUpload " + error);
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
        {selectedImages.length === 0 ? (
          <p>Drag and drop file(s) here, or click to select files</p>
        ) : (
          <div className={"flex items-center gap-2 justify-center relative"}>
            {selectedImages.length > 0 &&
              selectedImages.map((image, index) => (
                <div
                  className="flex items-center justify-center relative w-32 h-32"
                  key={index}
                >
                  <Image
                    src={`${URL.createObjectURL(image)}`}
                    key={index}
                    fill
                    alt="image"
                  />
                  <div
                    className="absolute p-1 hover:bg-neutral-400 shadow-md bg-black top-0 right-0 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImages((prev) =>
                        prev.filter((pre) => pre !== selectedImages[index])
                      );
                    }}
                  >
                    <Icon icon="iconamoon:close" width={20} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {selectedImages.length > 0 && (
        <div
          className={
            "w-fit m-auto cursor-pointer rounded-full p-2 bg-fuchsia-400 shadow-md hover:bg-opacity-60 mt-1 font-semibold "
          }
        >
          {!uploadStatus && <button onClick={onUpload}>Upload</button>}
          <p className="">{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
