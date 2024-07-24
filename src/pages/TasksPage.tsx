import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getTasks, updateTask } from "../redux/tasks/task-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TaskState } from "../services/tasks-service/tasks-service";
import { getProject } from "../redux/projects/project-slice";
import { useParams } from "react-router-dom";
import { TasksColumn } from "../components/tasks/TasksColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export function TasksPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);

  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  useEffect(() => {
    async function initializeTasks(projectId: string) {
      await dispatch(getTasks(projectId));
      await dispatch(getProject(projectId));
    }
    initializeTasks(id!);
  }, [id]);

  function tasksState(state: TaskState) {
    return tasks
      .filter((task) => task.state === state)
      .sort((a, b) => a.position - b.position);
  }

  async function handleDragEnd(result: DropResult) {
    console.log("this is result:", result);

    if (result.destination) {
      await dispatch(
        updateTask({
          id: result.draggableId,
          task: {
            state: result.destination.droppableId as TaskState,
            position: result.destination.index + 1,
          },
        }),
      );
    }
  }

  return (
    <Box>
      <Typography variant="h5">{currentProject?.name} </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          p: 2,
          gap: 2,
          justifyContent: { xs: "start", sm: "center" },
          alignItems: { xs: "center", sm: "start" },
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <TasksColumn
            tasksState={TaskState.CREATED}
            createdTasks={tasksState(TaskState.CREATED)}
          />
          <TasksColumn
            tasksState={TaskState.INPROGRESS}
            createdTasks={tasksState(TaskState.INPROGRESS)}
          />
          <TasksColumn
            tasksState={TaskState.COMPLETED}
            createdTasks={tasksState(TaskState.COMPLETED)}
          />
        </DragDropContext>
      </Box>
    </Box>
  );
}
