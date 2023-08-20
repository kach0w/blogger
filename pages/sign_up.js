import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import {db} from '../lib/firebase'
import { useAuth } from '../context/AuthUserContext';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
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
      <Container className="text-center shadow-[0_1px_4px_rgba(0,0,0,0.30)] rounded-md p-4 w-[20rem] mt-5 sm:w-[30rem] mx-auto">
      <Row>
          <Col>
          <h2 className='text-[24px] sm:text-[40px] pb-2 text-[#222]'>Sign Up</h2>
          </Col>
        </Row>
      <Row>
        <Col>
          <Form style={{maxWidth: '700px', margin: 'auto'}} onSubmit={onSubmit}>
          { error && <Alert className="text-[red] pb-2 sm:w-[20rem] mx-auto" color="danger">{error}</Alert>}
            
            <FormGroup row>
              {/* <Label for="signUpEmail" sm={4}>Email</Label> */}
              <Col>
                <Input
                    className='rounded-md p-2 w-[16rem] text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  id="signUpName"
                  placeholder="Name" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3 space-x-1'>
              {/* <Label for="birthday" sm={2}>
                Birthday
              </Label> */}
              <Col className="inline-block" sm={3}>
                <Input
                  className='rounded-md p-2 w-[9rem] text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                  value={birthday}
                  onChange={(event) => setBirthday(event.target.value)}
                  name="birthday"
                  type="date"
                  placeholder="" />
              </Col>
              {/* <Label for="location" sm={2}>
                Location
              </Label> */}
              <Col className='inline-block' sm={2}>
                <Input
                    className='rounded-md p-2 w-[7rem] text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  name="location"
                  id="signUpName"
                  placeholder="Location" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3'>
              <Col sm={2}>
                <Input className=" w-[16rem] p-2 rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] bg-[white] " type="select" name="privacy" id="privacy" value={privacy} onChange={handlePrivacyChange}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3'>
              {/* <Label for="signUpEmail" sm={4}>Email</Label> */}
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 text-[black] w-[16rem] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3'>
              {/* <Label for="signUpPassword" sm={4}>Password</Label> */}
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 w-[16rem] text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-3'>
              <Label className="text-[#222]" for="signUpPassword2" sm={8}>Confirm Password</Label>
              <Col sm={8}>
                <Input
                    className='rounded-md p-2 text-[black] w-[16rem] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row className='pt-11'>
             <Col>
             <Button className='bg-[#3b82f6] py-2 px-8 rounded-lg hover:shadow-lg hover:text-slate-200'>Sign Up</Button>
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