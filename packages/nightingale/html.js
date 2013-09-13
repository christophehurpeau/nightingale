/*#if NODE */ var S = require('springbokjs-utils'); require('./index'); /*#/if */
S.LoggerHtml.extend(function(_super_){
	return {
		static: {
			writable:{
				/* http://www.pixelbeat.org/docs/terminal_colours/ */
				colors: {
					black:'black',
					grayBold:'gray;font-size:bold',
					grayLight:'silver',whiteBold:'white;font-size:bold',
					red:'red',redBold:'red;font-size:bold',redUnderlined:'red;text-decoration:underline',
					blue:'#4682B4', blueBold:'blue;font-size:bold',
					green:'green',greenBold:'lime;font-size:bold',
					cyan:'cyan', cyanBold:'cyan;font-size:bold',
					purple:'purple', purpleBold:'purple;font-size:bold',
					yellow:'yellow', yellowBold:'brown;font-size:bold',
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
/*#if NODE */ module.exports = S.LoggerHtml; /*#/if */