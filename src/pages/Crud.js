import React, { useState } from "react";
import axios from "axios";

const CRUD = () => {
  const [formData, setFormData] = useState({
    userId: Math.floor(Math.random() * 1000),
    title: "",
    body: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userId, title, body } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData)
        .then((res) => {
          setData([res.data, ...data]);
          setFormData({
            userId: Math.floor(Math.random() * 1000),
            title: "",
            body: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleGetData = () => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-2">
          <h4>CRUD API Integration with GET & POST using Axios</h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                placeholder="Enter body"
                name="body"
                value={body}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Add Post
            </button>

            <button type="button" className="btn btn-success mt-2 ms-2" onClick={handleGetData}>
              Get Data
            </button>
          </form>

          <hr />

          {loading && <h5>Loading...</h5>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRUD;
