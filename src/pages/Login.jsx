import { useState } from "react";
import { useUser } from "../lib/context/user";

export function Login() {
  const user = useUser();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>		
			<form>
			<div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false">
			  <div className="modal-dialog modal-dialog-centered " >
				<div className="modal-content">
				  <div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">Login</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				  </div>
				  <div className="modal-body">
					<input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                /><br/>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
					
					
				  </div>
				  <div className="modal-footer">
					    <button
                className="button btn btn-primary"
                type="button"
                onClick={() => user.login(email, password)}
              >
                Login
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				  </div>
				</div>
			  </div>
			</div>
			</form>
		
    </section>
  );
}
