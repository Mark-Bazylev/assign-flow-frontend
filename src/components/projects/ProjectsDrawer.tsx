import { Box, Drawer, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllProjects } from "../../redux/projects/project-slice";
import { ProjectsList } from "./ProjectsList";
interface ProjectDrawerProps {
  openDrawer: boolean;
  onDrawerClose: () => void;
}
export function ProjectsDrawer({
  openDrawer,
  onDrawerClose,
}: ProjectDrawerProps) {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.projects);
  useEffect(() => {
    async function initializeProjects() {
      try {
        console.log("why am i here");
        await dispatch(getAllProjects());
      } catch (e) {
        console.error(e);
      }
    }
    initializeProjects();
  }, []);

  return (
    <Drawer
      sx={{
        overflow: "auto",
        width: "100px",
      }}
      open={openDrawer}
      onClose={onDrawerClose}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <ProjectsList projects={projects} />
      </Box>
    </Drawer>
  );
}
