import { Task } from "../../services/tasks-service/tasks-service";
import { createAppSlice } from "../createAppSlice";

interface UiSliceState {
  openDrawer: boolean;
}
const initialState: UiSliceState = {
  openDrawer: false,
};
const uiSlice = createAppSlice({
  name: "ui",
  initialState,
  reducers: (create) => ({
    setOpenDrawer: create.reducer<boolean>((state, action) => {
      state.openDrawer = action.payload;
    }),
  }),
});

export const { setOpenDrawer } = uiSlice.actions;
export default uiSlice.reducer;
