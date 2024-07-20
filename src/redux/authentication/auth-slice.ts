import { createAppSlice } from "../createAppSlice";

import {
  authService,
  CreateAccountParams,
  LoginParams,
  User,
} from "../../services/auth-service/auth-service";

interface AuthSliceState {
  token: string | null;
  user: User | null;
}

const initialState: AuthSliceState = {
  token: authService.getAuthToken(),
  user: authService.getUserFromToken(),
};
const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    login: create.asyncThunk(
      async ({ email, password }: LoginParams, thunkAPI) => {
        return await authService.login({ email, password });
      },
      {
        fulfilled(state, action) {
          state.user = authService.getUserFromToken();
        },
      },
    ),
    createAccount: create.asyncThunk(
      async ({ name, email, password }: CreateAccountParams) => {
        return await authService.createAccount({
          name,
          email,
          password,
        });
      },
      {
        fulfilled(state, action) {
          state.user = authService.getUserFromToken();
        },
      },
    ),
  }),
});

export const { login, createAccount } = authSlice.actions;

export default authSlice.reducer;
