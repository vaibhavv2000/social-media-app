import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface post {
  showUpload: boolean;
  edit: {
    isEditing: boolean;
    status: string;
    image: null | string;
    postId: number | null | string;
  };
  timeline_posts: any[];
  comments: any[];
}

const initialState: post = {
  showUpload: false,
  edit: {
    isEditing: false,
    status: "",
    image: null,
    postId: "",
  },
  timeline_posts: [],
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleUpload: (state) => {
      state.showUpload = !state.showUpload;
      state.edit.isEditing = false;
      state.edit.image = null;
      state.edit.status = "";
    },
    editPost: (state,action) => {
      state.showUpload = true;
      state.edit.isEditing = true;
      state.edit.postId = action.payload;
    },
    editStatus: (state,action: PayloadAction<string>) => {
      state.edit.status = action.payload;
    },
    addImage: (state,action: PayloadAction<any>) => {
      state.edit.image = action.payload;
    },
    addNewPost: (state,action: PayloadAction<any>) => {
      const p = state.timeline_posts;
      console.log("p",p)
      p.unshift(action.payload);
      state.timeline_posts = p;
    },
    addPosts: (state,action: PayloadAction<any>) => {
      state.timeline_posts = action.payload;
    },
    removePost: (state,action: PayloadAction<any>) => {
      const created_at = action.payload;
      state.timeline_posts = state.timeline_posts.filter(
        (p) => p.created_at !== created_at
      );
    },
    addComments: (state,action: PayloadAction<any>) => {
      state.comments = [...state.comments,action.payload];
    },
    addNewComment: (state, action: PayloadAction<any>) => {
      const {id,comment} = action.payload;
      const c = state.comments.find(p => p.postId === id);
      c.comments.push(comment);
      const newarr = state.comments.filter(p => p.postId !== id);
      newarr.push(c);
      state.comments = newarr;
    },
    removeComments: (state,action: PayloadAction<any>) => {
      const {id,comment} = action.payload;
      const mc = state.comments.find(p => p.postId === id); 
      const c = mc.comments.filter((p: any) => p.comment !== comment);
      mc.comments = c;
      const newarr = state.comments.filter(p => p.postId !== id);
      newarr.push(mc);
      state.comments = newarr;
    },
    updatePost: (state,action) => {
      const {id,status,image} = action.payload;
      const p = state.timeline_posts.find((p) => String(p.id) === String(id));
      p.status = status;
      p.image = image;
      const posts = state.timeline_posts.filter((p) => String(p.id) !== String(id));
      posts.unshift(p);
      state.timeline_posts = posts;
    },
  },
});

export const {
  toggleUpload,
  editStatus,
  addImage,
  editPost,
  addNewPost,
  addPosts,
  removePost,
  addComments,
  addNewComment,
  removeComments,
  updatePost,
} = postSlice.actions;

export default postSlice.reducer;
