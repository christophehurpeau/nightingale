/*#if NODE */ var S = require('springboktools'); require('./index'); /*#/if */
S.LoggerConsole = S.Logger.extend(function(_super_){
	return {
		static: {
			writable: {
				/* http://www.pixelbeat.org/docs/terminal_colours/ */
				colors: {
					gray:'1;30',grayLight:'0;37',white:'1;37',
					red:'0;31',redLight:'1;31',redUnderlined:'14;31',
					orange:'1;31',
					green:'0;32',greenLight:'1;32',
					blue:'0;34', blueLight:'1;34',
					green:'0;32', greenLight:'1;32',
					cyan:'0;36', cyanLight:'1;36',
					purple:'0;35', purpleLight:'1;35',
					brown:'0;33',
					yellow:'1;33',
				},
			}
		},
		
		_colored:function(str,color){ return "\033["+this.self.colors[color]+"m"+str+"\033[0m"; },
		_write: function(logLevel,str){
			process[ logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout' ].write(str);
		},
	};
});
