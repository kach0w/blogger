import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'

const Profile = ({ jamal }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      async function fetchProfile(){
        const profileref = db.collection('users').doc(jamal || "karsab343@gmail.com").collection('posts').orderBy('createdAt', 'desc')
        const snapshot = await profileref.get();
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
          date: doc.data().createdAt,
        }))
        setPosts(posts);
      }
      fetchProfile()

    })
    // console.log(posts[0].content)

  return (
    <div className=''>
      <div>
        <ul className='pt-2 mx-auto w-[30rem]'>
          {posts.map((post) => (
            <li key={post.id} className='pb-8'>
              <a className='text-[#1e3c72] group' href={"/post?emailAddress=" + jamal + "&id=" + post.id}>
                <div>
                  <b><p className='text-[1.5rem] text-left font-bold group-hover:underline'>{String(post.date).substring(5, 7)}/{String(post.date).substring(8, 10)}/{String(post.date).substring(0, 4)}</p></b>
                </div>
              </a>
              <div className='text-[0.8rem] w-[30rem] text-left' dangerouslySetInnerHTML={{ __html: (post.content.substring(0, 70).replace(/\s$/, '')+"...").replace(/<p>/g, '<p class="text-left">') }} />

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile