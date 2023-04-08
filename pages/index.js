import { database } from '@/firebase';
import { async } from '@firebase/util';
import { collection, deleteDoc, deleteField, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'


function index() {
  const router=useRouter();
  const [studentData,setStudentData]=useState([]);
 
  

  useEffect(()=>{

    if (localStorage.getItem('username')){
      console.log(localStorage.getItem('username'));
        router.push('/')
    }
    else{
      router.push('/signin')
    }
        },[])


  useEffect(()=>{
    getData();
  },[]);


  

  const getData = async()=>{
    await getDocs(collection(database,"Students")).then((response)=>{
      setStudentData(response.docs);
    })
  }



  const deleteField = async (id) => {
    let fieldToDelete = doc(database, 'Students', id);
    await deleteDoc(fieldToDelete)
    .then(() => {
      alert('Data Deleted');
      getData();
    })
    .catch((err) => {
      console.log(err);
    })
    
}






  function update(){
    router.push('/update')
  }
  
  function insertButton(){
    router.push('/insert')
  }
  return (
    <div>
      <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-around gap-2 '>
        <div>
          {/* <button className='bg-blue-400 rounded px-5 py-1 text-xl  text-white' onClick={insertButton}>Insert</button> */}
        </div>
        <div className='mb-32'>
        <button className='bg-blue-400 rounded px-5 py-1 mb-5 text-xl mr-5 text-white' onClick={()=> localStorage.removeItem('username') / router.push('/signin')}>Log Out</button>
        <button className='bg-blue-400 rounded px-5 py-1 mb-5 text-xl  text-white' onClick={insertButton}>Insert</button>
          <table className='w-[100%]'>
            
          <thead className="text-xs text-gray-700 bg-slate-400 ">
            <tr>
                <th scope="col" className="px-6 py-3 ">
                    Name
                </th>
                <th scope="col" className="px-24 py-3 ">
                    Marks
                </th>
                <th scope="col" className="px-72 py-3">
                    Actions
                </th>
                
            </tr>
        </thead>
        <tbody>
          {
          studentData.map((student)=>{


            return <tr key={student.id} class="bg-white border border-spacing-10">
                <td scope="row" class="px-6 py-4  ">
                    {student.data().name}
                </td>
                <td class="px-28 py-4">
                    {student.data().marks}
                </td>
                <td className='px-72 py-3'>
                  <button 
                  
                  className='bg-green-500 text-center font-2xl rounded px-5 py-2 mr-2' onClick={() => router.push('/update/' + student.id)}>Update</button>
                  <button className='bg-red-500 text-center font-2xl rounded px-5 py-2 ' onClick={() => deleteField(student.id)} >Delete</button>
                </td>
              </tr>

              {/* <tr class="bg-white border border-spacing-10">

                <td scope="row" class="px-6 py-4 ">
                    Jason
                </td>
                <td class="px-28 py-4">
                    86
                </td>
                

                
                <td className='px-72 py-3'>
                  <button className='bg-green-500 text-center font-2xl rounded px-5 py-2 mr-2'>Update</button>
                  <button className='bg-red-500 text-center font-2xl rounded px-5 py-2 '>Delete</button>
                </td>
                </tr>

                <tr className="bg-white border border-spacing-10">
                <td scope="row" className="px-6 py-4 ">
                    Ross
                </td>
                <td className="px-28 py-4">
                    74
                </td>
                <td className='px-72 py-3'>
                  <button className='bg-green-500 text-center font-2xl rounded px-5 py-2 mr-2'>Update</button>
                  <button className='bg-red-500 text-center font-2xl rounded px-5 py-2 '>Delete</button>
                </td>
                </tr>

                <tr className="bg-white border border-spacing-10">

                <td scope="row" className="px-6 py-4 ">
                    Monica
                </td>
                <td className="px-28 py-4">
                    73
                </td>
                <td className='px-72 py-3'>
                  <button className='bg-green-500 text-center font-2xl rounded px-5 py-2 mr-2'>Update</button>
                  <button className='bg-red-500 text-center font-2xl rounded px-5 py-2 '>Delete</button>
                </td>
                </tr>


                <tr className="bg-white border border-spacing-10">

                <td scope="row" class="px-6 py-4 ">
                    John
                </td>
                <td className="px-28 py-4">
                    76
                </td>
                <td className='px-72 py-3'>
                  <button className='bg-green-500 text-center font-2xl rounded px-5 py-2 mr-2'>Update</button>
                  <button className='bg-red-500 text-center font-2xl rounded px-5 py-2 '>Delete</button>
                </td>
                </tr> */}
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default index