import { Task } from "../../services/tasks-service/tasks-service";
import { Box, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { TaskFormDialog } from "../forms/TaskFormDialog";
import { DeleteDialog } from "../DeleteDialog";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTask } from "../../redux/tasks/task-slice";
import { Draggable } from "react-beautiful-dnd";

interface TaskCardProps {
  task: Task;
  index: number;
}
export function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  async function handleDelete() {
    try {
      await dispatch(deleteTask(task.id));
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            "&:hover .task-actions": { visibility: "visible" },
            minHeight: "200px",
          }}
        >
          <CardHeader
            title={task.name}
            action={
              <Box
                className={"task-actions"}
                sx={{ pl: 1, visibility: "hidden" }}
              >
                <IconButton
                  size={"small"}
                  onClick={() => setOpenEditDialog(true)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size={"small"}
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          />
          <CardContent>
            <p>{task.description}</p>
            <p>Position : {task.position}</p>
          </CardContent>


          {openEditDialog && (
            <TaskFormDialog
              state={task.state}
              task={task}
              openDialog={openEditDialog}
              handleOnCloseDialog={() => setOpenEditDialog(false)}
            />
          )}
          {openDeleteDialog && (
            <DeleteDialog
              openDialog={openDeleteDialog}
              handleOnCloseDialog={() => setOpenDeleteDialog(false)}
              handleSubmit={handleDelete}
            />
          )}
        </Card>
      )}
    </Draggable>
  );
}
