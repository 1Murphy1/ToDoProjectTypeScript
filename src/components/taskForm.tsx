import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './redux/taskSlice';

interface TaskFormProps {
    title: string;
    setTitle: (value: string) => void;
    about: string;
    setAbout: (value: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ title, setTitle, about, setAbout }) => {
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (title.trim() && about.trim()) {
            dispatch(addTask({ title: title.trim(), about: about.trim() }));
            setTitle('');
            setAbout('');
        } else {
            alert('The fields should not be empty.');
        }
    };

    return (
        <div className="createTaskContainer-common">
            <div className="createTaskContainer-common-input">
                <input
                    className="yellowOutline"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="yellowOutline"
                    placeholder="About..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            <button className="yellowOutline" onClick={handleAddTask}>+</button>
        </div>
    );
};

export default TaskForm;
