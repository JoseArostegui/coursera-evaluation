var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dishes.find({}, function(err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dishes.create(req.body, function(err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added dish with id ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    console.log("EN el delete");
    console.log("DE IS admin? " + req.decoded._doc.admin);
    Dishes.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });


});

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true /*Para que devuelva el objecto tras actualizarlo*/
        },
        function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


dishRouter.route('/:dishId/comments')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            dish.comments.push(req.body);

            dish.save(function() {
                if (err) throw err;
                console.log('Updated comments');
                res.json(dish);
            });


            res.json(dish.comments);
        });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function(err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;
