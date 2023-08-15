import { createContext } from "react";

import { useProvidePosts } from "../hooks";

const initialState={
    posts:[],
    loading:true,
    addPostToState:()=>{},
    addComment:()=>{},
    ToggleLike:()=>{}
}

export const PostContext=createContext(initialState);

export const PostsProvider=({children})=>{
    const posts=useProvidePosts();
    return(
        <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
}

