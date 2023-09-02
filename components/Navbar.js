/**
* @jest-environment jsdom
*/
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { useEffect, useState } from 'react';
import '../styles/Home.module.css'
import {db} from '../lib/firebase'

const Navbar = () => {
  const { authUser, signOut, emailAddress } = useAuth();
  const router = useRouter();
  const [imageurl, setImageUrl] = useState([]);

  async function login(){
    router.push("/login")
  }
  const bloglink = `/blog?emailAddress=${emailAddress}`
  useEffect(() => {
    if(authUser !== null){
      const profileref = db.collection('users').doc(emailAddress)
      profileref.get().then((doc) => {
        const imgurl = `https://source.boringavatars.com/beam/120/${doc.data().name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
        setImageUrl(imgurl)
      })

      document.getElementById("signout").style.display = "inline-block";
      document.getElementById("signin").style.display = "none";
      // document.getElementById("signin").innerText = "Sign Out";
    } else {
      document.getElementById("signin").style.display = "inline-block";
      document.getElementById("signout").style.display = "none";
    }
  }, [authUser])
  
  return (
    <div id="nvbr" className='z-10 fixed top-0 text-[#222] bg-[#f3f3f3] text-center flex space-x-8'>
      <div className='w-[100vw] z-0 text-[0.5rem] sm:text-[1.5rem] text-white pt-5 pb-5 h-15 align-middle z-3 font-serif'> 
        <a href="../" className='inline-block align-middle float-left sm:pl-5'>
          <div className='sm:w-[20rem] text-[white] '>
            <h2 className='inline-block align-middle font-black text-[0.7rem] sm:text-[2rem]'>📝 Blogger</h2>
          </div>
        </a>
        <div className='float-right sm:pr-20'>
          {/* <Dropdown /> */}
          {/* <a className='text-[#222] leading-sm inline-block align-middle font-black pt-[0.36rem] pr-5  hover:text-[#505050]' href="../about">About</a>*/}
          {/* <a className='text-[white] text-[1.5rem] mb-1 inline-block align-middle pt-[0.36rem] pr-5  hover:text-slate-300' href={bloglink}>Your Blog</a>  */}
          <a className='text-[white] text-[1.5rem] mb-1 inline-block align-middle pt-[0.36rem] pr-7  hover:text-slate-300' href="/entry">Add an Entry</a> 
          <a className='text-[white] text-[1.5rem] mb-1 inline-block align-middle pt-[0.36rem] pr-7  hover:text-slate-300' href="/people">People</a> 
          <button id="signin" className='mt-1 pb-2 leading-sm inline-block align-middle pt-[0.36rem]  hover:text-slate-300 hover:underline' onClick={login}>Login / Sign Up</button>
          <button id="signout" className='mt-1 rounded-md pb-2 leading-sm align-middle pt-[0.36rem] hidden  hover:text-slate-300 hover:underline' onClick={signOut}>Sign Out</button>
          <img className='pl-4 inline-block w-[3rem]' src={imageurl} />
        </div>
      </div>
    </div>
  )
}

export default Navbar