import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

const Header = ({
  photosCount,
  profile: {
    username: visitingUsername,
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
  },
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== visitingUsername;

    const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile
        ? followerCount - 1
        : followerCount + 1,
    });
      
      await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username ? (
          <img
            src={`/images/avatars/${visitingUsername}.jpeg`}
            alt={`${visitingUsername} profile picture`}
            className="rounded-full h-40 w-40 flex"
          />
        ) : (
          <Skeleton count={1} height={180} width={200} />
        )}
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            {user.username ? (
              <>
                <p className="text-2xl mx-10">{visitingUsername}</p>
                {activeBtnFollow && (
                  <button
                    type="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleToggleFollow();
                      }
                    }}
                    onClick={handleToggleFollow}
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    {isFollowingProfile ? "Unfollow" : "Follow"}
                  </button>
                )}
              </>
            ) : (
              <Skeleton className="mx-4" count={1} height={50} width={140} />
            )}
          </div>
          <div className="container flex mt-4">
            {followers === undefined || following === undefined ? (
              <Skeleton count={1} height={24} width={677} />
            ) : (
              <>
                <p className="mx-10">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mx-10">
                  <span className="font-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <p className="mx-10">
                  <span className="font-bold">{following.length}</span>{" "}
                  following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium mx-10">
              {!fullName ? (
                <Skeleton count={1} height={24} width={24} />
              ) : (
                fullName
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  photosCount: propTypes.number,
  followerCount: propTypes.number,
  setFollowerCount: propTypes.func,
  profile: propTypes.shape({
    dateCreated: propTypes.number,
    docId: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
    fullName: propTypes.string,
    userId: propTypes.string,
    username: propTypes.string,
  }),
};
