import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import {db} from '../lib/firebase'
import { useAuth } from '../context/AuthUserContext';
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const entry = () => {
    const router = useRouter();
    const { authUser, emailAddress } = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [descript, setDescript] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(content !== null){
            const postData = {
                createdAt: new Date().toISOString(),
                content,
            }
            try {
                await db.collection('users').doc(emailAddress).collection('posts').add(postData);
                console.log(emailAddress);
                setContent('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        } else {
            alert("Add text.")
        }
        
        
    };
    useEffect(() => {
        // if(authUser !== null){
        //   alert("Yo")
        // } else if(authUser === null){
        //   alert("Not Loged In!")
        // }
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
      <div id="loggedin" className='pt-[10rem]'>
      <Form style={{maxWidth: '700px', margin: 'auto'}} onSubmit={handleSubmit}>
          {/* { error && <Alert className="text-[red] pb-2 sm:w-[20rem] mx-auto" color="danger">{error}</Alert>} */}
          <div className='relative w-[50rem] mx-auto pb-10'>
                <div className='absolute inset-y-0 left-0 font-bold text-[1.5rem] text-[#1e3c72]'>
                    Post to <i>@{emailAddress}</i>
                </div>
                <div className='absolute inset-y-0 right-0'>
                    <button className='bg-[#1e3c72] p-2 rounded-lg text-[white] hover:shadow-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <FormGroup row className='pt-3 text-left w-[50rem] mx-auto'>
              <Label className="text-[#222]" for="content" sm={8}>Note: We also support basic HTML tags like &lt;b&gt; and &lt;i&gt;. </Label>
              <Col sm={8} className='pt-2'>
                <textarea
                    className='text-left rounded-md p-2 text-[black] w-[50rem] h-[35rem] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="text"
                  name="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  id="content"
                  placeholder="<p>Your Message</p>" />
              </Col>
            </FormGroup>
          </Form>
        {/* {content} */}
      </div>
    </div>
  )
}

export default entry