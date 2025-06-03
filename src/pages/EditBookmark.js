import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { editBookmark } from '../features/bookmarks/BookmarkSlice';
import { useNavigate, useParams } from 'react-router-dom';
import checkAuth from '../features/auth/CheckAuth';

const EditBookmark = () => {
  const { index } = useParams();
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (bookmarks[index]) {
      setTitle(bookmarks[index].title);
      setUrl(bookmarks[index].url);
    }
  }, [index, bookmarks]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editBookmark({ user, index: parseInt(index), updatedBookmark: { title, url } }));
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Edit Bookmark</h2>
        <form onSubmit={handleUpdate} className="card p-4 col-md-6 mx-auto">
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
          <button className="btn btn-warning w-100" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default  checkAuth(EditBookmark);
