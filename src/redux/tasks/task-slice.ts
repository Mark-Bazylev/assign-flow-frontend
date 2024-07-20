import { createAppSlice } from "../createAppSlice";
import { Task, tasksService } from "../../services/tasks-service/tasks-service";

interface TasksSliceState {
  tasks: Task[];
  currentTask: Task | null;
}
const initialState: TasksSliceState = {
  tasks: [],
  currentTask: null,
};
const taskSlice = createAppSlice({
  name: "task",
  initialState,
  reducers: (create) => ({
    getTasks: create.asyncThunk(
      async (projectId?: string) => {
        return await tasksService.getTasks(projectId);
      },
      {
        fulfilled(state, action) {
          state.tasks = action.payload;
        },
      },
    ),
    getTask: create.asyncThunk(
      async (id: string) => {
        return await tasksService.getTask(id);
      },
      {
        fulfilled(state, action) {
          state.currentTask = action.payload;
        },
      },
    ),
    createTask: create.asyncThunk(
      async (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
        return await tasksService.createTask(task);
      },
      {
        fulfilled(state, action) {
          state.currentTask = action.payload;
        },
      },
    ),
    updateTask: create.asyncThunk(
      async ({
        id,
        task,
      }: {
        id: string;
        task: Omit<Task, "id" | "createdAt" | "updatedAt">;
      }) => {
        return await tasksService.updateTask(id, task);
      },
      {
        fulfilled(state, action) {
          state.currentTask = action.payload;
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (id: string) => {
        return await tasksService.deleteTask(id);
      },
      {
        fulfilled(state, action) {
          //should return a checker that its deleted
        },
      },
    ),
  }),
});

export const { getTasks, getTask, createTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
