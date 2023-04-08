import React, { useEffect, useState } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { database } from '@/firebase';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';




function signin() {
    const router=useRouter('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    

    const auth=getAuth();



async function simpleSignin(e){
    e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password)
        
        localStorage.setItem("username", email);
        router.push('/');
      } catch (error) {
	alert("Something went wrong with Signing In" + error);
    setEmail('');
    setPassword('');
      }
      e.preventDefault();
    }
    


  return (
    <div>
        <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-around gap-2'>
            <div className='w-[40%] bg-slate-400 flex flex-col h-[50%] mt-80'>
            <h1 className='font-bold text-center text-3xl mt-2'>Sign In</h1>
            
            <form className='flex flex-col  px-28 gap-2 mt-10'>
                <input text="text"
                placeholder='Enter Email'
                className='py-2 px-4 text-xl border border-none'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input text="password"
                type="password"
                placeholder='Enter Password'
                className='py-2 px-4 text-xl border border-none'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                
                />
                

                <button 
                
                className='bg-blue-400 text-white rounded-lg py-2 w-[70%] flex items-center justify-center ml-20 mb-7 mt-3' onClick={simpleSignin}>Sign In</button>
                
                </form>
            
            </div>
            <div className='flex flex-auto'>
            <h1 className=''>Don't have an account? </h1>
            <button  className='px-5 underline  mb-96 text-blue-500 'onClick={()=>router.push('/signup')}>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default signin