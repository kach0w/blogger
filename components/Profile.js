import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import { useAuth } from '../context/AuthUserContext';

const Profile = ({ edit, jamal }) => {
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
        console.log(edit)        
        
      async function fetchProfile(){
        const profileref = db.collection('users').doc(jamal || "karsab343@gmail.com")
        profileref.get().then((doc) => {
          setName(doc.data().name)
          setImageUrl(`https://source.boringavatars.com/beam/120/${doc.data().name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`)
        //   console.log("Aboutme" + aboutme)
          setAboutMe(doc.data().aboutme)
          setBirthday(doc.data().birthday)
          setLocation(doc.data().location)
          setPrivacy(doc.data().privacy)
          // console.log(doc.data().privacy)
          if(privacy === "Public"){
            const docRef = db.collection('friends').doc(jamal);
            docRef.get().then((doc) => {
              if (doc.exists) {
                // console.log("exists already")
              } else {
                // console.log("added to friends list")
                db.collection("friends").doc(jamal).set({
                  email: jamal,
                })
              }
            }).catch((error) => {
              console.log('Error getting document:', error);
              setDocumentExists(false);
            });
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      }
      fetchProfile()

    })
  return (
    <div className=''>
          <div className='group rounded-md text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)] w-[40rem] h-[20rem] mx-auto'>
            <div id="nvbr" className='h-[20rem] float-left align-middle rounded-l-md'>
              <img className="w-[13rem] p-4 mx-auto inline-block mt-[3rem]" src={imgurl}/>
            </div>
            <div className='inline-block'>
              <b><p className='group-hover:underline pt-5 text-[1.5rem] inline-block'>{name}</p></b>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    className='p-2 w-[15rem]'
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                  />
                  <button onClick={handleSaveClick}>✓</button>
                </div>
              ) : (
                <div className='p-2 w-[20rem] mx-auto'>
                  <p className='inline-block'>{aboutme}&nbsp;</p>
                  {edit ? (
                        <button className="inline-block" id="editbutton" onClick={handleEditClick}> ✏️</button>
                    ) : (
                        <button className="hidden" id="editbutton" onClick={handleEditClick}> ✏️</button>

                    )}
                </div>
              )}
              <hr></hr>
              <div className='pt-3 space-x-[75px]' >
                <div className='inline-block text-left text-slate-500'>
                  Email:
                  <br></br>
                  Birthday:
                  <br></br>
                  Location:
                  <br></br>
                  Profile:
                </div>
                <div className='inline-block text-left'>
                  <a href="mailto:karsab343@gmail.com">{jamal}</a>
                  <br></br>
                  {String(birthday).substring(5, 7) + "-" + String(birthday).substring(0, 4)}
                  <br></br>
                  {location}
                  <br></br>
                  {privacy}
                </div>
                
              </div>
              
            </div> 
          </div>
        </div>
  )
}

export default Profile