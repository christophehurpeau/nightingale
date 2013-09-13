/*#if NODE */ var S = require('springbokjs-utils'); var util = require('util'); /*#/if */
S.Logger = S.newClass(function(){
	var res = {
		ctor: function(){ },
	
		color: function(color,message,logLevel){ this.write(color ? this._colored(message,color) : message,logLevel); return this; },
		add: function(message,color,logLevel){ return this.color(color,message,logLevel); },
		log: function(message,color,logLevel){ this.prefix(logLevel).color(color ,message,logLevel).nl(logLevel); },
		nl: function(logLevel){ this.write("\n",logLevel); return this; },
		
		setPrefix: function(prefix,prefixColor){
			this._prefix = prefix;
			if(prefixColor) this._prefixColor = prefixColor;
		},
		writable:{
			prefix: function(logLevel){
				this.time(logLevel);
				this._prefix && this.add(this._prefix, this._prefixColor || 'grayLight',logLevel);
				return this;
			},
		},
		
		time: function(color){ this.color(color||'grayBold', new Date().toTimeString().split(' ')[0]/*new Date().toFormat('HH24:MI:SS')*/+' '); return this; },
	};
	
	'blue green red'.split(' ').forEach(function(mName){
		res[mName] = function(message){ this.color(message); };
	});
	
	res.info = function(message){ return this.log('[info ] '+message); };
	res.warn = function(message){ return this.log('[warn ] '+message,'red'); };
	res.error = function(message){ return this.log('[error] '+message,'redBold','error'); };
	res.fatal = function(message){ return this.log('[fatal] '+message,'redBold','fatal'); };
	res.debug = function(message){
		/*#if NODE */ message = util.inspect(message); /*#/if*/
		return this.log('[debug] '+message,'cyan');
	};
	res.debugVar = function(varName,varValue){
		/*#if NODE */ varValue = util.inspect(varValue); /*#/if*/
		return this.log('[debug] '+varName+' = '+varValue,'cyan');
	};
	
	
	res.alert = function(message,title){
		return this.log('[alert] '+message,'purpleBold');
	};
	res.success = function(message,title){
		return this.log('[success] '+message,'greenBold');
	};
	return res;
});
/*#if NODE */ module.exports = S.Logger; /*#/if */