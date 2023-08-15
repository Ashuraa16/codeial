import styles from '../styles/home.module.css';
import PropTypes from 'prop-types'; //importing th proptypes from prop-types
import { Comment, FriendsList, CreatePost } from '../components';
import getTimeAgo from '../utils/giveTime';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//posts is passed as props and then we will use map function to map each variable to their required position
import Loader from '../components/Loader';
import { useAuth, usePosts } from '../hooks';
import { useState } from 'react';
import { createComment } from '../api';
import Post from '../components/Post';
// import FriendsList from '../components/FriendsList';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  
  if (posts.loading) {
    return <Loader />; //if loading is true the return loader component
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {posts.data?.map((post) => (
          <Post post={post} key={`post-${post._id}`}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

//validate all the props present in the app or component
Home.propType = {
  posts: PropTypes.array.isRequired, //checking the proptype ans isRequired makes it compulsaey to be present for loading home component
};

export default Home;
