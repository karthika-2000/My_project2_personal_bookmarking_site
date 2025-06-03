import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadBookmarks } from '../features/bookmarks/BookmarkSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import checkAuth from '../features/auth/CheckAuth';

const ViewBookmark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const bookmarks = useSelector((state) => state.bookmarks.items);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    if (user) dispatch(loadBookmarks(user));
  }, [dispatch, user]);

  
  const totalPages = Math.ceil(bookmarks.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visible = bookmarks.slice(start, end);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Bookmark Listing</h2>

        <div className="mb-3 d-flex justify-content-end">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>

        {visible.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          <ul className="list-group">
            {visible.map((bm, index) => (
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
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="mt-3 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default  checkAuth(ViewBookmark);
