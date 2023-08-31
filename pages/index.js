import Image from 'next/image'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useAuth } from '../context/AuthUserContext';
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import Profile from '../components/Profile'
import livejournal from '../assets/livejournal.jpg'

export default function Home() {
  const { authUser, signOut, emailAddress } = useAuth();
  const [name, setName] = useState([])
  const [aboutme, setAboutMe] = useState([])
  const [email, setEmail] = useState([])
  const [birthday, setBirthday] = useState([])
  const [location, setLocation] = useState([])
  const [privacy, setPrivacy]= useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [imgurl, setImageUrl] = useState([])
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const yesedit = true;

  const handleSaveClick = () => {
    db.collection("users").doc(emailAddress).update({ aboutme: textValue })
      .then(() => {
        setIsEditing(false);
        setAboutMe(textValue)
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
  };
  useEffect(() => {
    if(authUser !== null){
      // fetchProfile()
      document.getElementById("loggedin").style.display = "inline-block";
      document.getElementById("guest").style.display = "none";
      // document.getElementById("signin").innerText = "Sign Out";
    } else {
      document.getElementById("guest").style.display = "inline-block";
      document.getElementById("loggedin").style.display = "none";
    }
  }, [authUser])
  
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

        </div>
        <div className='w-[50vw] float-right'>
        <Profile edit={yesedit} jamal={emailAddress} /> 

        </div>
      </div>
      <div id="guest">
      <div className='pt-[10rem]'>
        <div className='w-[15rem] sm:w-[40rem] mx-auto mb-[1rem] mt-5 text-left inline-block'>
          <h1 className='text-[#1e3c72] text-[48px] text-left'>Old And Inefficient, Just Like You!</h1>
          <h3 className='w-[15rem] text-[12px] sm:text-[1.5rem] text-left text-[#222] sm:w-[40rem] mx-auto'>While there may be better platforms, better interfaces, and better ideas, none can match the nostalgic appeal (or unoriginal name) of Blogger. </h3>
        </div>
        <div className='inline-block text-[15rem]'>
        📝
        </div>
        <div className='w-[2rem] h-[5rem] mt-[15rem] text-center mx-auto'>
          <a href="#about">
          <svg  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill='currentColor' d="M13 18.086l6.293-6.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 111.414-1.414L11 18.086V3.5a1 1 0 112 0v14.586z"></path>
          </svg>
          </a>
        </div>
        <div id="about" className='w-[15rem] sm:w-[40rem] mx-auto pt-[10rem] pb-[10rem]'>
        
          <div className='align-middle sm:w-[40rem] mx-auto '>
            <Image className="rounded-lg w-15rem sm:w-[50rem]" src={livejournal} unoptimized></Image>
            <div className='w-[40rem] mx-auto text-center'>ref: live journal</div>
          </div>
          <div className='w-[15rem]  sm:w-[40rem] mx-auto mt-5'>
            <h1 className=' text-[#1e3c72] mx-auto'>What do we do?</h1>
            <h3 className='text-[12px] sm:text-[24px] text-[#222] mx-auto'>Support a platform for blogs for the total of 1 person who actually uses this site, I'm talking about me in case you haven't figured out that part already :).</h3>
          </div>
          <div className='mx-auto sm:w-[40rem] mt-5'>
            <h1 className=' text-[#1e3c72] mx-auto'>If you made it this far.</h1>
            <h3 className='text-[12px] sm:text-[24px] text-[#222] mx-auto'>Why not sign up?</h3>
          </div>
        </div>
      </div>

      
      
      </div>
    </div>
  )
}
