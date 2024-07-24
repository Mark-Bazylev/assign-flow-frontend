import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Project } from "../../services/projects-service/projects-service";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectFormDialog } from "../forms/ProjectFormDialog";
import { useState } from "react";

interface ProjectsListProps {
  projects: Project[];
}
export function ProjectsList({ projects }: ProjectsListProps) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <List>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpenDialog(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Project"} />
        </ListItemButton>
      </ListItem>
      <ProjectFormDialog
        openDialog={openDialog}
        handleOnCloseDialog={() => setOpenDialog(false)}
      />
    </List>
  );
}
