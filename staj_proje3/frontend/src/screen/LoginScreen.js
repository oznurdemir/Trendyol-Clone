import React, {useEffect, useState} from 'react'
import { useLocation,useParams,useNavigate, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userAction'
import {Row,Col,ListGroup,Button,Form,Image,Card,LisGroupItem, FormGroup, FormLabel} from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import {LinkContainer} from 'react-router-bootstrap'
import FormContainer from '../component/FormContainer'


function LoginScreen() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch =useDispatch()
  const history = useNavigate()

  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(()=>{
    if(userInfo){
      history(redirect)
    }
    

  },[history, userInfo,redirect])

/** sumbit edildikten sonra yapılacaklar aşağıdaki komutlarda yer almaktadır. */
  const submithander=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
    
  }

  
  return (
    <div>
      <FormContainer>
        <h1>Login</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>} 

        <Form onSubmit={submithander}>

        <FormGroup controlId='email'>
          <FormLabel>Email Adresi</FormLabel>
          <Form.Control
            type='email'
            placeholder='Email adresinizi giriniz:'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          >

          </Form.Control>

        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel>Parola</FormLabel>
          <Form.Control
            type='password'
            placeholder='Parolanızı giriniz:'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          >

          </Form.Control>
        </FormGroup>
        <Button type='submit' variant='warning'onClick={submithander}>Giriş Yap</Button>
        </Form>
        <Row className='py-3'>
          <Col>
          yeni kullanıcı mısınız? <Link to={redirect? `/register?redirect={redirect}`:'/register'}>Üye Ol</Link>
          </Col>
        </Row>
       
      </FormContainer>
    </div>
  )
}

export default LoginScreen