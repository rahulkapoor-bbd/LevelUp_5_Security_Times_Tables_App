import { pool } from '../resource-db-connection/resourceDbConnection';

class UserModel {
  getUsers = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User';

      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  getUserById = (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User WHERE UserID = ?';
      const values = [userId];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  };

  getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User WHERE Username = ?';
      const values = [username];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  };

  getUserDifficulty = (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT DifficultyID FROM User WHERE Username = ?';
      const values = [username];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  };

  insertUser = (user) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO User (DifficultyID, Username, HighScore, FirstName, PasswordHash, Salt) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [user.DifficultyID, user.Username, user.HighScore, user.FirstName, user.PasswordHash, user.Salt];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  };

  updateUser = (user) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE User SET DifficultyID = ?, Username = ?, HighScore = ?, FirstName = ?, PasswordHash = ?, Salt = ? WHERE UserID = ?';
      const values = [user.DifficultyID, user.Username, user.HighScore, user.FirstName, user.PasswordHash, user.Salt, user.UserID];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  };

  updateUserDifficulty = (user) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE User SET DifficultyID = ? WHERE UserID = ?';
      const values = [user.DifficultyID, user.UserID];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  };

  updateUserHighScore = (user) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE User SET HighScore = ? WHERE UserID = ?';
      const values = [user.HighScore, user.UserID];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  };
}

export default UserModel;
