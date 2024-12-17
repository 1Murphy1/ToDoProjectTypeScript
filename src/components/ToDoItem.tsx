import React, { useState } from 'react';

interface Task {
    id: string;
    title: string;
    about: string;
    isPinned?: boolean;
}

interface TodoItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onShare: (id: string) => void;
    onDragStart: (task: Task) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>, task: Task) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    pinTask: (task: Task) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onEdit, onShare, onDragStart, onDrop, onDragOver, pinTask}) => {
    const [isActionPanelVisible, setActionPanelVisible] = useState(false);

    return (
        <div
            className="taskContainer"
            data-task-id={task.id}
            draggable
            onDragStart={() => onDragStart(task)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, task)}
        >
            <div
                className="newTask-container yellowOutline"
                onClick={() => setActionPanelVisible(!isActionPanelVisible)}
            >
                <div className="newTask-container-text">
                    <h3>{task.title}</h3>
                    <p>{task.about}</p>
                </div>
                <button
                    className="yellowOutline deleteButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    x
                </button>
            </div>
            {isActionPanelVisible && (
                <div className="task-action-panel">
                    <div className="task-action-panel-buttons">
                        <button
                            className="share yellowOutline"
                            onClick={(e) => {
                                e.stopPropagation();
                                onShare(task.id);
                            }}
                        >
                            <img src="../src/icons/shareButton.svg" alt="Share" />
                        </button>
                        <button className="info yellowOutline">i</button>
                        <button
                            className="edit yellowOutline"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(task);
                            }}
                        >
                            <img src="../src/icons/editButton.svg" alt="Edit" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                pinTask(task);
                            }}
                            style={{
                                backgroundColor: task.isPinned ? "#FF8303" : "transparent",
                                display:'flex',
                            }}
                        >   <img src="../src/icons/heart.svg" width="40" height="40" />                        
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
