const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.get('/', controller.index);
router.post('/', controller.store);
router.post('/edit/:id', controller.update);
router.post('/delete/:id', controller.destroy);
router.get('/sala/:sala_id', controller.bySala);

module.exports = router;
