import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useAuth } from '../context/AuthUserContext';
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import Profile from '../components/Profile'

export default function Home() {
  const { emailAddress } = useAuth();
  const [peoples, setPeoples] = useState([])
  
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
    const fetchPeople = async () => {
        const collectionRef = db.collection('users').orderBy('name')
        const querySnapshot = await collectionRef.get()
        const peoplesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPeoples(peoplesData)
    }
    fetchPeople()
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
      <div className='w-[40rem] pt-[8rem] mx-auto'> 
        <p className='pt-5 text-[1.1rem]'>Note that this is only the people who set their profile to public when signing up.</p>   
        <ul>
            {peoples.map((person) => {
                const noedit = false;
                const yesedit = true;
                const showPage = true;
                const noPage = false;
                const blogurl =`/blog?name=${person.name}`;
                if(emailAddress !== person.email){
                    return (
                    <li className="mt-10" key={person.id}>
                      <a href={blogurl}>
                        <Profile edit={noedit} jamal={person.email} showPage={showPage} />
                      </a>
                    </li>
                    );
                } else {
                    return (
                    <li className="mt-10" key={person.id}>
                      <a href={blogurl}>
                        <Profile edit={yesedit} jamal={person.email} showPage={showPage}   />
                      </a>
                    </li>
                    );
                }
                
            })}
        </ul>    
        
      </div>
    </div>
  )
}
