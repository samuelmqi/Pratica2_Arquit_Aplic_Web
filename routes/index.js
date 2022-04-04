var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Filmes', docs });
  } catch (err) {
    next(err);
  }
})

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Adicionar Filme', doc: {"nome":"","sinopse":"","duracao":"","data":"", "imagem":"","categorias":""}, action: '/new' });
});

router.post('/new', async (req, res, next) => {
  const nome = req.body.nome;
  const sinopse = req.body.sinopse;
  const duracao = parseInt(req.body.duracao)
  const data = req.body.data
  const imagem = req.body.imagem
  const categorias = req.body.categorias
 
  try {
    const result = await global.db.insert({ nome, sinopse, duracao, data, imagem, categorias });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Editar informações do Filme', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const sinopse = req.body.sinopse;
  const duracao = parseInt(req.body.duracao)
  const data = req.body.data
  const imagem = req.body.imagem
  const categorias = req.body.categorias
 
  try {
    const result = await global.db.update(id, { nome, sinopse, duracao, data, imagem, categorias });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;