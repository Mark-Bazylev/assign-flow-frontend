import { Outlet } from "react-router-dom";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ProjectsDrawer } from "../components/projects/ProjectsDrawer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setOpenDrawer } from "../redux/ui/ui-slice";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const openDrawer = useAppSelector((state) => state.ui.openDrawer);
  function handleDrawer(isOpen: boolean) {
    dispatch(setOpenDrawer(isOpen));
  }
  return (
    <Stack sx={{ display: "flex" }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AssignFlow
          </Typography>
        </Toolbar>
        <ProjectsDrawer
          openDrawer={openDrawer}
          onDrawerClose={() => handleDrawer(false)}
        />
      </AppBar>
      <Outlet />
    </Stack>
  );
}
