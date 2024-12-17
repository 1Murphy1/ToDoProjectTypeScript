import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../../storage';

interface Task {
    id: string;
    title: string;
    about: string;
    isPinned?: boolean;
}

type TaskState = Task[];

interface UpdateTaskPayload {
    id: string;
    updates: Partial<Task>;
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: storage.getTasks() as TaskState,
    reducers: {
        addTask: (state, action: PayloadAction<{ title: string; about: string }>) => {
            const newTask = storage.addTask(action.payload);
            state.push(newTask);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            storage.deleteTask(action.payload);
            return state.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
            const { id, updates } = action.payload;
            storage.updateTask(id, updates);
            const task = state.find(task => task.id === id);
            if (task) {
                Object.assign(task, updates);
            }
        },
        reorderTasks: (state, action: PayloadAction<TaskState>) => {
            return action.payload;
        },
        pinTask: (state, action: PayloadAction<Task>) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task && !task.isPinned) {
              const pinnedTasksCount = state.filter((task) => task.isPinned).length;
              if (pinnedTasksCount < 3) {
                task.isPinned = true;
              } else {
                console.log(task.title + ": закреплено максимум задач");
              }
            }
          },
          unpinTask: (state, action: PayloadAction<{ id: string }>) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
              task.isPinned = false;
            }
          },
    },
});

export const { addTask, deleteTask, updateTask, reorderTasks, pinTask, unpinTask, } = taskSlice.actions;

export default taskSlice.reducer;
