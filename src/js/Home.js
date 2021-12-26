import { useState, useRef } from 'react';
import { Redirect } from 'react-router';
import Login from './Login';
import Signup from './Signup';



function Home(props){
  const {currentUser, setCurrentUser} = props
  const [logInReminder, setLogInReminder] = useState("")
  const [signUpReminder, setSignUpReminder] = useState("")
  const emailLogInInput = useRef("")
  const passwordLogInput = useRef("")
  const emailSignUpInput = useRef("")
  const passwordSignUpInput = useRef("")
  const confirmSignUpInput = useRef("")
  const [logInVisiblity, setLogInVisibility] = useState("visible")
  const [signUpVisibility, setSignUpVisibility] = useState("invisible")
  
  //Set up for information to be displayed in the moving panel
  let signupState = {
    state: "signup",
    buttonText: "Log In",
    captionText: "Already have an Account?",
    transitionClass: "lg:-translate-x-full lg:rounded-l-lg ",
    transitionClass2: "lg:translate-x-full lg:rounded-l-lg "
  }
  let loginState =  {
    state: "login",
    buttonText: "Sign Up",
    captionText: "Don't have an Account?",
    transitionClass: "lg:translate-x-0 lg:rounded-r-lg",
    transitionClass2: "lg:translate-x-0 lg:rounded-r-lg"
  }
  const [homeState, setHomeState] = useState(loginState)
  
  
  //Transition function for when the user wants to shift from logging in to signing up, and vice-versa
  function onTransition() {
    setLogInReminder("")
    setSignUpReminder("")

    if(homeState.state==="login"){
      setHomeState(signupState)
    } else {
      setHomeState(loginState)
    }
  }

  if(Object.keys(currentUser).length === 0){
    return (
    <div className='flex h-full w-full bg-gradient-to-t from-indigo-500 to-gray-100 items-center justify-center'>
      <div className = "lg:border-8 lg:border-none bg-white rounded-lg absolute sm:w-1/2 sm:h-1/2 lg:h-100 lg:w-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
        <div className= {`h-44 w-50 border-8 border-none absolute right-0 z-10 bg-indigo-50 text-center h-full transform transition-all delay-200 ease-in-out duration-700 ${homeState.transitionClass} lg:block hidden`} >
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{homeState.captionText}</h2>

          <button
            onClick={onTransition}
            type="submit"
            className="group relative w-1/2 flex justify-center m-auto my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
            {homeState.buttonText}
          </button>
        </div>
        <div className= {`h-44 w-full sm:w-50 border-8 border-none absolute left-0 z-0 bg-indigo-50 text-center h-full transform transition-all delay-200 ease-in-out duration-700 ${homeState.transitionClass2} lg:visible`} >
          { homeState.state ==="login" ? <Login
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              emailLogInInput={emailLogInInput}
              passwordLogInput={passwordLogInput}
              logInReminder={logInReminder}
              setLogInReminder={setLogInReminder}
              logInVisiblity = {logInVisiblity}
              setLogInVisibility = {setLogInVisibility}
              signUpVisibility = {signUpVisibility}
              setSignUpVisibility = {setSignUpVisibility}
              onTransition = {onTransition}
              /> : <Signup
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              emailSignUpInput={emailSignUpInput}
              passwordSignUpInput={passwordSignUpInput}
              confirmSignUpInput={confirmSignUpInput}
              signUpReminder={signUpReminder}
              setSignUpReminder={setSignUpReminder}
              setHomeState={setHomeState}
              emailLogInInput={emailLogInInput}
              passwordLogInput={passwordLogInput}
              setLogInReminder={setLogInReminder}
              logInVisiblity = {logInVisiblity}
              setLogInVisibility = {setLogInVisibility}
              signUpVisibility = {signUpVisibility}
              setSignUpVisibility = {setSignUpVisibility}
              onTransition  = {onTransition}
              />

          }
        </div>
      </div>
    </div>
    )
  } else {
    return <Redirect to="/dashboard"/>
  }
}
export default Home