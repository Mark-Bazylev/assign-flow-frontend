import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/authentication/authSlice";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function onLogin() {
    try {
      await dispatch(login({ email: "mark@gmail.com", password: "secret" }));
      navigate("/home");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <div>this is login page</div>
      <button onClick={onLogin}>Login</button>
    </>
  );
}
