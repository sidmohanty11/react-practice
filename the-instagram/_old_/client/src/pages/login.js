import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { DASHBOARD, SIGN_UP } from '../constants/routes';

const Login = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin =async (e) => {
      e.preventDefault();
      //sign in and push the user to the dashboard 
      //if everything went well else reset and show the error message
      try {
        await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
        history.push(DASHBOARD);
      } catch (err) {
        setEmailAddress('');
        setPassword('');
        setError(err.message);
      }
    };

    useEffect(() => {
        document.title = 'Login | Instagram';
    }, []);


    return (
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img src="./images/iphone.jpg" alt="iphone-instagram" />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col items-center rounded bg-white p-4 border border-gray-primary mb-4">
            <h1 className="flex justify-center w-full">
              <img
                src="./images/instagram-logo1.png"
                alt="instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleLogin} method="POST">
              <input
                aria-label="Enter your Email Address"
                placeholder="Email Address"
                type="email"
                className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmailAddress(target.value)}
              />
              <input
                aria-label="Enter your Password"
                placeholder="Password"
                type="password"
                className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium w-full rounded h-8 font-bold text-white ${
                  isInvalid && "opacity-50"
                }`}
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex rounded justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to={SIGN_UP} className="font-bold text-blue-medium">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    );
}

export default Login;
