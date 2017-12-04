import { Meteor } from 'meteor/meteor'
import fs from 'fs';

WebApp.connectHandlers.use("/temp", (req, res, next)=>{

    var filename = req.originalUrl.split("/")[2];
    filename = '/Users/ppillip/Projects/temp/'+filename;

    var fsReadFile = Meteor.wrapAsync(fs.readFile);
    var img = fsReadFile(filename);

    res.writeHead(200);
    res.end(img, 'binary');

});

WebApp.connectHandlers.use("/images", (req, res, next)=>{

    var filename = '/Users/ppillip/Projects/images/' + req.originalUrl.split("/")[2];
    var img = Meteor.wrapAsync(fs.readFile)(filename);

    res.writeHead(200);
    res.end(img, 'binary');

});

