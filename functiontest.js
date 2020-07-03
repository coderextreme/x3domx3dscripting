let scripts = [];

scripts[0] = new Function (

// CDATA text follows
`ecmascript:

function initialize() {
	console.log("initialize");
}
function shutdown() {
	console.log("shutdown");
}

initialize();
this.shutdown = shutdown;
return this;`)();

scripts[0].shutdown();
