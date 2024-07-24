import { Project } from "../../services/projects-service/projects-service";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ProjectFormDialog } from "../forms/ProjectFormDialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTasks } from "../../redux/tasks/task-slice";
import { DeleteDialog } from "../DeleteDialog";
import { deleteProject } from "../../redux/projects/project-slice";

interface ProjectListItemProps {
  project: Project;
}
export function ProjectListItem({ project }: ProjectListItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleEnterProject() {
    navigate(`/tasks/${project.id}`);
  }
  async function handleDeleteProject() {
    try {
      await dispatch(deleteProject(project.id));
    } catch (e) {
      console.log(e);
    } finally {
      setOpenDeleteDialog(false);
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableTouchRipple={true}
        sx={{
          display: "flex",
          gap: 2,
          "&:hover .list-item-actions": { visibility: "visible" },
        }}
        onClick={() => handleEnterProject()}
      >
        <ListItemText secondary={project.description}>
          <Typography variant={"h6"}>{project.name}</Typography>
        </ListItemText>
        <ListItemText
          className={"list-item-actions"}
          sx={{ visibility: "hidden" }}
        >
          <IconButton
            edge={"end"}
            size={"small"}
            onClick={(event) => {
              event.stopPropagation();
              setOpenEditDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge={"end"}
            size={"small"}
            onClick={(event) => {
              event.stopPropagation();
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemText>
      </ListItemButton>
      {openEditDialog && (
        <ProjectFormDialog
          project={project}
          openDialog={openEditDialog}
          handleOnCloseDialog={() => setOpenEditDialog(false)}
        />
      )}
      {openDeleteDialog && (
        <DeleteDialog
          openDialog={openDeleteDialog}
          handleOnCloseDialog={() => setOpenDeleteDialog(false)}
          handleSubmit={handleDeleteProject}
        />
      )}
    </ListItem>
  );
}
