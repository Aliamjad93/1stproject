import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { database } from '@/firebase';

function signup() {
  const router=useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');



  const auth = getAuth();
  

async function simpleSignup(e){
    e.preventDefault();
        try 
        {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            
            // Save this user in firestore
            await setDoc(doc(database, "users", user.uid), {
              "email":email,
              "password":password,              
              "timestamp": serverTimestamp()
            })
      
            alert('user registered successfully');
            setEmail('');
            setPassword('');
            
        } 
        catch (error) {
            alert("Something went wrong with registration: " + error);
        }
        e.preventDefault();
        console.log(email)
    }


    return (
    <div>
        <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-around gap-2'>
            <div className='w-[40%] bg-slate-400 flex flex-col h-[50%] mt-80'>
            <h1 className='font-bold text-center text-3xl mt-2'>Sign Up</h1>
            
            <form className='flex flex-col  px-28 gap-2 mt-10'>
                <input text="text"
                placeholder='Enter Email'
                className='py-2 px-4 text-xl border border-none'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                
                />
                <input text="password"
                placeholder='Enter Password'
                type="password"
                className='py-2 px-4 text-xl border border-none'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                
                />
                

                <button 
                
                className='bg-blue-400 text-white rounded-lg py-2 w-[70%] flex items-center justify-center ml-20 mb-7 mt-3' onClick={simpleSignup} >Sign Up</button>
                
                </form>
            
            </div>
            <div className='flex flex-auto'>
            <h1 className=''>Already have an account? </h1>
            <button  className='px-5 underline  mb-96 text-blue-500 'onClick={()=>router.push('/signin')}>Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default signup