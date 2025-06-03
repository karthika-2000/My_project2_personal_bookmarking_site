import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { loadBookmarks, deleteBookmark } from '../features/bookmarks/BookmarkSlice';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../features/auth/CheckAuth';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) dispatch(loadBookmarks(user));
  }, [dispatch, user]);

  const filtered = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bookmark?')
    if(confirmDelete){
        dispatch(deleteBookmark({ user, index }));
    } 
  };

  return (
    <>
      <Navbar />
      <div
        className="py-5"
        style={{
          backgroundImage: "url('/dark-blue-memphis-blog-banner-template_53876-98946.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="container bg-white bg-opacity-75 p-4 rounded shadow">
          <h2>Your Bookmarks</h2>

          <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
            <input
              type="text"
              placeholder="Search title or URL"
              className="form-control w-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary ms-3 mt-2 mt-sm-0"
              onClick={() => navigate('/add')}
            >
              Add Bookmark
            </button>
          </div>

          {filtered.length === 0 ? (
            <p>No bookmarks found.</p>
          ) : (
            <ul className="list-group">
              {filtered.map((bm, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <strong>{bm.title}</strong> <br />
                    <a href={bm.url} target="_blank" rel="noreferrer">
                      {bm.url}
                    </a>
                    <br />
                    <small className="text-muted">Added: {bm.time}</small>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/view/${index}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/edit/${index}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default  checkAuth(Dashboard) ;
