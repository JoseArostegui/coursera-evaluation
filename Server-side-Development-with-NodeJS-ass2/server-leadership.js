var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new leadership
    Leadership.create({
        name: "Peter Pan",
        image: "images/alberto.png",
        designation: "Chief Epicurious Officer",
        abbr: "CEO",
        description: "Our CEO, Peter, . . ."
    }, function(err, leadership) {
        if (err) throw err;
        console.log('Leadership created!');
        console.log(leadership);

        var id = leadership._id;

        // get all the Leadership
        setTimeout(function() {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function(err, leadership) {
                    if (err) throw err;
                    console.log('Updated Leadership!');
                    console.log(leadership);

                    leadership.save(function(err, leadership) {
                        db.collection('leaders').drop(function() {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});
