import { useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { AuthContext, PostContext } from '../providers';
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFreinds,
  getPosts,
} from '../api';
import {
  setItemInLocalStorage,
  localStorage_Token_Key,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(localStorage_Token_Key);
      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFreinds();
        let friends = [];

        if (response.success) {
          friends = response.data.friends;
        }
        setUser({ ...user, friends });
      }
      setLoding(false);
    };
    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        localStorage_Token_Key,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        localStorage_Token_Key,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return { success: false, message: response.message };
    }
  };

  const updateUserFriends = async (addFriend, friend) => {
    if (addFriend === true) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }
    // console.log("freindddd",friend.to_user.id);
    const newFriends = user.friends?.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({ ...user, friends: newFriends });
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(localStorage_Token_Key);
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  const addPostToState = (post) => {
    const newpost = [post, ...posts];
    setPosts(newpost);
  };
  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [comment, ...post.comments] };
      }
      return post;
    });
    setPosts(newPosts);
  };

  const ToggleLike = (postId) => {
    let post = posts.filter((post) => {
      return post._id === postId;
    });
    let userFound = post[0].likes.filter((user) => {
      return user === auth.user._id;
    });
    let newpost;
    console.log(posts);
    let newLikes = [];
    if (userFound.length <= 0) {
      newLikes.push(auth.user._id);
      newpost = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: [...post.likes, auth.user._id] };
        }
        return post;
      });
    } else {
      console.log('before', post);
      newpost = posts.map((post) => {
        if (post._id === postId) {
          let newLikes = post.likes.map((like) => {
            if (like === auth.user._id) {
              return null; // Remove the like from the array
            }
            return like; // Keep the like in the array
          });

          // Remove null values from the newLikes array using filter
          newLikes = newLikes.filter((like) => like !== null);

          return { ...post, likes: newLikes };
        } else {
          return post;
        }
      });
    }

    setPosts(newpost);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
    ToggleLike,
  };
};
