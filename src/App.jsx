import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
        <HashRouter>
            <UserProvider>
            <IdeasProvider>
              <Navbar/>
              
              <Link to="/Home">Home</Link>
           
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            
          </IdeasProvider>
        </UserProvider>
        </HashRouter>
  );
}
//git subtree push --prefix dist origin gh-pages
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
			 <Link to="/login" class="btn btn-primary">Login</Link>
      
        )}
      </div>
    </nav>
  );
}

export default App;
