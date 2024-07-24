import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import { createTask, updateTask } from "../../redux/tasks/task-slice";
import { Task, TaskState } from "../../services/tasks-service/tasks-service";
import { useParams } from "react-router-dom";

interface FormDialogProps {
  state: TaskState;
  openDialog: boolean;
  handleOnCloseDialog: () => void;
  task?: Task;
}
export function TaskFormDialog({
  state,
  openDialog,
  handleOnCloseDialog,
  task,
}: FormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({ defaultValues: task });
  const { id } = useParams();
  const onFormSubmit: SubmitHandler<Task> = async (credentials) => {
    try {
      setIsLoading(true);
      credentials.state = state;
      credentials.projectId = id!;
      credentials.dueDate = new Date(credentials.dueDate).toISOString();
      if (task) {
        await dispatch(updateTask({ id: task.id, task: credentials }));
      } else {
        await dispatch(createTask(credentials));
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
      <DialogTitle>{task ? "Update Task" : "Create Task"}</DialogTitle>
      <Stack sx={{ p: 2, gap: 2, display: "flex" }}>
        <TextField
          type="text"
          label="Task Name"
          {...register("name", {
            required: "Task name is required",
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
        <TextField
          type={"date"}
          label={"Due Date"}
          {...register("dueDate", {
            required: "Date is missing",
          })}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
        ></TextField>
      </Stack>
      <DialogActions>
        <Button onClick={() => handleOnCloseDialog()}>Cancel</Button>
        <Button type="submit">{task ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}
