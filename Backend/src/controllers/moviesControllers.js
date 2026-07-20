// let movies = [
//     {id: 1, title: "Spider-Man", year: 2002},
//     {id: 2, title: "John Wick", year: 2014},
//     {id: 3, title: "The Avengers", year: 2012},
//     {id: 4, title: "Logan", year: 2017},
// ]

// const getMovie = (req, res) => {
//     let {title} = req.query
//     console.log(title)
//     if(title == undefined){
//         title = ""
//     }
//     let result = ""
//     movies.forEach((item,index) => {
//         if(item.title.toLowerCase().includes(title.toLowerCase())){
//             result += `<H1> ${index+1}. ${item.title}. Tahun Rilis : ${item.year} </H1>`
//         }
//     })
//     res.send(result)
// }

// const getMovieById = (req, res) => {
//     let {id} = req.params
//     let result = movies.find((item) => {
//         return item.id === Number(id)
//     })
//     res.send(result.title)
// }

// //Middleware
// const loggerMiddleware = (req, res, next) => {
//     console.log(`Method: ${req.method}`)
//     console.log(`URL: ${req.url}`)
//     next()
// }

// const tokenMiddleware = (req, res, next) => {
//     let {token} = req.query
//     if (token === "12345") {
//         next()
//     } else {
//         res.status(401).json({
//             message: "Token tidak valid"
//         })
//     }
// }

// const yearMiddleware = (req, res, next) => {
//     let {year} = req.query
//     if (year !== undefined) {
//         if(isNaN(Number(year))) {
//             return res.status(400).json({message: "Tahun tidak ditemukan"})
//         }
//         console.log(`Filter by year: ${year}`)
//     }
//     next()
// }

// const timeMiddleware = (req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// };

// const checkIdMoviesMiddleware = (req, res, next) => {
//     let{id} = req.params
//     let result = movies.find(item => item.id === Number(id))
//     if (result) {
//         next()
//     } else {
//         res.status(404).json({message: "Movies tidak ditemukan"})
//     }
// }

// const getMovieApi = (req, res) => {
//     let {title,year} = req.query
//     let result = movies.filter((item) => {
//         let match = true
//         if (title) {
//             match = match && item.title.toLowerCase().includes(title.toLowerCase())
//         }
//         if (year) {
//             match = match && item.year === Number(year)
//         }
//         return match
//     })
//     res.json(result)
// }

// const getMovieByIdApi = (req, res) => {
//     let {id} = req.params
//     let result = movies.find((item) => {
//         return item.id === Number(id)
//     })
//     res.json(result)
// }

// module.exports =
// {
//     getMovie,
//     getMovieById,
//     loggerMiddleware,
//     tokenMiddleware,
//     yearMiddleware,
//     timeMiddleware,
//     checkIdMoviesMiddleware,
//     getMovieApi,
//     getMovieByIdApi
// }

const connectionPool = require("../config/db.js");
const readMovie = (req, res) => {
  let queryText = "SELECT * FROM db_movies.tb_movie";
  connectionPool.query(queryText, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
};

const readMovieById = (req, res) => {
  let { id } = req.params;
  let queryText = `SELECT * FROM db_movies.tb_movie WHERE id_tb_movie = ${id}`;
  connectionPool.query(queryText, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
};

const createMovie = (req, res) => {
  let { title, year } = req.body;
  let queryText = `INSERT INTO tb_movie(title_db_movie, year_db_movie)
    VALUES ("${title}", ${year})`;
  connectionPool.query(queryText, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.json({ message: "Berhasil" });
  });
};

const updatemovie = (req, res) => {
  let { title, year } = req.body;
  let { id } = req.params;
  let queryText = `UPDATE tb_movie SET title_db_movie = "${title}", year_db_movie = ${year} WHERE id_tb_movie = ${id}`;

  connectionPool.query(queryText, [title, year, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json({ message: "Data berhasil diupdate" });
  });
};

const deletemovie = (req, res) => {
  let { id } = req.params;
  let queryText = `DELETE FROM tb_movie WHERE id_tb_movie = ${id}`;

  connectionPool.query(queryText, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({ Message: "Data Berhasil Dihapus" });
  });
};

module.exports = {
  readMovie,
  readMovieById,
  createMovie,
  updatemovie,
  deletemovie,
};
