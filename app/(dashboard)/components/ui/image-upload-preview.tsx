import Image from "next/image";
import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  classname?: string;
};

const ImageUploadPreview = ({
  label,
  value,
  onChange,
  classname,
}: TImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  return (
    <div className={classname}>
      <div
        className="w-50 h-50 border-2 border-dashed border-primary bg-primary/5 rounded-lg flex flex-col justify-center items-center"
        onClick={handleImageClick}
      >
        {value ? (
          <Image
            src={value}
            alt="Preview Product"
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium">Click to Upload</span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
