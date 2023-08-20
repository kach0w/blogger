import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'

import { useAuth } from '../context/AuthUserContext';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      console.log("Success. The user is created in firebase")
      router.push('/logged_in');
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <Container className="text-center shadow-[0_1px_4px_rgba(0,0,0,0.30)] rounded-md p-4 w-[20rem] mt-5 sm:w-[30rem] mx-auto">
        <Row>
          <Col>
            <h2 className='text-[24px] sm:text-[40px] pb-2 text-[#222]'>Login</h2>
          </Col>
        </Row>
        <Row className="text-[white]">
          <Col>
            <Form onSubmit={onSubmit}>
            { error && <Alert className="text-[red] pb-2 sm:w-[20rem] mx-auto" color="danger">{error}</Alert>}
              <FormGroup row>
                {/* <Label for="loginEmail" sm={4}>Email</Label> */}
                <Col sm={8}>
                  <Input
                    className='rounded-md p-2 text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email" />
                </Col>
              </FormGroup>
              <FormGroup row className='pt-3'>
                {/* <Label for="loginPassword" sm={4}>Password</Label> */}
                <Col sm={8}>
                  <Input
                    className='rounded-md p-2 text-[black] shadow-[0_1px_4px_rgba(0,0,0,0.30)]'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password" />
                </Col>
              </FormGroup>
              <FormGroup row>
              <Col className='pt-5'>
                <Button className='bg-[#3b82f6] py-2 px-8 rounded-lg hover:shadow-lg hover:text-slate-200'>Login</Button>
              </Col>
            </FormGroup>
            <FormGroup row className='pt-[5rem] text-slate-700'>
              <Col>
              Don't have an account? <a className="hover:underline text-[#3b82f6]" href="/sign_up">Sign Up</a>
              </Col>
            </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    
  )
}