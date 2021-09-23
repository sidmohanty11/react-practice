import { firebase, FieldValue } from "../lib/firebase";

//* function to determine if the user already exists or not ->
//* returns an array of [true or false], based on that we can provide an error state
export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

//* getting user by username
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

//* function to get the user object by comparing the userId in the object and the payload userId!
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return user;
}

//* gets the suggested profiles to follow for the user, basically goes through the followers of user and doesn't
//* show the user to follow the already followed id but shows the ids which aren't being followed
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

//* function to get the logged in user and update its following if he/she clicked the follow button at the suggestion!
//* +1 following of the logged in user if he/she doesn't already follow the account
//* if he/she already follows the person? => UNFOLLOW!!! *_*
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, //? currently logged in user (me)
  profileId, //? user that I request to follow or unfollow
  isFollowingProfile //? true/false (am I currently following this profile?)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

//* function to get the user that has been clicked to be followed and update his/her followers!
//* +1 follower of the profile clicked to be followed!
//* -1 follower of the profile if clicked unfollow, right? *_*
export async function updateFollowedUserFollowers(
  profileDocId, //? user that I request to follow or unfollow
  loggedInUserDocId, //? currently logged in user (me)
  isFollowingProfile //? true/false (am I currently following this profile?)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      //photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);

  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();
  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(
    activeUserDocId, //? my doc ID
    profileUserId, //? the user I followed USERID
    isFollowingProfile //? is already following?
  );

  await updateFollowedUserFollowers(
    profileDocId, //? my DOC ID
    followingUserId, //? the user I followed USERID
    isFollowingProfile //? is already following?
  );
}
