import { httpService } from "../http-service";

export enum TaskState {
  CREATED = "CREATED",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  name: string;
  dueDate: string;
  description: string;
  state: TaskState;
  position: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

class TasksService {
  public async getTasks(projectId?: string) {
    const res = await httpService.get("tasks/getTasks/" + projectId);
    console.log(res.data);
    return res.data;
  }
  public async getTask(id: string) {
    const res = await httpService.get(`tasks/getTask/${id}`);
    return res.data;
  }
  public async createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
    const res = await httpService.post(`tasks/createTask`, task);
    return res.data;
  }
  public async updateTask(id: string, task: Partial<Task>) {
    const res = await httpService.patch(`tasks/updateTask/${id}`, task);
    return res.data;
  }
  public async deleteTask(id: string) {
    const res = await httpService.delete(`tasks/deleteTask/${id}`);
    return res.data;
  }
}

export const tasksService = new TasksService();
