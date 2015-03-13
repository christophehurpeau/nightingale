"use strict";

var lib = "../../lib/";
var Logger = require(lib + "console").LoggerConsole;

var assert = require("proclaim");
var expect = assert.strictEqual;



var logger = new Logger();

test("blue bold color", function () {
    console.log(logger.blue.bold("test"));
    expect(logger.blue.bold("test"), "\u001b[1m\u001b[34mtest\u001b[39m\u001b[22m");
});

logger.log("log()");
logger.info("info()");
logger.warn("warn()");
logger.error("error()");
logger.alert("alert()");
logger.fatal("fatal()");
logger.debug("debug()");
logger.inspect("inspect()");
logger.inspectVar("varName", "inspectVar()");
logger.success("success()");
//# sourceMappingURL=test_console.js.map