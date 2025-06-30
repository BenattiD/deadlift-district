import { useRef, useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { useExercise } from "../lib/context/exercise";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

import './Home.css';

DataTable.use(DT);


export function Home() {
  const user = useUser();
  const ideas = useIdeas();
  const exercises = useExercise();
  const table = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  
  const [tableData, setTableData] = useState([]);
  const [randomWorkout,setRandomWorkout] = useState();


  const handleChange = (event) => {
    // When the checkbox changes, its `event.target.checked` property
    // will give you the new boolean value (true if checked, false if unchecked).
	if(event.target.checked){
	  table.current.dt().search("").draw(false);
		setRandomWorkout(ideas.current[parseInt(Math.random()*ideas.current.length)]);

	}else{
      table.current.dt().search("^(?!.*Legacy).*$",true).draw(false);
	}
    
  };

/*	let handleC22hange = () => {
		let api = table.current!.dt();

		if (api) {
		api.page('previous').draw(false);
		}
  };*/
  
	const animatedComponents = makeAnimated();
  const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
	]
	
  const handleSubmit = async () => {
    try {
      await ideas.add({name,description,duration, creator: user.current.name,date});
      setName("");
      setDescription("");
      setDuration(0);
	  setDate("");
    } catch (err) {
      console.error("xxxx" + err);
    }
	
  };



  return (
    <>
      {/* Show the submit form to logged in users. */}
      {user.current ? (
        <section>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>
		
			<form>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			  <div className="modal-dialog modal-dialog-centered " >
				<div className="modal-content">
				  <div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">Workout hinzufügen</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				  </div>
				  <div className="modal-body">
					<div className="mb-3">
					  <input type="text" className="form-control" id="formName" placeholder="Name" 
					  value={name} 
					  onChange={(event) => {
						setName(event.target.value);
					  }}/>
					</div>
					<div className="mb-3">
					  <textarea className="form-control" id="formDesc" rows="8" placeholder="Beschreibung" required
					  value={description}
					  onChange={(event) => {
						setDescription(event.target.value);
					  }}/>
					</div>
					<div className="mb-3">
						<label>Dauer: <span id="curr">{duration}</span></label>
						<input type="range" className="form-range" min="0" max="60" step="1" id="formDuration" value={duration} 
						onChange={(event) => {
							setDuration(event.target.valueAsNumber);
					  }}/>
					</div>
					{/*<select id="dynamicSelect" name="dynamicSelect"></select>
					
					<Select 
						options={options} 
						closeMenuOnSelect={false}
      					components={animatedComponents}
						isMulti
						/>
							*/}
					<br/>
					<label className="form-label">Datum:</label>
					<input type="date" id="formDate" name="date" onChange={(event) => {
							setDate(event.target.value); console.log(event.target.value);
					  }}/>
				  </div>
				  <div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
					<button id="addBtn" type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Speichern</button>
				  </div>
				</div>
			  </div>
			</div>
			</form>
		
        </section>
      ) : (
        <section>
          
        </section>
      )}
		<br/>
		<div className="form-check form-switch">
			<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  onChange={handleChange}/>
			<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Legacy</label>
		</div>


	  <DataTable data={ideas.current} 
	  	ref={table}
	  	options={{
          columns: [
            { data: 'name', className: 'tdClass'},
            { data: 'description', className:'tdDescription'},
            { data: 'duration', className: 'tdClass' },
            { data: 'creator', className: 'tdClass'},
			{ data: 'date', className: 'tdClass'},
			{ data: '$id'}
          ],
		  order: [],
		  search: { search: "^(?!.*Legacy).*$", regex:true}

        }}
		slots={{
				5: (data, row) => (
					
					(user.current && user.current.name === row.creator) ? (
					<button type="button" onClick={() => ideas.remove(row.$id)} className="btn btn-secondary">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
					<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
					</svg>
					</button>
					) : ( <div></div> )
				)
			}}
	  className="display" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Creator</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
        </DataTable>
	  	
	 
    </>
  );
}
