/*#if NODE */ var S = require('springboktools'); require('./index'); /*#/if */
S.LoggerHtml.extend(function(_super_){
	return {
		static: {
			writable:{
				/* http://www.pixelbeat.org/docs/terminal_colours/ */
				colors: {
					gray:'gray',grayLight:'silver',white:'white',
					red:'red',redLight:'red',redUnderlined:'red;text-decoration:underline',
					orange:'orange',
					blue:'#4682B4', blueLight:'blue',
					green:'green',greenLight:'lime',
					cyan:'cyan', cyanLight:'cyan',
					purple:'purple', purpleLight:'purple',
					brown:'brown',
					yellow:'yellow',
				},
			}
		},
		
		ctor: function(){
			_super_.call(this);
			this.html = '';
		},
		
		_colored:function(message,color){ return '<span style="color:'+this.self.colors[color]+'">'+message+'</span>'; },
		write:function(html){ this.html+=html; },
		nl:function(){ this.html+='<br/>'; return this;},
	};
});