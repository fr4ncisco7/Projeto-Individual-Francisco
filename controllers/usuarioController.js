const Usuario = require('../models/usuario');
const Sala = require('../models/sala');

exports.index = async (req, res) => {
  const usuarios = await Usuario.findAllComSala();
  const salas = await Sala.findAll();
  res.render('usuarios/index', { usuarios, salas });
};

exports.store = async (req, res) => {
  await Usuario.create(req.body);
  res.redirect('/usuarios');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Usuario.update(id, req.body);
  res.redirect('/usuarios');
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Usuario.delete(id);
  res.redirect('/usuarios');
};

exports.bySala = async (req, res) => {
  const { sala_id } = req.params;
  const usuarios = await Usuario.findBySala(sala_id);
  res.json(usuarios);
};
