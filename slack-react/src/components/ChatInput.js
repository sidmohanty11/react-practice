import React,{useRef} from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from 'firebase';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelID, chatRef }) => {
    const inputRef = useRef(null);
    const [user] = useAuthState(auth);
    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelID) {
            return false;
        }

        db.collection('rooms').doc(channelID).collection("messages").add({
            message: inputRef.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage:user.photoURL,
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        });

        inputRef.current.value = '';
    }
    return (
    <ChatInputContainer>
          <form>
              <input ref={inputRef} placeholder={`Message #${channelName}`} />
              <Button hidden type="submit" onClick={sendMessage}>
                SEND
              </Button>
      </form>
    </ChatInputContainer>
  );
};
//https://i2.wp.com/i.pinimg.com/originals/74/ee/4f/74ee4faee9183bb00ecb27742a5f5d8f.jpg
export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius:20px;

    >form{
        position:relative;
        display:flex;
        justify-content:center;
    }

    >form >input{
        position:fixed;
        bottom:30px;
        width:60%;
        border:1px solid gray;
        border-radius:3px;
        padding:20px;
        outline:none;
    }

    >form >button{
        display:none !important;
    }
`;

const Button = styled.button``;