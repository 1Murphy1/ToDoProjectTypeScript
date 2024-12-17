import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask, reorderTasks, pinTask, unpinTask, } from './redux/taskSlice';
import TaskForm from './taskForm';
import TodoItem from './ToDoItem';
import EditModal from './editModal';
import ShareModal from './shareModal';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { RootState } from './redux/store';

interface Task {
    id: string;
    title: string;
    about: string;
    isPinned?: boolean;
}

const TodoList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [isShareModalOpen, setShareModalOpen] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    const handleDeleteTask = (taskId: string) => {
        setTaskToDelete(taskId);
        setDeleteConfirmationOpen(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete));
        }
        setDeleteConfirmationOpen(false);
    };

    const handleEditTask = (task: Task) => {
        setEditTask(task);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (newTitle: string, newAbout: string) => {
        if (editTask) {
            dispatch(updateTask({ id: editTask.id, updates: { title: newTitle, about: newAbout } }));
        }
        setEditModalOpen(false);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('index', index.toString());
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        const fromIndex = parseInt(e.dataTransfer.getData('index'), 10);
        const updatedTasks = [...tasks];
        const [draggedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(index, 0, draggedTask);
        dispatch(reorderTasks(updatedTasks));
    };
    const handleTogglePinTask = (task: Task) => {
        if (task.isPinned) {
          dispatch(unpinTask(task));
        } else {
          dispatch(pinTask(task));
        }
      };
      const sortedTasks = [...tasks].sort((a, b) => {
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      });

    return (
        <div className="createTaskContainer">
            <TaskForm title={title} setTitle={setTitle} about={about} setAbout={setAbout} />
            <div className="task-list">
                {sortedTasks.length === 0 ? (
                    <p className="task-list-none">No tasks</p>
                ) : (
                    sortedTasks.map((task: Task, index: number) => (
                        <div
                            key={task.id}
                            className="taskContainer"
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            data-task-id={task.id}
                        >
                            <TodoItem
                                task={task}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                                onShare={() => setShareModalOpen(true)}
                                pinTask={() => handleTogglePinTask(task)}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            />
                        </div>
                    ))
                )}
            </div>
            {isEditModalOpen && <EditModal task={editTask} onSave={handleSaveEdit} onClose={() => setEditModalOpen(false)} />}
            {isShareModalOpen && <ShareModal onClose={() => setShareModalOpen(false)} />}
            {isDeleteConfirmationOpen && (
                <DeleteConfirmationModal onConfirm={confirmDeleteTask} onCancel={() => setDeleteConfirmationOpen(false)} />
            )}
        </div>
    );
};

export default TodoList;
