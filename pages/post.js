import React from 'react'
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'

const post = () => {
    const router = useRouter();
    const { id, emailAddress } = router.query;
    // console.log("id" + emailAddress)
    const [post, setPost] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        async function fetchPost(){
            const snapshot = await db.collection("users").doc(emailAddress).collection("posts").doc(id).get();
            const data = snapshot.data();
            // console.log(data)
            if (data) {
                setPost(data.content);
                setDate(data.createdAt);
            }
        }
        fetchPost();
    })
  return (
    <div className='w-[100vw] text-[#222] h-[100vh] bg-[#f3f3f3] text-center'>
      <Head>
        <title>Blogger</title>
        <meta name="description" content="Help with your AP's from students across the country"></meta>
        <link rel="icon" sizes="196x196" href="/favicon.ico"/>  
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet"/>
      </Head>
      <Navbar />
      <div id="loggedin" className='mt-[10rem] text-center w-[60rem] min-h-[40rem] rounded-md p-2 text-[black] w-[50rem] shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto'>
        <b><p className='text-[2rem] font-bold'>{String(date).substring(5, 7)}/{String(date).substring(8, 10)}/{String(date).substring(0, 4)}</p></b>

        <div className='text-[0.8rem]' dangerouslySetInnerHTML={{ __html: post.replace(/<p>/g, '<p class="text-left p-10 text-[1.8rem]">') }} />
        
      </div>
      <div className='relative mt-5 w-[60rem] mx-auto'>
            <div className='absolute inset-y-0 left-0 font-bold text-[1.5rem] text-[#1e3c72]'>
                Posted in <i>@{emailAddress}</i>
            </div>
            <div className='absolute inset-y-0 right-0'>
                Id: {id}
            </div>
        </div>
    </div>
  )
}

export default post