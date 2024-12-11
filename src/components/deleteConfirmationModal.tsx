import React from 'react';

interface DeleteConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirmation">
            <div className="confirmation-dialog yellowOutline">
                <div className="confirmation-content">
                    <p>Delete this task?</p>
                    <div className="confirmation-content-button">
                        <button className="confirm yellowOutline" onClick={onConfirm}>Yes</button>
                        <button className="cancel yellowOutline" onClick={onCancel}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
