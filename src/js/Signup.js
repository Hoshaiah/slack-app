import logo from '../logo.svg';
import { useHistory } from 'react-router';
import { useRef } from 'react';



function Signup(){

  let history = useHistory()
  const emailInput = useRef("")
  const passwordInput = useRef("")
  const confirmInput = useRef("")
  

    async function registerUser(){

      let body = {
        "email": emailInput.current.value,
        "password": passwordInput.current.value,
        "password_confirmation": confirmInput.current.value
      }
    
      let url = "http://206.189.91.54/api/v1/auth/"
    
      const user = await fetch(url,
       {method: "POST",
       headers: {
         'Content-Type': 'application/json'
       }, 
        body: JSON.stringify(body)})
      let userData = await user.json()
      console.log(userData)
    }

    function onSignin() {
      history.push("/dashboard")
      registerUser()
    }

    return (
    <div className="min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 absolute right-0 w-1/2">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailInput}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  ref={passwordInput}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  ref={confirmInput}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>


            <div>
              <button
              onClick={onSignin}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
            
          </form>
        </div>
      </div>
    )
}
export default Signup