import React from 'react';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
    return (
        <div>
            <p className="text-sm text-gray-600">{content}</p>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="button"
                    className="add-btn"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;