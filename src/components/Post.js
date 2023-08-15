import styles from '../styles/home.module.css';
import { Comment } from '../components';
import getTimeAgo from '../utils/giveTime';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { createComment, toggleLike } from '../api';
import { useAuth, usePosts } from '../hooks';
import logo from '../img/649-6491923_heart-emoticon-png-orange-heart-emoji-png-transparent-removebg-preview (2).jpg'


const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const auth=useAuth();
  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);
      const response = await createComment(comment, post._id);
      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment created successfully!', {
          // Toast configuration
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(response.message, {
          // Toast configuration
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      setCreatingComment(false);
    }
  };

  const handlePostLikeClick=async()=>{
    // posts.ToggleLike(post._id);
    const response=await toggleLike('Post',post._id);
    if (response.success) {
      if(response.data.deleted){
        toast.success('Like Toggled Successfully', {
          // Toast configuration
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      else{
        toast.success('Like Toggled Successfully', {
          // Toast configuration
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      posts.ToggleLike(post._id);
    } else {
      toast.error(response.message, {
        // Toast configuration
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  const checkIfLikedUser=()=>{
    let check=false;
    post.likes.map((like)=>{
      if(like===auth.user._id){
        check= true;
      }
    });
    return check;
  }

  return (
    <div className={styles.postWrapper} key={`post-${post?._id}`}>
      {' '}
      {/*padding key as post-userid ,userid from the post */}
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
            alt=""
          />
          <div>
            <Link to={`/user/${post.user?._id}`} className={styles.postAuthor}>
              {post.user?.name}
            </Link>{' '}
            {/* username from post */}
            <span className={styles.postTime}>
              {getTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>{' '}
        {/* post content from post */}
        <div className={styles.postActions}>
          {checkIfLikedUser?<div className={styles.postLike}>
            
            <img
              onClick={handlePostLikeClick}
              src={logo}
              alt="likes-icon"
            /> 
            <span>{post.likes.length}</span>
          </div>:<div className={styles.postLike}>
            
            <img
              onClick={handlePostLikeClick}
              src="https://e7.pngegg.com/pngimages/615/837/png-clipart-heart-symbol-love-symbol-love-text.png"
              alt="likes-icon"
            /> 
            <span>{post.likes.length}</span>
          </div>}
          


          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>
        <div className={styles.postCommentsList}>
          {post.comments.map((cmt) => (
            <Comment key={`post-comment-${cmt?._id}`} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Post;
