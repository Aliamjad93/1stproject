

import { database } from '@/firebase';
import { async } from '@firebase/util';

import { collection, deleteDoc, deleteField, doc, getDocs, updateDoc } from 'firebase/firestore';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Update() {
    const [name,setName]=useState("");
    const [marks,setMarks]=useState("");
    const [studentData,setStudentData]=useState([]);
    
    

    const router=useRouter();
    const id = router.query.id;

    // console.log(id);

    function main(){
        router.push('/')

    studentData.map((student)=>{


    })

    }

    

    const updateFields = async (e) => {
        e.preventDefault()
        // console.log(id);
        let fieldToEdit = doc(database, 'Students', id);
        await updateDoc(fieldToEdit, {
            name: name,
            marks: marks
        })
        
        .then(() => {
            // setStudentData(response.docs);
          alert('Data Updated')
          setName('');
          setMarks('');
        })
        .catch((err) => {
          console.log(err);
        })
      }

      
        
    
    
  return (
    <div>
        

        <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-around gap-2'>
            <div className='w-[40%] bg-slate-400 flex flex-col h-[50%] mt-80'>
            <h1 className='font-bold text-center text-3xl mt-2'>Edit Details</h1>
            
            <form className='flex flex-col  px-28 gap-2 mt-10'>
                <input text="text"
                placeholder='Enter Name'
                className='py-2 px-4 text-xl border border-none'
                value={name}
                onChange={(id)=> setName(id.target.value)}
                />
                <input text="text"
                placeholder='Enter Marks'
                className='py-2 px-4 text-xl border border-none'
                value={marks}
                onChange={(id)=> setMarks(id.target.value)}
                
                />
                

                <button 
                
                className='bg-blue-400 text-white rounded-lg py-2 w-[70%] flex items-center justify-center ml-20 mb-7 mt-3' onClick={updateFields}>Update</button>
                
                </form>
            
            </div>
            <button  className='mb-96 text-blue-500 'onClick={main}>Back</button>
            
        </div>
                
    </div>
  )
}

export default Update