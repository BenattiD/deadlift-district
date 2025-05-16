import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <Navbar />
          <main>{isLoginPage ? <Login /> : <Home />}</main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}

function Navbar() {
  const user = useUser();

  return (
    <nav>
		<h1 className="text text-success text-center "> 
		Crossfit Workout Tracker 
		</h1> 
      <div style={{marginLeft:"Auto", marginRight:"0", textAlign:"right"}}>
        {user.current ? (
          <>
            <span>Eingeloggt: {user.current.name}</span>
            <button type="button" onClick={() => user.logout()}>
              Logout
            </button>
          </>
        ) : (
			 <a href="/login" className="btn btn-primary">Login</a>
         
        )}
      </div>
    </nav>
  );
}

export default App;
