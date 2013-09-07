var S = require('springboktools');
module.exports = S.newClass(function(){
	this.ctor = function(){ };
	
	this.prototype = {
		color: function(color,message){ this.write(color ? this._colored(message,color) : message); return this; },
		add: function(message,color){ return this.log(message,color).nl(); },
		log: function(message,color){ this.time().write(color ? this._colored(message,color) : message); return this.nl(); },
		nl: function(){ this.write("\n"); return this; },
		
		time: function(color){ this.add(color, new Date().toFormat('HH24:MI:SS')); },
	};
	
	'blue green red'.split(' ').forEach(function(mName){
		this.prototype[mName] = function(message){ this.color(message); };
	}.bind(this));
	
	this.prototype.info = function(message){ return this.log('[info] '+message); };
	this.prototype.warn = function(message){ return this.log('[warn] '+message,'orange'); };
	this.prototype.error = function(message){ return this.log('[error] '+message,'red'); };
	this.prototype.fatal = function(message){ return this.log('[fatal] '+message,'red'); };
	this.prototype.debug = function(message){ return this.log('[debug] '+message,'blue'); };
	
	
	this.prototype.alert = function(message,title){
		return this.log('[alert] '+message,'purple');
	};
	this.prototype.success = function(message,title){
		return this.log('[success] '+message,'green');
	};
});
