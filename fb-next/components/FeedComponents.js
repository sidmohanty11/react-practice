import Image from "next/image";
import { useSession } from "next-auth/client";
import React from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const stories = [
  {
    name: "Sidharth Mohanty",
    src: "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
    profile:
      "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
  },
  {
    name: "Sidharth Mohanty",
    src: "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
    profile:
      "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
  },
  {
    name: "Sidharth Mohanty",
    src: "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
    profile:
      "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
  },
  {
    name: "Sidharth Mohanty",
    src: "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
    profile:
      "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
  },
  {
    name: "Sidharth Mohanty",
    src: "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
    profile:
      "https://scontent.fccu21-1.fna.fbcdn.net/v/t1.6435-9/92685712_105045311164690_9071853652305510400_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ArfQR_n-GU4AX8DUYEK&_nc_oc=AQkszNg4QJrfTgXKBLrhvBAf_5QQDaYJIZXzpoh9jVXdsMr063dCYUVNKoUO3rcQ6dw&_nc_ht=scontent.fccu21-1.fna&oh=8c75c1e0c558aad68845fcf34b48116d&oe=60CF1759",
  },
];

function StoryCard({ name, src, profile }) {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 cursor-pointer lg:h-56 lg:w-32 overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      <Image
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
        src={src}
        layout="fill"
      />
      <p className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">
        {name}
      </p>
    </div>
  );
}

export const Stories = () => {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <StoryCard
          key={story.src}
          name={story.name}
          profile={story.profile}
          src={story.src}
        />
      ))}
    </div>
  );
};

export const InputBox = () => {
  const [session] = useSession();
  const inputRef = React.useRef(null);
  const filePicker = React.useRef(null);
  const [imageToPost, setImageToPost] = React.useState(null);
  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (e) => console.log(e),
            () => {
              storage
                .ref(`posts/${doc.id}`)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
    setImageToPost(null);
  };

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
          objectFit="cover"
        />
        <form className="flex flex-1">
          <input
            type="text"
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder="What's on your mind?"
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor:pointer"
            onClick={removeImage}
          >
            <img
              src={imageToPost}
              alt=""
              className="h-10 w-10 object-contain"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div onClick={() => filePicker.current.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
          <input ref={filePicker} onChange={addImage} type="file" hidden />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
      </div>
    </div>
  );
};

function Post({ key, name, message, email, timestamp, image, postImage }) {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img src={image} alt={name} className="rounded-full" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
        )}
    </div>
  );
}

export const Posts = () => {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  return (
    <div>
      {realtimePosts?.docs.map((post) => {
        <Post
          key={post.id}
          name={post.data().name}
          message={post.data().message}
          email={post.data().email}
          timestamp={post.data().timestamp}
          image={post.data().image}
          postImage={post.data().postImage}
        />;
      })}
    </div>
  );
};
