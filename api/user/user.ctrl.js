// var users = [
//     {id:1, name: 'ella'},
//     {id:2, name: 'mari'},
//     {id:3, name: 'jessie'},
//     {id:4, name: 'leah'},
// ];
const models = require('../../models');

const index = function(req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)) return res.status(400).end(); // validation for param limit.
    
    // database
    models.User
        .findAll({
            limit:limit
        })
        .then(users=> {
            res.json(users);
        });
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end(); // validation for param id.
    
    // database
    models.User
        .findOne({
           where: {id}
        }).then(user=> {
            // const user = users.filter(user=> user.id === id)[0];
            if(!user) return res.status(404).end();      
            res.json(user);
        });    
};

const destroy = (req, res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end(); // validation for param id.

    // database
    models.User
        .destroy({
            where: {id}
        }).then(()=> {
            // users = users.filter(user=> user.id !== id); // 해당 id user만 리스트에서 삭제
            res.status(204).end();
        });
};

const create = (req, res)=> {
    // body-parser module
    const name = req.body.name; 
    if(!name) return res.status(400).end(); // validation for param name.

    // const isConflict = users.filter(user=> user.name === name).length;
    // if(isConflict) return res.status(409).end();
    
    // const id = Date.now();
    // const user = {id, name};
    // users.push(user);
    // res.status(201).json(user);

    // database
    models.User
        .create({name})
        .then(user=> {
            res.status(201).json(user);
        })
        .catch(err=> {
            // console.log(err.message);
            if(err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
};

const update = (req, res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end(); // validation for param id.
    
    const name = req.body.name;
    if(!name) return res.status(400).end(); // validation for param name.

    // const isConflict = users.filter(user=> user.name === name).length;
    // if(isConflict) return res.status(409).end();

    // const user = users.filter(user=> user.id === id)[0];
    // if(!user) return res.status(404).end();

    // user.name = name;
    // res.json(user);

    // database
    models.User
        .findOne({where: {id}})
        .then(user=> {
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(()=> {
                    res.json(user);
                })
                .catch(err => {
                    // console.log(err.message);
                    if(err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(409).end();
                }
                res.status(500).end()    
                })
        });
};

module.exports = { index, show, destroy, create, update
    // index: index,
    // show: show,
    // destroy: destroy,
    // create: create,
    // update: update
};