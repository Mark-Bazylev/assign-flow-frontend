import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Project } from "../../services/projects-service/projects-service";
import { useAppDispatch } from "../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  createProject,
  updateProject,
} from "../../redux/projects/project-slice";

interface FormDialogProps {
  openDialog: boolean;
  handleOnCloseDialog: () => void;
  project?: Project;
}
export function ProjectFormDialog({
  openDialog,
  handleOnCloseDialog,
  project,
}: FormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({ defaultValues: project });
  const onFormSubmit: SubmitHandler<Project> = async (credentials) => {
    try {
      setIsLoading(true);
      if (project) {
        await dispatch(updateProject({ id: project.id, project: credentials }));
      } else {
        await dispatch(createProject(credentials));
      }
      handleOnCloseDialog();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleOnCloseDialog}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onFormSubmit),
      }}
    >
      <DialogTitle>{project ? "Update Project" : "Create Project"}</DialogTitle>
      <Stack sx={{ p: 2, gap: 2, display: "flex" }}>
        <TextField
          type="text"
          label="Project Name"
          {...register("name", {
            required: "Project name is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          type={"text"}
          label="Description"
          {...register("description", {
            required: "Description is missing",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Stack>
      <DialogActions>
        <Button onClick={() => handleOnCloseDialog()}>Cancel</Button>
        <Button type="submit">{project ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}
