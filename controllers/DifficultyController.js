import DifficultyModel from '../models/DifficultyModel.js';

const difficultyModel = new DifficultyModel();

export const getDifficulties = async (req, res) => {
  try {
    const difficulties = await difficultyModel.getDifficulties();
    res.json(difficulties);
  } catch (error) {
    console.error('Error fetching difficulties:', error);
    res.status(500).json({ error: 'Failed to fetch difficulties' });
  }
};
