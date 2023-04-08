import React from 'react'
import { Button, Form,FormControl,Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

    const navigate = useHistory();

  const search = ()=> {
    navigate.push("/dashboard")
  }
  return (
    
    <div className='main' >
        <Container >
            <Row>
                <div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome to Book My Nest!!</h1>
                        <p className='subtitle'> One stop shop for your homes. </p>
                    </div>
                    <div className='search-container' >
                        <button onClick={search}>search</button>
                    </div>
                    {/* <div className='buttonContainer'>
                        <a href='/login'>
                            <Button size='lg' className='landingbutton'>
                                Login
                            </Button>
                        </a>

                        <a href='/register'>
                            <Button size='lg' className='landingbutton' variant='outline-light'>
                                Sign up
                            </Button>
                        </a>


                    </div> */}
                </div>
            </Row>
        </Container>

    </div>
  )
}

export default LandingPage