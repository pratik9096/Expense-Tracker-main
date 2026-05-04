import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative mb-4">
            {/* Icon selection trigger */}
            <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-8 h-8 flex items-center justify-center">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-full h-full object-contain" />
                    ) : (
                        <LuImage className="text-gray-500 w-6 h-6" />
                    )}
                </div>
                <p className="text-sm text-gray-700 font-medium">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {/* Emoji picker popup */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 relative max-w-md w-full shadow-lg">
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            <LuX />
                        </button>

                        {/* Emoji picker */}
                        <EmojiPicker
                            width="100%"
                            height={400}
                            onEmojiClick={(emoji) => {
                                onSelect(emoji?.imageUrl || "");
                                setIsOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
