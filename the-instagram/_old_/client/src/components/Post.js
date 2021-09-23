import React, { useRef } from "react";
import propTypes from "prop-types";
import Header from "./PostComponents/Header";
import Image from "./PostComponents/Image";
import Actions from "./PostComponents/Actions";
import Footer from "./PostComponents/Footer";
import Comments from "./PostComponents/Comments";
//? header, image, actions(like,comment icons), footer, comments -> components!
const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;

Post.propTypes = {
  content: propTypes.shape({
    username: propTypes.string,
    imageSrc: propTypes.string,
    caption: propTypes.string,
    docId: propTypes.string,
    userLikedPhoto: propTypes.bool,
    likes: propTypes.array,
    comments: propTypes.array,
    dateCreated: propTypes.number,
  }),
};
