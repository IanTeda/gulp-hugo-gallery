const through = require('through2');
const Vinyl = require('vinyl');
const PluginError = require('plugin-error');

module.exports = options => {
    'use strict';

    options = options || {};

    return through.obj(function(file, encoding, callback) {
        // Ignore empty files
        if (file.isNull()) {
            // Nothing to do here
            callback(null, file);
            return;
        }

        // We don't do streams
        if (file.isStream()) {
            // file.contents is a Stream - https://nodejs.org/api/stream.html
            callback(new PluginError(
                'gulp-hugo-gallery',
                'Streaming not supported'
            ));

            return;
        }

        try {
            // Get file name and date from image filename
            let fileName = file.stem;
            let fileNameArray = fileName.split(' ');
            let fileNameDate = fileNameArray[0];
            let fileHash = fileNameArray[2];
            let fileHashArray = fileHash.split('_');
            let imageName = fileHashArray[0];


            let newFile = new Vinyl({
                cwd: '/',
                base: '/test/',
                path: '/test/' + imageName + '.md',
                contents: new Buffer(''),
            });

            // Build Markdown file
            let newFileRC = Buffer.from(String('\n'));
            let newFileTitle = new Buffer('title: "' + imageName + '"');
            let newFileImage = new Buffer('image: "' + fileName + '"');
            let newFileDate = new Buffer('date: "' + fileNameDate +'"');
            let newFileType = new Buffer('type: "photo"');
            let newFileYAML = new Buffer('---');

            newFile.contents = Buffer.concat([newFileYAML, newFile.contents]);
            newFile.contents = Buffer.concat([newFileRC, newFile.contents]);
            newFile.contents = Buffer.concat([newFileType, newFile.contents]);
            newFile.contents = Buffer.concat([newFileRC, newFile.contents]);
            newFile.contents = Buffer.concat([newFileDate, newFile.contents]);
            newFile.contents = Buffer.concat([newFileRC, newFile.contents]);
            newFile.contents = Buffer.concat([newFileImage, newFile.contents]);
            newFile.contents = Buffer.concat([newFileRC, newFile.contents]);
            newFile.contents = Buffer.concat([newFileTitle, newFile.contents]);
            newFile.contents = Buffer.concat([newFileRC, newFile.contents]);
            newFile.contents = Buffer.concat([newFileYAML, newFile.contents]);

            this.push(newFile);
        } catch (err) {
            this.emit('error', new PluginError('gulp-hugo-gallery', err));
        }

        callback();
    });
};
