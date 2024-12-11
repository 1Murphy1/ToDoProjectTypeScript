import React, { useState } from 'react';

interface EditModalProps {
    task: {
        title: string;
        about: string;
    };
    onSave: (newTitle: string, newAbout: string) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onSave, onClose }) => {
    const [newTitle, setNewTitle] = useState<string>(task.title);
    const [newAbout, setNewAbout] = useState<string>(task.about);

    return (
        <div className="editContainer">
            <div className="editContainer-content yellowOutline">
                <div className="editContainer-content-action">
                    <textarea
                        className="editTitle yellowOutline"
                        rows={2}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        className="editAbout yellowOutline"
                        rows={4}
                        value={newAbout}
                        onChange={(e) => setNewAbout(e.target.value)}
                    />
                    <div className="editButtons">
                        <button className="cancelEdit yellowOutline" onClick={onClose}>Cancel</button>
                        <button className="saveEdit yellowOutline" onClick={() => onSave(newTitle, newAbout)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
