import React, {useState,useEffect}from "react";

import './App.css';

const API_URL="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const ITEMS_PER_PAGE=10;

function App() {
  const [employees,setEmployees]=useState([]);
  const [currentPage, setCurrentPage]=useState(1);

  useEffect(()=>{
    const fetchEmployees = async ()=>{
      try{
        const response= await fetch(API_URL);
        if(!response.ok){
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      }catch(error){
        alert("Failed to fetch data");
      }
    };
    fetchEmployees();
  },[]);

  const totalPages= Math.ceil(employees.length/ITEMS_PER_PAGE);
  const startIndex= (currentPage-1)*ITEMS_PER_PAGE;
  const endIndex= startIndex + ITEMS_PER_PAGE;
  const currentEmployees= employees.slice(startIndex,endIndex);

  const handlePrevious =() =>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }

  const handleNext =()=>{
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1);
    }
  }
  return (
    <div className="app">
      <h1>Employee data table</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee)=>(
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevious} >
            Previous
          </button>
          <button className="page-number">
            {currentPage}
          </button>
          <button onClick={handleNext} >
            Next
          </button>
        </div>

    </div>
  );
}

export default App;
