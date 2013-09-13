/*#if NODE */ var S = require('springbokjs-utils'); require('./index'); /*#/if */
S.LoggerConsole = S.Logger.extend(function(_super_){
	return {
		static: {
			writable: {
				/* http://www.pixelbeat.org/docs/terminal_colours/ */
				colors: {
					black:'0;30',
					grayBold:'1;30',
					grayLight:'0;37',whiteBold:'1;37',
					red:'0;31',redBold:'1;31',redUnderlined:'14;31',
					green:'0;32',greenLight:'1;32',
					blue:'0;34', blueBold:'1;34',
					green:'0;32', greenBold:'1;32',
					cyan:'0;36', cyanBold:'1;36',
					purple:'0;35', purpleBold:'1;35',
					yellow:'0;33', yellowBold:'1;33',
				},
			}
		},
		
		_colored:function(str,color){ if(!this.self.colors[color]) throw new Error(color); return "\033["+this.self.colors[color]+"m"+str+"\033[0m"; },
		write: function(str,logLevel){
			process[ logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout' ].write(str);
		},
	};
});
/*#if NODE */ module.exports = S.LoggerConsole; /*#/if */