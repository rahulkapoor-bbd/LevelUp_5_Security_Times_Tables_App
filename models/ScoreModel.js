import { pool } from '../resource-db-connection/resourceDbConnection.js';

class ScoreModel {
  getScores = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Score';

      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  getScoresByUserId = (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Score WHERE UserID = ?';
      const values = [userId];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  getMaxScoreByUserId = (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT MAX(ScoreValue) AS MaxScore FROM Score WHERE UserID = ?';
      const values = [userId];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].MaxScore);
        }
      });
    });
  };

  insertScore = (scoreData) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO Score (Username, ScoreValue) VALUES (?, ?)';
      const values = [scoreData.username, scoreData.score];

      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  };
W
}

export default ScoreModel;
