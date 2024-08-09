import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import '../index.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { checkValidate } from '../utils/validate';

const Login = () => {
  // console.log(checkValidate("Manisha" ,"m@gmail.com" , "M@123456"))
  const [isSignInForm, setisSignInForm] = useState(true);

  const [errorMessage, seterrormessage] = useState(null);
  const navigate = useNavigate();
  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm);
  }


  
const Name = useRef(null);
const email = useRef(null);
const password = useRef(null);

const handleOnChangePwd =(e)=>{
  const value1 = e.target.value;
  console.log(value1);
  password.current= value1;


}
const handleName =(e)=>{
  const value2 = e.target.value;
  console.log(value2);
  Name.current= value2;


}

const handleEmail =(e)=>{
  const value3 = e.target.value;
  
  email.current= value3;
}
  const handleButtonClick=()=>{
    

  const Message = checkValidate(Name.current, email.current, password.current);
   console.log(Message);
   console.log("handle button clicked");
   if(Message===null){
    if (!isSignInForm) {
      
      
      createUserWithEmailAndPassword(auth , email.current, password.current)
        .then((userCredential) => {
          
          const user = userCredential.user;
          console.log(user);
          navigate('/browse');

          
          
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(`Error: ${errorCode} - ${errorMessage}`);
          

        });
    } else {
      
      signInWithEmailAndPassword(auth, email.current, password.current)
        .then((userCredential) => {
          
          const user = userCredential.user;
          console.log(user);
          navigate('/browse');

        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(`Error: ${errorCode} - ${errorMessage}`);
        });
    }
   }else{
    seterrormessage(Message);
    return;

   }

    
    

  //   if(!isSignInForm){
  //     createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  // .then((userCredential) => {
  //   // Signed up 
  //   const user = userCredential.user;
  //   console.log(user);
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   seterrormessage(errorCode+"-" +errorMessage);
  //   // ..
  // });

  //   }else{


  //   }
  // }


   
  }
  

  return (
   <div>
    <Header/>
<div className='absolute'>
      <img src='https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_small.jpg
' alt='Netflix' />
    

    </div>

    <form  onSubmit={(e)=>e.preventDefault()}  className=' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-65 text-white'>
    <h1 className=' text-3xl font-medium'>{isSignInForm?  'Sign In' : 'Sign Up'}</h1>
    {!isSignInForm &&  <input ref={Name} onChange={handleName}   type='text' placeholder='Full Name' className='p-3 my-4 w-full bg-slate-700 bg-opacity-65'/>}
      <input type='text' ref={email} onChange={handleEmail}  placeholder='Entre Email Or phone no' className='p-3 my-4 w-full bg-slate-700 bg-opacity-65'/>

   
      <input type='Password' ref={password} onChange={handleOnChangePwd} placeholder='Password' className='p-3 my-4 w-full bg-slate-700 bg-opacity-65'/>


      <p className='text-red-500'>{errorMessage}</p>
      <button onClick={handleButtonClick} className='bg-red-700 p-2 my-4 w-full'>{isSignInForm?  'Sign In' : 'Sign Up'}</button>
      <p className='text-white text-center'>OR </p>

      <button className='bg-gray-50 bg-opacity-30  p-2 my-2 w-full hover:bg-opacity-10'>Use a Sign In Code</button>
      <p> Forget Password ?</p>
       <input type='checkbox' />Rebember me
      <p className='py-4' onClick={toggleSignInForm}>
      {isSignInForm?  'New To Netflix ? Sign Up Now' : "Alredy registered ? Sign Up Now"} </p>
    </form>
   </div> 
  );
};

export default Login;
