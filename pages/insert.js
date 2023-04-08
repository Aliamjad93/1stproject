import { database } from '@/firebase';
import { async } from '@firebase/util';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function insert() {
    const [name,setName]=useState("");
    const [marks,setMarks]=useState("");
    
    const router=useRouter();

    function main(){
        router.push('/')
    }
    
    const addData = async (e) => {
        e.preventDefault();
        
        await addDoc(collection(database, 'Students'), {
          name: name,
          marks: marks
        })
        .then(() => {
          alert('Data Saved');
          setName('');
          setMarks('');
        })
        .catch((err) => {
          console.log(err);
        })

    



        // console.log(name);
        // console.log(marks);
     }
  return (
    <div>
        <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-around gap-2'>
            <div className='w-[40%] bg-slate-400 flex flex-col h-[50%] mt-80'>
            <h1 className='font-bold text-center text-3xl mt-2'>Add Details</h1>
            <form className='flex flex-col  px-28 gap-2 mt-10'>
                <input text="text"
                placeholder='Enter Name'
                className='py-2 px-4 text-xl border border-none'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />
                <input text="text"
                placeholder='Enter Marks'
                className='py-2 px-4 text-xl border border-none'
                value={marks}
                onChange={(e)=> setMarks(e.target.value)}
                
                />
                <button 
                onClick={addData}
                className='bg-blue-400 text-white rounded-lg py-2 w-[70%] flex items-center justify-center ml-20 mb-7 mt-3'>Insert</button>
            </form>
            
            </div>
            <button  className='mb-96 text-blue-500 'onClick={main}>Back</button>
            
        </div>
    </div>
  )
}

export default insert