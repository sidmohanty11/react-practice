import React, { useReducer, useEffect } from "react";
import propTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import { getUserPhotosByUsername } from "../../services/firebase";

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};
const reducer = (state, newState) => ({ ...state, ...newState });

const UserProfile = ({ user }) => {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: propTypes.shape({
    dateCreated: propTypes.number,
    emailAddress: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
    fullName: propTypes.string,
    userId: propTypes.string,
    username: propTypes.string,
  }),
};
