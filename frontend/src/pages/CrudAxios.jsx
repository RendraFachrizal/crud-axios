import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/movie";

const CrudAxios = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ movieTitle: "", movieYear: "" });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const fetchData = () => {
    axios.get(API_URL).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setInput({ movieTitle: "", movieYear: "" });
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, {
          title: input.movieTitle,
          year: input.movieYear,
        });
      } else {
        await axios.post(API_URL, {
          title: input.movieTitle,
          year: input.movieYear,
        });
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    let { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const respond = await axios.get(`${API_URL}/${id}`);
      const movie = respond.data[0];
      setInput({
        movieTitle: movie.title_db_movie,
        movieYear: movie.year_db_movie,
      });
      setEditId(id);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <h1>CURD AXIOS</h1>
      <div className="div-input-movie">
        <form onSubmit={handleSubmit}>
          <label htmlFor="movieTitle">Movie Title</label>
          <input
            type="text"
            id="movieTitle"
            name="movieTitle"
            placeholder="Input Your Movie Title.."
            value={input.movieTitle}
            onChange={handleChange}
            required
          />

          <label htmlFor="movieYear">Movie Year</label>
          <input
            type="number"
            id="movieYear"
            name="movieYear"
            placeholder="Input Movie Year.."
            value={input.movieYear}
            onChange={handleChange}
            required
          />

          <input type="submit" value={editId ? "Update" : "Submit"} />
          {editId && <input type="button" value="Cancel" onClick={resetForm} />}
        </form>
      </div>
      <div className="div-table-movie">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{item.title_db_movie}</td>
                  <td>{item.year_db_movie}</td>
                  <td>
                    <button
                      className="bt-del"
                      onClick={() => {
                        if (confirm("Apa Anda Yakin Menghapus File Ini ?")) {
                          handleDelete(item.id_tb_movie);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bt-edit"
                      onClick={() => {
                        handleEdit(item.id_tb_movie);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default CrudAxios;
