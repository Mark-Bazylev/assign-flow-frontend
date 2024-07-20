import { createAppSlice } from "../createAppSlice";
import {
  Project,
  projectsService,
} from "../../services/projects-service/projects-service";

interface ProjectsSliceState {
  projects: Project[];
  currentProject: Project | null;
}
const initialState: ProjectsSliceState = {
  projects: [],
  currentProject: null,
};
const projectSlice = createAppSlice({
  name: "project",
  initialState,
  reducers: (create) => ({
    getAllProjects: create.asyncThunk(
      async () => {
        return await projectsService.getAllProjects();
      },
      {
        fulfilled(state, action) {
          state.projects = action.payload;
        },
      },
    ),
    getProject: create.asyncThunk(
      async (id: string) => {
        return await projectsService.getProject(id);
      },
      {
        fulfilled(state, action) {
          state.currentProject = action.payload;
        },
      },
    ),
    createProject: create.asyncThunk(
      async (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
        return await projectsService.createProject(project);
      },
      {
        fulfilled(state, action) {
          state.currentProject = action.payload;
        },
      },
    ),
    updateProject: create.asyncThunk(
      async ({
        id,
        project,
      }: {
        id: string;
        project: Omit<Project, "id" | "createdAt" | "updatedAt">;
      }) => {
        return await projectsService.updateProject(id, project);
      },
      {
        fulfilled(state, action) {
          state.currentProject = action.payload;
        },
      },
    ),
    deleteProject: create.asyncThunk(
      async (id: string) => {
        return await projectsService.deleteProject(id);
      },
      {
        fulfilled(state, action) {
          //should return a checker that its deleted
        },
      },
    ),
  }),
});

export const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = projectSlice.actions;

export default projectSlice.reducer;
