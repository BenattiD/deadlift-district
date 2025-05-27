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

   const handleClick = () => {
    const modalElement = document.getElementById('loginModal');
    const newBsModal = new window.bootstrap.Modal(modalElement);

    console.log(newBsModal);
    newBsModal.show();
  };

  return (
    <nav>
		<h1 className="text text-success text-center "> 
		Deadlift District Tracker
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
          <>
			 <Link to="/login" className="btn btn-primary" onClick={handleClick}>Login</Link> <br/><br/>
       
        </>
        )}
      </div>

    
    </nav>
    
  );
}

function Table(){
  const user = useUser();

  return (
      <div>
       {user.current ? (
          <>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Workouts</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Kalender</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><Home /></div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FVienna&showPrint=0&mode=AGENDA&src=N2M2NzUyZmU4ZDM3MmM2OGVjZGE4N2MxOTQxNjE1Mjg3NDFhMmVlNjQ2MzUzOTg4MTRkNWRlNTMwYTAyNzc2NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233f51b5" style={{width:"100%"}} height="800" frameBorder="0" scrolling="no"></iframe>  
            </div>
          </div>
          
        </>
       ):(
        <><iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FVienna&showPrint=0&mode=AGENDA&src=N2M2NzUyZmU4ZDM3MmM2OGVjZGE4N2MxOTQxNjE1Mjg3NDFhMmVlNjQ2MzUzOTg4MTRkNWRlNTMwYTAyNzc2NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233f51b5" style={{width:"100%"}} height="800" frameBorder="0" scrolling="no"></iframe>  </>
       )
       }
    </div>
  );
}

export default App;
