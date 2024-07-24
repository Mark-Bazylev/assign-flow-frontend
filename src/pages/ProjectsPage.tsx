import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { setOpenDrawer } from "../redux/ui/ui-slice";

export function ProjectsPage() {
  const dispatch = useAppDispatch();
  function handleOpenDrawer() {
    dispatch(setOpenDrawer(true));
  }
  return (
    <Box
      sx={{
        p: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="div">
        Welcome to AssignFlow
      </Typography>
      <Typography variant="body1">
        AssignFlow is a powerful task management tool crafted to optimize your
        workflow and elevate productivity. Ideal for individuals, teams, and
        large organizations, AssignFlow offers an intuitive platform to
        organize, prioritize, and track tasks seamlessly. Key features include
        customizable task lists, automated deadline reminders, collaborative
        workspaces, and real-time progress tracking. With AssignFlow, you can
        stay on top of your responsibilities, enhance team collaboration, and
        accomplish your objectives efficiently. Streamline your task management
        and achieve more with AssignFlow!
      </Typography>

      <Button onClick={handleOpenDrawer}>View Projects</Button>
    </Box>
  );
}
