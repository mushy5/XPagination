import './App.css';
import {useState, useEffect} from 'react';

function Table({data}){
  return <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>  
    </thead>

    <tbody>
      {data.map((emp)=> <tr key={emp.id}>
        <td>{emp.id}</td>
        <td>{emp.name}</td>
        <td>{emp.email}</td>
        <td>{emp.role}</td>
      </tr>
      )}
    </tbody>
  </table>
}
function App() {
  const [employees, setEmployees] = useState([]);
  const [tenEmp, setTenEmp] = useState([]);
  const [pageNo, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async()=>{
    try{
      let res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      let data = await res.json();
      
      setEmployees(data);
     // setTenEmp(findNewEmp());
     
    }catch(err){
      alert('failed to fetch data');
    }
  }

  const findNewEmp = ()=>{
    const startIndex = (pageNo - 1) * 10; // Adjust for 0-based indexing
    const endIndex = startIndex + 10; // Limit for 10 employees per page
    return employees.slice(startIndex, endIndex); 
  }

  const previous = ()=>{
    if(pageNo > 1){
      setPage((prevPage)=>prevPage-1)   
    }
   
  }

  const next = ()=>{
    
    if(pageNo < totalPages){
      setPage((prevPage)=>prevPage+1);    
    }
  }

  useEffect(()=>{
    fetchEmployees();
   },[])


   useEffect(()=>{
    if(employees.length > 0){
      setTotalPages(Math.ceil(employees.length / 10));

      setTenEmp(findNewEmp())
    }
   },[employees, pageNo])

  return (
    <div className="App">
      <h1>Employee Data Table</h1>

      <Table data={tenEmp}/>

      <div className='buttons'>
        <button onClick={()=>{previous()}}>Previous</button>
        <button>{pageNo}</button>
        <button onClick={()=>{next()}}>Next</button>

      </div>
    </div>
  );
}

export default App;
