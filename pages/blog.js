import React from 'react'
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useAuth } from '../context/AuthUserContext';
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import Profile from '../components/Profile'
import Posts from '../components/Posts'

const blog = () => {
  const router = useRouter();
  const { query } = router;
  const emailAddress = query.emailAddress;
  const noPage = false;
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
      <div id="loggedin" className='pt-[15rem]'>
        <div className='w-[50vw] float-left'>
          <Posts jamal={emailAddress} />
        </div>
        <div className='w-[50vw] float-right'>
          <Profile jamal={emailAddress} showPage={noPage}  /> 
        </div>
      </div>
    </div>
  )
}

export default blog;