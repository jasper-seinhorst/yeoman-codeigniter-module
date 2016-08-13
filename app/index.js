var generators = require('yeoman-generator');
var fs = require('fs');

module.exports = generators.Base.extend({

	prompting: function() {

		this.prompt = this.prompt([{
	      	type     : 'input',
	      	name     : 'moduleName',
	      	message  : 'What would you like to call the new module?',
	      	validate : function(input) {
	      		if (input.length >= 2) {
	      			return true;
	      		}
	      		return false;
	      	}
	    }
	    ]).then(function (answers) {
	    	this.answers = answers;
	    }.bind(this));
	},

	writing: function () {

		this.prompt.then(function() {

			var moduleName = this.answers.moduleName.toLowerCase();
			var className = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

	    	// create controller
			this.fs.copyTpl(
				this.templatePath('controller.html'),
				this.destinationPath('application/modules/' + moduleName + '/controllers/' + moduleName + '.php'),
				{ 
					moduleName: moduleName,
					className: className
				}
			);

			// create model
			this.fs.copyTpl(
				this.templatePath('model.html'),
				this.destinationPath('application/modules/' + moduleName + '/models/' + moduleName + '-model.php'),
				{
					moduleName: moduleName, 
					className: className
				}
			);

		}.bind(this));
  	}

});
