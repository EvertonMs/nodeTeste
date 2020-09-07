const express = require('express');
const {route} = require('../app');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({mensagem: 'Utillizando o get dentro da rota de pedidos'});
});

router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade

    }
    res.status(201).send({mensagem: 'Utillizando o post dentro da rota de pedidos',pedidoCriado: pedido});
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;

    res.status(200).send({
        mensagem: 'você passou o id:' + id
    });
});


// router.patch('/', (req,res,next) =>{
//     res.status(201).send({
//         mensagem:'Utillizando o patch dentro da rota de produtos'
//     });
// } );

// router.put('/', (req,res,next) =>{
//     res.status(201).send({
//         mensagem:'Utillizando o put dentro da rota de produtos'
//     });
// } );


router.delete('/', (req, res, next) => {
    res.status(201).send({mensagem: 'Utillizando o delete dentro da rota de pedidos'});
});

module.exports = router;
