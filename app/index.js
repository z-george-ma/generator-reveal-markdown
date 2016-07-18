'use strict';
var yeoman = require('yeoman-generator'),
    path = require('path');
    
var generator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },
  
  init: function () {
    this.tplData = {};
  },
  
  getInfo: function () {
    var done = this.async();

    function askForName() {
      var prompts = [{
          name: 'presentationName',
          message: 'What\'s the name of your presentation?',
          default: 'my-presentation'
        }];
        
      this.prompt(prompts, function (props) {
        this.presentationName = this.tplData.root = this.tplData.presentationName = props.presentationName;
        askForTitle.bind(this)();
      }.bind(this));
    }
    
    function askForTitle() {
      var prompts = [{
          name: 'presentationTitle',
          message: 'What\'s the title of your presentation?',
          default: 'My presentation'
        }];
        
      this.prompt(prompts, function (props) {
        this.presentationTitle = this.tplData.presentationTitle = props.presentationTitle;
        done();
      }.bind(this));
    }

    askForName.apply(this);
  },
  
  writing: function () {
    this.mkdir(this.presentationName);
    this.sourceRoot(path.join(__dirname, './templates/'));
    this.template(this.templatePath('index.html'), this.presentationName + '/index.html', this.tplData);
    this.template(this.templatePath('package.json'), this.presentationName + '/package.json', this.tplData);
    this.fs.copy(this.templatePath('css/**/*'), this.presentationName + '/css');
    this.fs.copy(this.templatePath('images/**/*'), this.presentationName + '/images');
    this.fs.copy(this.templatePath('js/**/*'), this.presentationName + '/js');
    this.fs.copy(this.templatePath('lib/**/*'), this.presentationName + '/lib');
    this.fs.copy(this.templatePath('plugin/**/*'), this.presentationName + '/plugin');
    this.fs.copy(this.templatePath('gitignore'), this.presentationName + '/.gitignore');
    this.fs.copy(this.templatePath('gitattributes'), this.presentationName + '/.gitattributes');
    this.fs.copy(this.templatePath('Gruntfile.js'), this.presentationName + '/Gruntfile.js');
    this.fs.copy(this.templatePath('slides.md'), this.presentationName + '/slides.md');
  }
});

module.exports = generator;
