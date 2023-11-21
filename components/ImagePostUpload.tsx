import axios from "axios";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { postUpload } from "./Form";

interface DropZoneProps {
  onChange: (base64: string) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
}
export const uploadAtom1 = atom(false);
export const uploadAtom2 = atom(false);

function ImagePostUpload({ label, onChange, disabled, value }: DropZoneProps) {
  const [base64, setBase64] = useState(value);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [upload, setUpload] = useAtom(uploadAtom1);
  const [disabled1, setDisabled1] = useAtom(postUpload);
  const [imageUploaded, setImageUploaded] = useAtom(uploadAtom2);

  useEffect(() => {
    if (selectedImages.length > 0) {
      setUpload(true);
    } else {
      setUpload(false);
    }
  }, [selectedImages, setUpload]);

  useEffect(() => {
    if (disabled && setSelectedImages.length > 0) {
      setSelectedImages([]);
      setUploadStatus("");

      setDisabled1(false);
    }
  }, [disabled, setDisabled1, setSelectedImages]);

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

      onChange(response?.data?.secure_url);
      setUpload(false);
      setImageUploaded(true);

      setUploadStatus("upload successful");

      toast.success("Image Uploaded");
    } catch (error) {
      console.log("imageUpload " + error);
      setUploadStatus("Upload failed..");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        setSelectedImages((prevState) => [...prevState, file]);
      });
    },
    [setSelectedImages]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1, noDrag: true });
  return (
    <div
      className={`  hover:bg-indigo-400/20 text-white text-center cursor-pointer  rounded-full shadow-md `}
    >
      <div
        className={`flex items-center justify-center  p-2`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {selectedImages.length === 0 ? (
          <Icon
            icon="tabler:photo-filled"
            width={25}
            className=" text-blue-500"
          />
        ) : (
          <div className={"flex items-center gap-2 justify-center relative"}>
            {selectedImages.length > 0 &&
              selectedImages.map((image, index) => (
                <div
                  className="flex items-center justify-center relative w-12 h-12"
                  key={index}
                >
                  <Image
                    src={`${URL.createObjectURL(image)}`}
                    key={index}
                    className="object-contain"
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
                    <Icon icon="iconamoon:close" width={15} />
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
          <p className="text-[13px]">{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}

export default ImagePostUpload;
