var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "week3";
var dbColl = 'list'
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/getData', function(req, res, next) {
    mongo.find(dbBase, dbColl, {}, function(result) {
        if (!result) {
            res.send({ code: 0, message: "error" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});

router.post('/api/addData', function(req, res, next) {
    var { name, title } = req.body;
    if (!name || !title) {
        return res.send({ code: 2, message: "参数不完整" })
    }
    mongo.insert(dbBase, dbColl, req.body, function(result) {
        if (!result) {
            res.send({ code: 0, message: "error" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});

router.get('/api/delData', function(req, res, next) {
    var { _id } = req.body;
    if (!_id) {
        return res.send({ code: 2, message: "参数不完整" })
    }
    mongo.remove(dbBase, dbColl, req.query, function(result) {
        if (!result) {
            res.send({ code: 0, message: "error" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
module.exports = router;