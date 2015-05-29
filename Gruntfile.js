module.exports = function(grunt) {
  var codePath = __dirname + '/app/code/';
  var publicHTML = codePath + 'public_html/';
  var codeBasePath = __dirname + '/app/';

  var gridFiles = [
    "plugins/jqxwidgets/jqxcore.js", "plugins/jqxwidgets/jqxdata.js",
    "plugins/jqxwidgets/jqxgrid.js",
    "plugins/jqxwidgets/jqxgrid.sort.js",
    "plugins/jqxwidgets/jqxgrid.pager.js",
    "plugins/jqxwidgets/jqxgrid.selection.js",
    "plugins/jqxwidgets/jqxgrid.sort.js",
    "plugins/jqxwidgets/jqxgrid.aggregates.js",
    "plugins/jqxwidgets/jqxbuttons.js",
    "plugins/jqxwidgets/jqxscrollbar.js",
    "plugins/jqxwidgets/jqxgrid.columnsresize.js",
    "plugins/jqxwidgets/jqxgrid.columnsreorder.js",
    "plugins/jqxwidgets/jqxdropdownlist.js",
    "plugins/jqxwidgets/jqxlistbox.js",
    "plugins/jqxwidgets/jqxmenu.js",
    "plugins/jqxwidgets/jqxcheckbox.js",
    "plugins/jqxwidgets/jqxgrid.storage.js",
    "plugins/jqxwidgets/jqxdraw.js",
    "plugins/jqxwidgets/jqxchart.core.js",
    "plugins/jqxwidgets/jqxgrid.filter.js"
  ];
  
  for (var i = 0; i < gridFiles.length; ++i) {
    gridFiles[i] = publicHTML + gridFiles[i];
  }

  var minifyFiles = {};
  minifyFiles[publicHTML + '/dist/emanate.main.min.js'] = [publicHTML +
    'js/*.js'
  ];
  minifyFiles[publicHTML + '/dist/emanate.ng.min.js'] = [publicHTML +
    'js/app/*.js',
  ];
  minifyFiles[publicHTML + '/dist/emanate.grid.min.js'] = gridFiles;

  // Project configuration.
  console.log([codePath + '*.js', publicHTML + 'js/', '!' + publicHTML +
    'plugins/', '!*.min.js'
  ]);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      prodclient: {
        files: minifyFiles
      }, options: {
    	    mangle: true
      },
    },
    jsbeautifier: {
      files: [codePath + '*.js', codePath + '**/*.js', codeBasePath + '**/*.js', publicHTML +
        'js/**/*.js', '!' + publicHTML + 'plugins/**', '!' + codePath +
        '**/*.min.js'
      ],
      options: {
        js: {
          indentChar: ' ',
          indentSize: 2,
        }
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      files: {
        expand: true,
        src: [ publicHTML + 'js/app.js', publicHTML + 'js/app/*.js']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', [ 'ngAnnotate', 'uglify:prodclient']);
  grunt.registerTask('dev', ['jsbeautifier']);
};