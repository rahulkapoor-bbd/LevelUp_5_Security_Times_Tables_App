import { pool } from '../resource-db-connection/resourceDbConnection.js';

class DifficultyModel {
  getDifficulties = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Difficulty';

      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
}

export default DifficultyModel;
