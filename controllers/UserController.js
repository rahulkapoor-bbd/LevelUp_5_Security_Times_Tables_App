import UserModel from '../models/UserModel';

const userModel = new UserModel();

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userModel.getUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const insertUser = async (req, res) => {
  const { DifficultyID, Username, HighScore, FirstName, PasswordHash, Salt } = req.body;
  const user = { DifficultyID, Username, HighScore, FirstName, PasswordHash, Salt };

  try {
    const userId = await userModel.insertUser(user);
    res.json({ userId });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to insert user' });
  }
};

export const updateUser = async (req, res) => {
  const { UserID, DifficultyID, Username, HighScore, FirstName, PasswordHash, Salt } = req.body;
  const user = { UserID, DifficultyID, Username, HighScore, FirstName, PasswordHash, Salt };

  try {
    const rowsAffected = await userModel.updateUser(user);
    res.json({ rowsAffected });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const updateUserDifficulty = async (req, res) => {
    const { UserID, DifficultyID} = req.body;
    const user = { UserID, DifficultyID };
  
    try {
      const rowsAffected = await userModel.updateUserDifficulty(user);
      res.json({ rowsAffected });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  export const updateUserHighScore = async (req, res) => {
    const { HighScore, DifficultyID} = req.body;
    const user = { HighScore, DifficultyID };
  
    try {
      const rowsAffected = await userModel.updateUserHighScore(user);
      res.json({ rowsAffected });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
