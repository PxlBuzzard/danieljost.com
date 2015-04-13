var pickFiles = require( 'broccoli-static-compiler' );
var mergeTrees = require('broccoli-merge-trees');
var compileSass = require( 'broccoli-sass' );
var findBowerTrees = require( 'broccoli-bower' );
var compileNunjucks = require( 'broccoli-nunjucks' );

// create tree for files in the app folder
var src = 'src';
src = pickFiles( src, {
  srcDir: 'src',
  destDir: 'out'
});

//compile swig
src = compileNunjucks( src, { 'include': 'src/partials' } );

// create tree for files in the styles folder
var styles = 'styles';
styles = pickFiles( styles, {
  srcDir: 'src/documents/scss',
  destDir: 'out/css'
});

// include src and style trees
var sourceTrees = [ src, styles ];

// Add bower dependencies
sourceTrees = sourceTrees.concat( findBowerTrees() );

// merge array into tree
//var srcAndDependencies = new mergeTrees( sourceTrees, { overwrite: true } );

// compile sass
var appCss = compileSass( sourceTrees, 'out/css/site.scss', 'out/css/site.css' );

// copy static files with no modifications
var publicFiles = 'src/public';

// merge js, css and public file trees, and export them
module.exports = mergeTrees( [ appCss, publicFiles ] );
