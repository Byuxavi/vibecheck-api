const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('goals').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las metas.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('goals').find({ _id: id });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: 'ID no encontrado.' });
  }
};

const create = async (req, res) => {
  const item = {
    title: req.body.title,
    description: req.body.description,
    targetDate: req.body.targetDate,
    status: req.body.status || 'pending'
  };
  const response = await mongodb.getDb().db().collection('goals').insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json('Error al crear la meta.');
  }
};

const update = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const item = {
    title: req.body.title,
    description: req.body.description,
    targetDate: req.body.targetDate,
    status: req.body.status
  };
  const response = await mongodb.getDb().db().collection('goals').replaceOne({ _id: id }, item);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json('Error al actualizar.');
  }
};

const deleteItem = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('goals').deleteOne({ _id: id });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json('Error al eliminar.');
  }
};

module.exports = { getAll, getSingle, create, update, deleteItem };