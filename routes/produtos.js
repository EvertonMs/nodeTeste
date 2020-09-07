const express = require('express');
const {route} = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'select * from produtos;',
            (error,result,fields)=>{
                if(error){return res.status(500).send({error:error})}
                const response = {
                    quantidade: result.length,
                    produtos : result.map(prod=>{
                        return {
                            idProduto:prod.idproduto,
                            nome:prod.nome,
                            preco:prod.preco,
                            request:{
                                tipo:'GET',
                                descricao: '',
                                url:'http://localhost:3000/produtos/' + prod.idproduto,
                            }
                        }
                    })
                }
                return res.status(200).send({
                        response
                    })

                // return res.status(200).send({
                //     response:result
                // })
            }
        )
    })
    //res.status(200).send({mensagem: 'Utillizando o get dentro da rota de produtos'});
});

router.post('/', (req, res, next) => {
    console.log(mysql);
    console.log(req.body);
    mysql.getConnection((error, conn)=>{
         if(error) {
             console.log(error);
             conn.release();
             return res.status(500).send({error:error});
         }
        // console.log(conn);
        // console.log(conn.status);
        conn.query(
            'Insert into produtos(idproduto, nome, preco) values (?,?,?)',
            [req.body.idproduto, req.body.nome,req.body.preco],
            (error,result,field) => {
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response:null
                    });
                }
                console.log(result);
                res.status(201).send({
                    
                    mensagem:"Insere um produto"
                });
            }
        )
    });
    // res.status(201).send({
    //     mensagem: 'Utillizando o post dentro da rota de produtos'
    //     , produtoCriado: produto
    // });
});

router.get('/:idproduto', (req, res, next) => {
console.log(req.params.idproduto);
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'select * from produtos where idProduto = ?;',
            [req.params.idproduto],
            (error,result,fields)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(200).send({
                    response:result
                })
            }
        )
    })
    
});


router.patch('/', (req,res,next) =>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
       conn.query(
           'update produtos set nome = ?, preco = ? where idProduto = ?',
           [req.body.nome,req.body.preco,req.body.idproduto],
           (error,result,field) => {
               conn.release();
               if(error){return res.status(500).send({error:error})}
               res.status(201).send({
                   mensagem:"Atualizado com sucesso!"
               });
           }
       )
   });
} );

// router.put('/', (req,res,next) =>{
//     res.status(201).send({
//         mensagem:'Utillizando o put dentro da rota de produtos'
//     });
// } );


router.delete('/', (req, res, next) => {
    res.status(201).send({mensagem: 'Utillizando o delete dentro da rota de produtos'});
});

module.exports = router;
