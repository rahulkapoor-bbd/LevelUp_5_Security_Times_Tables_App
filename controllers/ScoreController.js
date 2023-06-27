import ScoreModel from '../models/ScoreModel.js';

const scoreModel = new ScoreModel();

export const getScores = async (req, res) => {
  try {
    const scores = await scoreModel.getScores();
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
};

export const getScoresByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const scores = await scoreModel.getScoresByUserId(userId);
      res.json(scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: 'Failed to fetch scores' });
    }
  };

  export const getMaxScoreByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const maxScore = await scoreModel.getMaxScoreByUserId(userId);
      res.json({ maxScore });
    } catch (error) {
      console.error('Error fetching max score:', error);
      res.status(500).json({ error: 'Failed to fetch max score' });
    }
  };


export const insertScore = async (username, score) => {
  const scoreData = { username, score };

  try {
    const scoreId = await scoreModel.insertScore(scoreData);
  } catch (error) {
    console.error('Error inserting score:', error);
    res.status(500).json({ error: 'Failed to insert score' });
  }
};
