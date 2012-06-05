desc('Glue and compile');
task('compress', [], function(params) {
    var fs = require('fs');

    var javascript = '(function() {\n';

	[	'shiterator.js',
        'errorstorage.js',
        'errorhandler.js',
		'jsontostring.js',
        'utils.js'
	].forEach(function(file) {
		javascript += fs.readFileSync('./library/shiterator/' + file) + "\n\n";
	});

    javascript += '})();\n\n';

    fs.writeFile('./library/shiterator.js', javascript);

    console.log('shiterator.js created.');

    var compressor = require('node-minify');

    new compressor.minify({
        type: 'gcc',
        fileIn: './library/shiterator.js',
        fileOut: './library/shiterator.min.js',
        callback: function(err){
            if (err) {
                console.log(err);
            } else {
                var compressed = fs.readFileSync('./library/shiterator.min.js');
                console.log('shiterator.min.js created. Rate ' + (javascript.length / compressed.length).toFixed(2) + '.');
            }
        }
    });
});