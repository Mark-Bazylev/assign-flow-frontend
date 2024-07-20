import {httpService} from "../http-service";

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

class ProjectsService {
  public async getAllProjects() {
    const res = await httpService.get("projects/getAllProjects");
    return res.data;
  }
  public async getProject(id: string) {
    const res = await httpService.get(`projects/getProject/${id}`);
    return res.data;
  }
  public async createProject(
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) {
    const res = await httpService.post(`projects/createProject`, project);
    return res.data;
  }
  public async updateProject(
    id: string,
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) {
    const res = await httpService.patch(`projects/updateProject/${id}`, project);
    return res.data;
  }
  public async deleteProject(id: string) {
    const res = await httpService.delete(`projects/deleteProject/${id}`);
    return res.data;
  }
}

export const projectsService = new ProjectsService();
