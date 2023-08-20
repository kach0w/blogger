import Image from 'next/image'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useAuth } from '../context/AuthUserContext';
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import Profile from '../components/Profile'

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
      <div id="loggedin" className='pt-10'>
        <div className='w-[50vw] float-left'>

        </div>
        <div className='w-[50vw] float-right'>
        <Profile edit={yesedit} jamal={emailAddress} /> 

        </div>
      </div>
      <div id="guest">
        guest
      </div>
    </div>
  )
}
