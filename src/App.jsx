import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Import the custom CSS

function App() {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const checkInput = () => {
    if (Name === '' || Description === '') {
      setError('Both Name and Description are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkInput()) {
      return;
    }

    const payload = { Name, Description };

    if (editingUserId) {
      // Update user
      axios.put(`${process.env.REACT_APP_SERVER_URL}/form/${editingUserId}`, payload)
        .then(result => {
          console.log(result);
          fetchUsers();
          clearForm();
        })
        .catch(err => console.log(err));
    } else {
      // Create new user
      axios.post(`${process.env.REACT_APP_SERVER_URL}/form`, payload)
        .then(result => {
          console.log(result);
          fetchUsers();
          clearForm();
        })
        .catch(err => console.log(err));
    }
  };

  const fetchUsers = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/form`)
      .then(response => setUsers(response.data))
      .catch(err => console.log("Error Fetching Users", err));
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setEditingUserId(null);
  };

  const handleEdit = (user) => {
    setName(user.Name);
    setDescription(user.Description);
    setEditingUserId(user._id); // Set the user ID for editing
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/form/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch(err => console.log("Error Deleting User", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
          <div className="card">
            <div className="cardbody">
              <h3 className="card-title text-center">Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {error && <div style={{ fontSize: "13px" }} className="alert alert-danger">{error}</div>}
                <center>
                  <button type="submit" className="btn btn-primary btn-block">
                    {editingUserId ? 'Update' : 'Submit'}
                  </button>
                </center>
              </form>
            </div>
          </div>
          <div className="mt-5 card">
            <div className='cardbody'>
            <table className="table table-bordered table-responsive">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.Name}</td>
                      <td>{user.Description}</td>
                      <td>
                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}>Edit</button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Remove</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          </div>
          </>
  );
}

export default App;
