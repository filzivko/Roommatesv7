import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/Issue';
var path = require('path');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://fil:data123@ds263068.mlab.com:63068/roommatesvd', {useNewUrlParser: true, useUnifiedTopology: true} );
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true} );


const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected successfully!');
});


// app.use(express.static(path.join(__dirname,'public')));

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname,'public/index.html'));
// })


router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
        console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
        console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.body.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;
            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    })
})

app.use('/', router);

const porty = process.env.PORT || 4000;

app.listen(porty, process.env.IP);

// app.listen(porty, () => console.log('expresss server running on port: ' + porty));

