import { Box, Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Task, TaskState } from "../../services/tasks-service/tasks-service";
import AddIcon from "@mui/icons-material/Add";
import { TaskFormDialog } from "../forms/TaskFormDialog";
import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

interface TasksColumnProps {
  createdTasks: Task[];
  tasksState: TaskState;
}

export function TasksColumn({ createdTasks, tasksState }: TasksColumnProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const columnTitle = {
    CREATED: "Created",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  };

  return (
    <Stack sx={{ p: 2, backgroundColor: grey["200"] }}>
      <Typography variant={"h6"}>{columnTitle[tasksState]}</Typography>
      <Box sx={{ height: "550px", width: "400px", overflowY: "auto" }}>
        <Droppable droppableId={tasksState}>
          {(provided) => (
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ gap: 2 }}
            >
              {createdTasks.map((task, index) => (
                <TaskCard task={task} key={task.id} index={index} />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </Box>

      <Button onClick={() => setOpenCreateDialog(true)} startIcon={<AddIcon />}>
        add Task
      </Button>
      <TaskFormDialog
        state={tasksState}
        openDialog={openCreateDialog}
        handleOnCloseDialog={() => setOpenCreateDialog(false)}
      />
    </Stack>
  );
}
