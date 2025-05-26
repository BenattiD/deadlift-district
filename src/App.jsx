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
              
              <Table />
            <Routes>
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
			 <Link to="/login" className="btn btn-primary">Login</Link>
      
        )}
      </div>

    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FVienna&showPrint=0&showTz=0&mode=WEEK&src=N2M2NzUyZmU4ZDM3MmM2OGVjZGE4N2MxOTQxNjE1Mjg3NDFhMmVlNjQ2MzUzOTg4MTRkNWRlNTMwYTAyNzc2NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233f51b5" style={{width:"100%"}} height="800" frameBorder="0" scrolling="no"></iframe>  
    </nav>
    
  );
}

function Table(){
  const user = useUser();

  return (
      <div>
       {user.current ? (
          <Home />
       ):(
        <></>
       )
       }
    </div>
  );
}

export default App;
