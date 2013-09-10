/*#if NODE */ var S = require('springbokjs-utils'); /*#/if */
S.Logger = S.newClass(function(){
	var res = {
		ctor: function(){ },
	
		color: function(color,message){ this.write(color ? this._colored(message,color) : message); return this; },
		add: function(message,color){ return this.log(message,color).nl(); },
		log: function(message,color){ this.time().write(color ? this._colored(message,color) : message); return this.nl(); },
		nl: function(){ this.write("\n"); return this; },
		
		time: function(color){ this.add(color, new Date().toFormat('HH24:MI:SS')); },
	};
	
	'blue green red'.split(' ').forEach(function(mName){
		res[mName] = function(message){ this.color(message); };
	});
	
	res.info = function(message){ return this.log('[info] '+message); };
	res.warn = function(message){ return this.log('[warn] '+message,'orange'); };
	res.error = function(message){ return this.log('[error] '+message,'red'); };
	res.fatal = function(message){ return this.log('[fatal] '+message,'red'); };
	res.debug = function(message){ return this.log('[debug] '+message,'blue'); };
	
	
	res.alert = function(message,title){
		return this.log('[alert] '+message,'purple');
	};
	res.success = function(message,title){
		return this.log('[success] '+message,'green');
	};
	return res;
});
