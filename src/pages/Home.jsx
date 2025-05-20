import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { useExercise } from "../lib/context/exercise";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';


DataTable.use(DT);


export function Home() {
  const user = useUser();
  const ideas = useIdeas();
  const exercises = useExercise();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  
  const [tableData, setTableData] = useState([]);

  
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
      
	  <DataTable data={ideas.current} 
	  	options={{
          columns: [
            { data: 'name'},
            { data: 'description' },
            { data: 'duration' },
            { data: 'creator'},
			{ data: 'date'}
          ],
        }}
	  className="display">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Creator</th>
                    <th>Date</th>
                </tr>
            </thead>
        </DataTable>
	  	
	 
    </>
  );
}
