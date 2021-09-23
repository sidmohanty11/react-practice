import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    //storing the value of user when the page loads!
    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged((authUser) => {
          if (authUser) {
            //if we have a user, store it in localStorage
          localStorage.setItem("authUser", JSON.stringify(authUser));
          setUser(authUser);
          } else {
              //if we dont have an authuser, therefore clear out local storage
          localStorage.removeItem("authUser");
          setUser(null);
        }
      });

        return () => listener();
    }, [firebase]);

    return { user };
}