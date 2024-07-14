import React, { useEffect, useState } from 'react';
import axios from 'axios';


function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newISBN, setNewISBN] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://book-ecf27-default-rtdb.europe-west1.firebasedatabase.app/books.json');
        const fetchedBooks = response.data ? Object.keys(response.data).map(key => ({ id: key, ...response.data[key] })) : [];
        setBooks(fetchedBooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (book) => {
    setEditBook(book);
    setNewTitle(book.title);
    setNewAuthor(book.author);
    setNewISBN(book.isbn);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://book-ecf27-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`);
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    console.log(`Deleted book with ID: ${id}`);
  };

  const handleUpdate = async (id) => {
    const updatedBook = { ...editBook, title: newTitle, author: newAuthor, isbn: newISBN };

    await axios.put(`https://book-ecf27-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`, updatedBook);

    setBooks(prevBooks => prevBooks.map(book => (book.id === id ? updatedBook : book)));

    setEditBook(null);
    setNewTitle('');
    setNewAuthor('');
    setNewISBN('');
  };

  const handleAddBook = async () => {
    const newBook = { title: newTitle, author: newAuthor, isbn: newISBN };

    const response = await axios.post('https://book-ecf27-default-rtdb.europe-west1.firebasedatabase.app/books.json', newBook);

    newBook.id = response.data.name;

    setBooks(prevBooks => [...prevBooks, newBook]);
    setShowAddForm(false);
    setNewTitle('');
    setNewAuthor('');
    setNewISBN('');
  };

  return (
    <>
 
  
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Book Catalog</h2>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </button>

        {showAddForm && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Author"
            />
            <input
              type="text"
              value={newISBN}
              onChange={(e) => setNewISBN(e.target.value)}
              placeholder="ISBN"
            />
            <button onClick={handleAddBook}>Add Book</button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {books && books.map(book => (
              <li key={book.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                {editBook && editBook.id === book.id ? (
                  <div>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Author"
                    />
                    <input
                      type="text"
                      value={newISBN}
                      onChange={(e) => setNewISBN(e.target.value)}
                      placeholder="ISBN"
                    />
                    <button onClick={() => handleUpdate(book.id)}>Update</button>
                    <button onClick={() => setEditBook(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <strong>Title:</strong> {book.title}<br />
                    <strong>Author:</strong> {book.author} <br />
                    <strong>ISBN:</strong> {book.isbn}<br />
                    <button onClick={() => handleEdit(book)} style={{ marginLeft: '75%', marginBottom:'1%'}}>Edit</button>
                    <button onClick={() => handleDelete(book.id)} style={{ marginLeft: '75%'}} >Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
     
    </>
  );
}

export default BookCatalog;
