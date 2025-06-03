import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark } from '../features/bookmarks/BookmarkSlice';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../features/auth/CheckAuth';

const AddBookmark = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const user = useSelector((state) => state.auth.user);
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();

   
    if (bookmarks.length >= 5) {
      alert('You can only add 5 bookmarks');
      return;
    }

    dispatch(addBookmark({ user, bookmark: { title, url } }));
    alert('Bookmark added successfully!');
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className='text-center'>Add Bookmark</h2>
        <form onSubmit={handleAdd} className="card p-4 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="url"
            className="form-control mb-3"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button className="btn btn-success w-100" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default  checkAuth(AddBookmark);
