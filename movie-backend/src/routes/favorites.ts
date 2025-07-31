import express from 'express';
import { Response } from 'express';
import { User } from '../models/User';
import { authenticate } from '../middleware/auth';
import { RequestWithUser } from '../types/type';

const router = express.Router();

// POST /favorites/add
router.post('/add', authenticate, async (req: RequestWithUser, res: Response) => {
  const userId = req.user;
  const movie = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!movie.id || !movie.title) {
    return res.status(400).json({ message: 'Movie id and title are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const alreadyFavorite = user.favorites.some((fav) => Number(fav.id) === Number(movie.id));
    if (alreadyFavorite) {
     
      return res.status(409).json({ message: 'Movie already in favorites', data: user.favorites });
    }

    user.favorites.push(movie);
    
    await user.save();

    res.status(200).json({
      message: 'Movie added to favorites',
      data: user.favorites,
    });
   
  } catch (err) {
    console.error('Error adding to favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /favorites/remove
router.post('/remove', authenticate, async (req: RequestWithUser, res: Response) => {
  const userId = req.user;
  const { id } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!id) {
    return res.status(400).json({ message: 'Movie id is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter((fav) => fav.id !== id);
    await user.save();

    res.status(200).json({
      message: 'Movie removed from favorites',
      data: user.favorites,
    });
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /favorites
router.get('/', authenticate, async (req: RequestWithUser, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'Fetched favorites',
      favorites: user.favorites,
    });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
