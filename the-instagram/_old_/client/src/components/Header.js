import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { UserContext } from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <div className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg  h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  className="mt-2 w-2/12"
                  src="/images/instagram-logo1.png"
                  alt="Instagram"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <div className="mr-2">
                  <Link to={ROUTES.DASHBOARD}>
                    <img src="/images/home.png" alt="to dashboard" />
                  </Link>
                </div>
                <div className="mr-2">
                  <Link to={ROUTES.MESSAGE}>
                    <img src="/images/send.png" alt="to messages" />
                  </Link>
                </div>
                <div className="mr-2">
                  <button
                    type="button"
                    title="SignOut"
                    onClick={() => firebase.auth().signOut()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        firebase.auth().signOut();
                      }
                    }}
                  >
                    <img src="/images/logout.png" alt="logout" />
                  </button>
                </div>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={`/images/avatars/${user.displayName}.jpeg`}
                      alt=""
                      className="rounded-full h-10 w-32 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bond text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
