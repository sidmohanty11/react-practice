import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = React.useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    // TODO update the following array of the logged in user! -> +1
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // TODO update the followers array of the user who has been followed! -> +1
    await updateFollowedUserFollowers(profileDocId, userId, false);
    //false because in the suggestions we won't get any profile that we have already followed!
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpeg`}
          alt=""
          className="rounded w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={() => { handleFollowUser();}}
      >
        Follow
      </button>
    </div>
  ) : (
    <></>
  );
};

SuggestedProfile.propTypes = {
  profileDocId: propTypes.string,
  username: propTypes.string,
  profileId: propTypes.string,
  userId: propTypes.string,
  loggedInUserDocId: propTypes.string,
};

export default SuggestedProfile;
