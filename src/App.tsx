import React from "react";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { IconButton, ThemeProvider } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          iconVariant={{ error: <ErrorOutlineOutlinedIcon sx={{ mr: 1 }} /> }}
          action={(snackbarId) => (
            <IconButton
              sx={{ color: "white", textTransform: "none" }}
              onClick={() => closeSnackbar(snackbarId)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          )}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
