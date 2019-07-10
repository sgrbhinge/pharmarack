var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sgr:sgrfusion@sgr1-axumk.mongodb.net/', {dbName : 'node-angular', useNewUrlParser : true})
.then( () => {
    console.log("Connection success!");
    // var Post = data.model('posts', new mongoose.Schema({ title: String, content: String }));
    // Post.find({}, function (err, res) {
    //     if (err) console.log(JSON.stringify(err));
    //     console.log(res);
    // });
})
.catch( (err) => console.error("Connection error!"));