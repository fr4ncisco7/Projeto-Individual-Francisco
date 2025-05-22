const Sala = require('../models/sala');

exports.create = async (req, res) => {
  const { nome } = req.body;
  await Sala.create(nome);
  res.redirect('/usuarios');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await Sala.update(id, nome);
  res.redirect('/usuarios');
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Sala.delete(id);
  res.redirect('/usuarios');
};
