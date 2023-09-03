import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import {db} from '../lib/firebase'
import { useAuth } from '../context/AuthUserContext';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
  const { authUser, emailAddress } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();
  if(authUser !== null){
    router.push('/')
  }
  const onSubmit = event => {
    setError(null)
    if(passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        db.collection('users').doc(email).set({
          email: email,
          name: name,
          birthday: birthday,
          location: location,
          privacy: privacy,
          aboutme: "About Me",
          createdAt: new Date().toISOString(),
        })

        router.push("/");
      })
      .catch(error => {
        setError(error.message)
      });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <Container className="text-center shadow-[0_1px_4px_rgba(0,0,0,0.30)] mt-[10rem] rounded-md p-4 w-[20rem] mt-5 sm:w-[30rem] mx-auto">
      <Row>
          <Col>
          <h2 className='text-[24px] sm:text-[40px] pb-2 text-[#222]'>Sign Up</h2>
          </Col>
        </Row>
      <Row>
        <Col>
          <Form style={{maxWidth: '700px', margin: 'auto'}} onSubmit={onSubmit}>
          { error && <Alert className="text-[red] pb-2 sm:w-[20rem] mx-auto" color="danger">{error}</Alert>}
            
            <FormGroup row className='text-left w-[16rem] mx-auto'>
              <Label for="signUpEmail" sm={4}>Name</Label>
              <Col>
                <Input
                    className='rounded-md p-2 w-[16rem] text-[black] border'
                    type="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  id="signUpName"
                  placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3 space-x-1 text-left w-[16rem] mx-auto'>
              <Label  className="inline-block pl-1 pr-[5.3rem]" for="birthday" sm={2}>
                Birthday
              </Label>
              <Label for="location" sm={2}>
                Location
              </Label>
              <Col className="inline-block" sm={3}>
                <Input
                  className='rounded-md p-2 w-[9rem] text-[black] border'
                  value={birthday}
                  onChange={(event) => setBirthday(event.target.value)}
                  name="birthday"
                  type="date"
                  placeholder="" />
              </Col>
              
              <Col className='inline-block' sm={2}>
                <Input
                    className='rounded-md p-2 w-[6rem] text-[black] border'
                    type="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  name="location"
                  id="signUpName"
                  placeholder="Location" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-5 text-left w-[16rem] mx-auto'>
              <Label for="privacy" sm={4}>Profile</Label>
              <Col sm={2}>
                <Input className=" w-[16rem] p-2 rounded-md border bg-[white] " type="select" name="privacy" id="privacy" value={privacy} onChange={handlePrivacyChange}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3 text-left w-[16rem] mx-auto'>
              <Label for="signUpEmail" sm={4}>Email Address</Label>
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 text-[black] w-[16rem] border'
                    type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3 text-left w-[16rem] mx-auto'>
              <Label for="signUpPassword" sm={4}>Password</Label>
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 w-[16rem] text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3 text-left w-[16rem] mx-auto'>
              <Label className="text-[#222]" for="signUpPassword2" sm={8}>Confirm Password</Label>
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 text-[black] w-[16rem] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-11 w-[16rem] mx-auto'>
             <Col>
             <Button className='bg-[#3b82f6] w-[16rem] mx-auto  py-2 px-8 text-white rounded-lg hover:shadow-lg hover:text-slate-300'>Sign Up</Button>
             </Col>
           </FormGroup>
           <FormGroup row className='pt-[5rem] text-slate-700'>
              <Col>
              Have an account already? <a className="hover:underline text-[#3b82f6]" href="/login">Login In</a>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
    
  )
}

export default SignUp;