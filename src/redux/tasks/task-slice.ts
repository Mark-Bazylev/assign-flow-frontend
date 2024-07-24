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
          console.log("tasks:", state.tasks);
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
          state.tasks.push(action.payload);
        },
      },
    ),
    updateTask: create.asyncThunk(
      async ({ id, task }: { id: string; task: Partial<Task> }) => {
        return await tasksService.updateTask(id, task);
      },
      {
        fulfilled(state, action) {
          state.currentTask = action.payload;
          const filteredTasks = state.tasks
            .filter(
              (task) =>
                task.state === action.payload.state &&
                task.id !== action.payload.id,
            )
            .sort((a, b) => a.position - b.position);
          console.log(
            "started as:",
            state.tasks
              .filter((task) => task.state === action.payload.state)
              .map((task) => ({
                id: task.id,
                position: task.position,
                name: task.name,
              })),
          );
          console.log(
            "step 1",
            filteredTasks.map((task) => ({
              id: task.id,
              position: task.position,
              name: task.name,
            })),
          );
          filteredTasks.splice(action.payload.position - 1, 0, action.payload);

          console.log(
            "step 2",
            filteredTasks.map((task) => ({
              id: task.id,
              position: task.position,
              name: task.name,
            })),
          );

          for (let i = 0; i < filteredTasks.length; i++) {
            filteredTasks[i].position = i + 1;
          }
          console.log(
            "step 3",
            filteredTasks.map((task) => ({
              id: task.id,
              position: task.position,
              name: task.name,
            })),
          );

          const updatedMap = new Map<string, Task>();
          filteredTasks.forEach((task) => updatedMap.set(task.id, task));
          console.log("map", updatedMap);
          state.tasks = state.tasks.map(
            (item) => updatedMap.get(item.id) || item,
          );
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (id: string) => {
        return await tasksService.deleteTask(id);
      },
      {
        fulfilled(state, action) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.id === action.payload.id,
          );
          state.tasks.splice(taskIndex, 1);
        },
      },
    ),
  }),
});

export const { getTasks, getTask, createTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
