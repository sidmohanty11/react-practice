import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { DASHBOARD, LOGIN } from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);

      //if username doesn't exist then only create user ->
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

          await createdUserResult.user.updateProfile({
              displayName: username,
          });

          await firebase.firestore().collection("users").add({
              userId: createdUserResult.user.uid,
              username: username.toLowerCase(),
              fullName,
              emailAddress: emailAddress.toLowerCase(),
              following: [],
              dateCreated: Date.now()
          });

          history.push(DASHBOARD);
      } catch (err) {
          setEmailAddress("");
          setPassword("");
          setFullName("");
          setError(err.message);
      }
    } else {
        setError("That username is already taken, please try again");
    }
  };

  useEffect(() => {
    document.title = "Signup | Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="./images/iphone-signup.png" alt="iphone-instagram" />
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

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your Username"
              placeholder="Username"
              type="text"
              className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your Full Name"
              placeholder="Full Name"
              type="text"
              className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your Email Address"
              placeholder="Email Address"
              type="email"
              className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your Password"
              placeholder="Password"
              type="password"
              className="text-gray-base text-sm w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium w-full rounded h-8 font-bold text-white ${
                isInvalid && "opacity-50"
              }`}
            >
              Signup
            </button>
          </form>
        </div>
        <div className="flex rounded justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
