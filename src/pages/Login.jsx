import { useState } from "react";
import { useUser } from "../lib/context/user";

export function Login() {
  const user = useUser();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <h1>Login or register</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <button
            className="button btn btn-primary"
            type="button"
            onClick={() => user.login(email, password)}
          >
            Login
          </button>
          
        </div>
      </form>
    </section>
  );
}
