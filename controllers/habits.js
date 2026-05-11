const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllHabits = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('habits').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los hábitos.' });
  }
};
const getSingleHabit = async (req, res) => {
  try {
    const habitId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('habits').find({ _id: habitId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Hábito no encontrado.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el hábito (ID inválido quizá).' });
  }
};
const createHabit = async (req, res) => {
  try {
    const habit = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      frequency: req.body.frequency,
      goalValue: req.body.goalValue,
      startDate: req.body.startDate,
      userId: req.body.userId,
      isArchived: false
    };
    const response = await mongodb.getDb().db().collection('habits').insertOne(habit);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Ocurrió un error al crear el hábito.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ACTUALIZAR UN HÁBITO
const updateHabit = async (req, res) => {
  try {
    const habitId = new ObjectId(req.params.id);
    const habit = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      frequency: req.body.frequency,
      goalValue: req.body.goalValue,
      startDate: req.body.startDate,
      userId: req.body.userId,
      isArchived: req.body.isArchived
    };
    const response = await mongodb.getDb().db().collection('habits').replaceOne({ _id: habitId }, habit);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Ocurrió un error al actualizar el hábito.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BORRAR UN HÁBITO
const deleteHabit = async (req, res) => {
  try {
    const habitId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('habits').deleteOne({ _id: habitId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('Ocurrió un error al eliminar el hábito.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAllHabits, 
  getSingleHabit,
  createHabit, 
  updateHabit, 
  deleteHabit 
};

