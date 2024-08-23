import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';


function App() {


const [records,setRecords]=useState([]);




const[page,setPage]=useState(1);
const recordsPerPage=10;


let totalPages=Math.ceil(records.length/recordsPerPage);
console.log(page)




const[display,setDisplay]=useState([]);




const fetchData= async() =>{
  try{
    let response=await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    let jsonResponse=await response.json();
    setRecords(jsonResponse);
    let lastIndex=recordsPerPage*page-1;
    let firstIndex=lastIndex-recordsPerPage+1;
    setDisplay(jsonResponse.slice(firstIndex,lastIndex+1));
  }
  catch(error){
    alert("failed to fetch data");
  }
}


const handlePrevious= ()=>{
  if(page>1){
    setPage((number)=>{
      let newPage=number-1;
      const recordsPerPage=10;
    let lastIndex=recordsPerPage*newPage-1;
    let firstIndex=lastIndex-recordsPerPage+1;
    setDisplay(records.slice(firstIndex,lastIndex+1));
    return newPage;


    });
   


  }
}


const handleNext= ()=>{
  if(page<totalPages){
    setPage((number)=>{
      let newPage=number+1;
      const recordsPerPage=10;
    let lastIndex=recordsPerPage*newPage-1;
    let firstIndex=lastIndex-recordsPerPage+1;
    setDisplay(records.slice(firstIndex,lastIndex+1));
    return newPage;


    });
   
  }
 
}




useEffect(()=>{
  fetchData();
},[])
 






  return (
    <div className="App">
      <h1 className='heading'>Employee Data Table</h1>
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
        {
          display.map((record,i)=>{
            return <tr key={i}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.role}</td>
            </tr>
          })
        }
        </tbody>




      </table>
      <div className='buttonsdiv'>
        <button onClick={handlePrevious}>Previous</button>
        <button>{page}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}


export default App;