import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Revoke the old URL to prevent memory leaks
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            const newPreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(newPreviewUrl);
            setImage(file);
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation(); // Prevent triggering the file input
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setImage(null);
        setPreviewUrl(null);
        if(inputRef.current) {
            inputRef.current.value = ""; // Reset file input
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="relative">
                {previewUrl ? (
                    <>
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            onClick={handleRemoveImage}
                            aria-label="Remove image"
                        >
                            <LuTrash size={18} />
                        </button>
                    </>
                ) : (
                    <div
                        className="w-32 h-32 rounded-full cursor-pointer"
                        onClick={onChooseFile}
                        onKeyDown={(e) => e.key === 'Enter' && onChooseFile()}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload profile photo"
                    >
                        {/* Main placeholder circle */}
                        <div className="relative w-full h-full flex items-center justify-center bg-purple-100 rounded-full">
                            <LuUser className="w-16 h-16 text-purple-400" />

                            {/* Upload button overlay */}
                            <div className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full text-white">
                                <LuUpload size={20} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;