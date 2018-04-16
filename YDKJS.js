YDKJS Scope and Closures

Chapter 1:
function foo(a) {
  var b = a;
  return a+b;
}
var c = foo(2);

Chapter2:
function foo(a) {
  var b = a * 2;
  function bar(c) {
    console.log(a,b,c);
  }
  bar(b*3); // 2 4 12
}
foo(2);

function foo(str, a) {
  eval(str); //cheating!
  console.log(a,b);
}
var b=2;
foo("var b=3;", 1); // 1 3

function foo(str) {
  "use strict";
  eval(str);
  console.log(a); // ReferenceError: a is not defined
}
foo("var a=2");

var obj = {
  a:1,
  b:2,
  c:3
};
// more "tedious" to repeat "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;
// "easier" short-hand
with (obj) {
  a=3;
  b=4;
  c=5;
}

function foo(obj) {
  with (obj) {
    a=2;
  }
}
var o1 = {
  a:3
};
var o2 = {
  b:3
};
foo(o1);
console.log(o1.a); // 2
foo(o2);
console.log(o2.a); // undefined
console.log(a); // 2 -- Oops, leaked global!

Chapter 3:
function foo(a) {
  var b=2;
  // some code
  function bar() {
    // ...
  }
  // mode code
  var c=3;
}
bar(); //fails
console.log(a,b,c); // all 3 fail

function doSomething(a) {
  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}
function doSomethingElse(a) {
  return a - 1;
}
var b;
doSomething(2); // 15

function doSomething(a) {
  function doSomethingElse(a) {
    return a -1;
  }
  var b;
  b = a + doSomethingElse(a * 2);
  console.log(b *3);
}
doSomething(2); // 15

function foo() {
  function bar(a) {
    i = 3; // changing the `i` in the enclosing scope's for-loop
    console.log(a + i);
  }
  for (var i=0; i<10; i++) {
    bar(i * 2); // oops, infinite loop ahead!
  }
}
foo();

var MyReallyCoolLibrary = {
  awesome: "stuff",
  doSomething: function() {
    // ...
  },
  doAnotherThing: function() {
    // ...
  }
};

var a = 2;
function foo() { // <-- insert this
  var a = 3;
  console.log(a); // 3
} // <-- and this
foo(); // <-- and this
console.log(a); // 2

var a = 2;
(function foo() { // <-- insert this
  var a = 3;
  console.log(a); // 3
}) (); // <-- and this
console.log(a); // 2

setTimeout( function() {
  console.log("I waited 1 second!");
}, 1000);

setTimeout( function timeoutHandler() { // <-- Look, I have a name!
  console.log("I waited 1 second!");
}, 1000);

var a = 2;
(function foo() {
  var a = 3;
  console.log(a); // 3
})();
console.log(a); // 2

var a = 2;
(function IIFE() {
  var a = 3;
  console.log(a); // 3
})();
console.log(a); // 2

var a = 2;
(function IIFE(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
})(window);
console.log(a); // 2

undefined = true; // setting a land-mine for other code! avoid!
(function IIFE(undefined) {
   var a;
   if (a === undefined) {
     console.log("Undefined is sae here!");
   }
})();

var a = 2;
(function IIFE(def) {
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
});

var foo = true;
if (foo) {
  var bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}

try {
  undefined(); // illegal operation to force an exception!
}
catch (err) {
  console.log(err); // works!
}
console.log(err); // RefereneError: `err` not found

var foo = true;
if(foo) {
  let bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}
console.log(bar); // ReferenceError

var foo = true;
if(foo) {
  { // <-- explicit block
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
  }
}
console.log(bar); // ReferenceError

function process(data) {
  // do something interesting
}
var someReallyBigData = {..};
process(someReallyBigData);
var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);

function process(data) {
  // do something interesting
}
// anything declared inside this block can go away after!
{
  let someReallyBigData = {..};
  process(someReallyBigData);
}
var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);

var foo = true, baz = 10;
if(foo) {
  var bar = 3;
  if (baz > bar) {
    console.log(baz);
  }
  // ..
}

var foo = true, baz = 10;
if (foo) {
  var bar = 3;
  // ..
}
if (baz > bar) {
  console.log(baz);
}

var foo = true, baz = 10;
if (foo) {
  let bar = 3;
  if (baz > bar) { // <-- don't forget `bar` when moving!
    console.log(baz);
  }
}

var foo = true;
if (foo) {
  var a = 2;
  const b = 3; // block-scoped to the containing `if`
  a = 3; // just fine!
  b = 4; // error!
}
console.log(a); // 3
console.log(b); // ReferenceError!

Chapter 4:
foo();
function foo() {
  console.log(a); // undefined
  var a = 2;
}

function foo() {
  var a;
  console.log(a); // undefined
  a = 2;
}
foo();

foo(); // not ReferencedError, but TypeError!
var foo = function bar() {
  // ..
};

foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
  // ..
};

var foo;
foo(); // TypeError
bar(); //ReferenceError
foo = function() {
  var bar = ...self...
  // ...
}

foo(); // 1
var foo;
function foo() {
  console.log(1);
}
foo = function() {
  console.log(2);
};
//1 is printed instead of 2, interpreted as:

function foo() {
  console.log(1);
}
foo(); // 1
foo = function() {
  console.log(2);
};

foo(); // 3
function foo() {
  console.log(1);
}
var foo = function() {
  console.log(2);
};
function foo() {
  console.log(3);
}

foo(); // "b"
var a = true;
if (a) {
  function foo() { console.log("a"); }
}
else {
  function foo() { console.log("b"); }
}

Chapter 5:
function foo() {
  var a = 2;
  function bar() {
    console.log(a); // 2
  }
  bar();
}
foo();

function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); // 2 -- Whoa, closure was just observed, man.

function foo() {
  var a = 2;
  function baz() {
    console.log(a); // 2
  }
  bar (baz);
}
function bar(fn) {
  fn(); // look ma, I saw closure!
}

var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log(a);
  }
  fn = baz; // assign `baz` to global variable
}
function bar() {
  fn(); // look ma, I saw closure!
}
foo();
bar(); // 2

function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}
wait("Hello, closure!");

function setupBot(name,selector) {
  $(selector).click(function activator() {
    console.log("Activating: " + name);
  });
}
setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "bot_2");

for (var i=1; i<=5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i*1000);
}

for (var i=1; i<=5; i++) {
  (function() {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}

for (var i=1; i<=5; i++) {
  (function() {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}

for (var i=1; 1<=5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}

for (var i=1; i<=5; i++) {
	let j = i; // yay, block-scope for closure!
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}

for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}

function foo() {
	var something = "cool";
	var another = [1, 2, 3];
	function doSomething() {
		console.log( something );
	}
	function doAnother() {
		console.log( another.join( " ! " ) );
	}
}

function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];
	function doSomething() {
		console.log( something );
	}
	function doAnother() {
		console.log( another.join( " ! " ) );
	}
	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];
	function doSomething() {
		console.log( something );
	}
	function doAnother() {
		console.log( another.join( " ! " ) );
	}
	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

function CoolModule(id) {
	function identify() {
		console.log( id );
	}
	return {
		identify: identify
	};
}
var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );
foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"

var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}
	function identify1() {
		console.log( id );
	}
	function identify2() {
		console.log( id.toUpperCase() );
	}
	var publicAPI = {
		change: change,
		identify: identify1
	};
	return publicAPI;
})( "foo module" );
foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

var MyModules = (function Manager() {
	var modules = {};
	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}
	function get(name) {
		return modules[name];
	}
	return {
		define: define,
		get: get
	};
})();

MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}
	return {
		hello: hello
	};
} );
MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";
	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}
	return {
		awesome: awesome
	};
} );
var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO


//bar.js
function hello(who) {
	return "Let me introduce: " + who;
}
export hello;

// foo.js
// import only `hello()` from the "bar" module
import hello from "bar";
var hungry = "hippo";
function awesome() {
	console.log(
		hello( hungry ).toUpperCase()
	);
}
export awesome;

// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";
console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino
foo.awesome(); // LET ME INTRODUCE: HIPPO

this & Object Prototype

Chapter 1:
function identify() {
	return this.name.toUpperCase();
}
function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}
var me = {
	name: "Kyle"
};
var you = {
	name: "Reader"
};
identify.call( me ); // KYLE
identify.call( you ); // READER
speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER

function identify(context) {
	return context.name.toUpperCase();
}
function speak(context) {
	var greeting = "Hello, I'm " + identify( context );
	console.log( greeting );
}
identify( you ); // READER
speak( me ); // Hello, I'm KYLE

function foo(num) {
	console.log( "foo: " + num );
	// keep track of how many times `foo` is called
	this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?

function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	data.count++;
}

var data = {
	count: 0
};
var i;
for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// how many times was `foo` called?
console.log( data.count ); // 4

function foo() {
	foo.count = 4; // `foo` refers to itself
}
setTimeout( function(){
	// anonymous function (no name), cannot
	// refer to itself
}, 10 );

function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	foo.count++;
}

foo.count = 0;
var i;
for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// how many times was `foo` called?
console.log( foo.count ); // 4

function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	// Note: `this` IS actually `foo` now, based on
	// how `foo` is called (see below)
	this.count++;
}

foo.count = 0;
var i;
for (i=0; i<10; i++) {
	if (i > 5) {
		// using `call(..)`, we ensure the `this`
		// points at the function object (`foo`) itself
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// how many times was `foo` called?
console.log( foo.count ); // 4

function foo() {
	var a = 2;
	this.bar();
}
function bar() {
	console.log( this.a );
}
foo(); //undefined

Chapter 2:
function baz() {
  // call-stack is: `baz`
  // so, our call-site is in the global scope
  console.log( "baz" );
  bar(); // <-- call-site for `bar`
}
function bar() {
  // call-stack is: `baz` -> `bar`
  // so, our call-site is in `baz`
  console.log( "bar" );
  foo(); // <-- call-site for `foo`
}
function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, our call-site is in `bar`
  console.log( "foo" );
}
baz(); // <-- call-site for `baz`

function foo() {
	console.log( this.a );
}
var a = 2;
foo(); // 2

function foo() {
	"use strict";
	console.log( this.a );
}
var a = 2;
foo(); // TypeError: `this` is `undefined`

function foo() {
	console.log( this.a );
}
var a = 2;
(function(){
	"use strict";
	foo(); // 2
})();

function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo(); // 2

function foo() {
	console.log( this.a );
}
var obj2 = {
	a: 42,
	foo: foo
};
var obj1 = {
	a: 2,
	obj2: obj2
};
obj1.obj2.foo(); // 42

function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var bar = obj.foo; // function reference/alias!
var a = "oops, global"; // `a` also property on global object
bar(); // "oops, global"

function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`
	fn(); // <-- call-site!
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // `a` also property on global object
doFoo( obj.foo ); // "oops, global"

function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // `a` also property on global object
setTimeout( obj.foo, 100 ); // "oops, global"

function setTimeout(fn,delay) {
	// wait (somehow) for `delay` milliseconds
	fn(); // <-- call-site!
}

function foo() {
	console.log( this.a );
}
var obj = {
	a: 2
};
foo.call( obj ); // 2
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2
};
var bar = function() {
	foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = function() {
	return foo.apply( obj, arguments );
};
var b = bar( 3 ); // 2 3
console.log( b ); // 5

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}
var obj = {
	a: 2
};
var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5

function foo(el) {
	console.log( el, this.id );
}
var obj = {
	id: "awesome"
};
// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome

function foo(a) {
	this.a = a;
}
var bar = new foo( 2 );
console.log( bar.a ); // 2

function foo() {
	console.log( this.a );
}
var obj1 = {
	a: 2,
	foo: foo
};
var obj2 = {
	a: 3,
	foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2

function foo(something) {
	this.a = something;
}
var obj1 = {
	foo: foo
};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4

function foo(something) {
	this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2
var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3

function bind(fn, obj) {
	return function() {
		fn.apply( obj, arguments );
	};
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}
		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			}
		;
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

this instanceof fNOP &&
oThis ? this : oThis
// ... and:
fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();

function foo(p1,p2) {
	this.val = p1 + p2;
}
// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1p2

function foo() {
	console.log( this.a );
}
var a = 2;
foo.call( null ); // 2

function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}
// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3

function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}
// our DMZ empty object
var ø = Object.create( null );
// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3

function foo() {
	console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2

if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}

function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
   obj2 = { name: "obj2" },
   obj3 = { name: "obj3" };
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!
fooOBJ.call( obj3 ); // name: obj3   <---- look!
setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding

function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}
var obj1 = {
	a: 2
};
var obj2 = {
	a: 3
};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!

function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}
var obj = {
	a: 2
};
foo.call( obj ); // 2

function foo() {
	var self = this; // lexical capture of `this`
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}
var obj = {
	a: 2
};
foo.call( obj ); // 2

Chapter 3:
var myObj = {
	key: value
	// ...
};

var myObj = new Object();
myObj.key = value;

var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false
var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true
// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]

var strPrimitive = "I am a string";
console.log( strPrimitive.length );			// 13
console.log( strPrimitive.charAt( 3 ) );	// "m"

var myObject = {
	a: 2
};
myObject.a;		// 2
myObject["a"];	// 2

var wantA = true;
var myObject = {
	a: 2
};
var idx;
if (wantA) {
	idx = "a";
}
// later
console.log( myObject[idx] ); // 2

var myObject = { };
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";
myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"

var prefix = "foo";
var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world

var myObject = {
	[Symbol.Something]: "hello world"
};

function foo() {
	console.log( "foo" );
}
var someFoo = foo;	// variable reference to `foo`
var myObject = {
	someFoo: foo
};
foo;				// function foo(){..}
someFoo;			// function foo(){..}
myObject.someFoo;	// function foo(){..}

var myObject = {
	foo: function foo() {
		console.log( "foo" );
	}
};
var someFoo = myObject.foo;
someFoo;		// function foo(){..}
myObject.foo;	// function foo(){..}

var myArray = [ "foo", 42, "bar" ];
myArray.length;		// 3
myArray[0];			// "foo"
myArray[2];			// "bar"

var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length;	// 3
myArray.baz;	// "baz"

var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length;	// 4
myArray[3];		// "baz"

function anotherFunction() { /*..*/ }
var anotherObject = {
	c: true
};
var anotherArray = [];
var myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: anotherFunction
};
anotherArray.push( anotherObject, myObject );

var newObj = JSON.parse( JSON.stringify( someObj ) );

var newObj = Object.assign( {}, myObject );
newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true

var myObject = {
	a: 2
};
Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }

var myObject = {};
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );
myObject.a; // 2

var myObject = {};
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );
myObject.a = 3;
myObject.a; // 2

"use strict";
var myObject = {};
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );
myObject.a = 3; // TypeError

var myObject = {
	a: 2
};
myObject.a = 3;
myObject.a;					// 3
Object.defineProperty( myObject, "a", {
	value: 4,
	writable: true,
	configurable: false,	// not configurable!
	enumerable: true
} );
myObject.a;					// 4
myObject.a = 5;
myObject.a;					// 5
Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError

var myObject = {
	a: 2
};
myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: false,
	enumerable: true
} );
myObject.a;				// 2
delete myObject.a;
myObject.a;				// 2

var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} );

var myObject = {
	a: 2
};
Object.preventExtensions( myObject );
myObject.b = 3;
myObject.b; // undefined

var myObject = {
	a: 2
};
myObject.a; // 2

var myObject = {
	a: 2
};
myObject.b; // undefined

var myObject = {
	a: undefined
};
myObject.a; // undefined
myObject.b; // undefined

var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};
Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },
		// make sure `b` shows up as an object property
		enumerable: true
	}
);
myObject.a; // 2
myObject.b; // 4

var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};
myObject.a = 3;
myObject.a; // 2

var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},
	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};
myObject.a = 2;
myObject.a; // 4

var myObject = {
	a: 2
};
("a" in myObject);				// true
("b" in myObject);				// false
myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false

var myObject = { };
Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);
Object.defineProperty(
	myObject,
	"b",
	// make `b` NON-enumerable
	{ enumerable: false, value: 3 }
);
myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true
// .......
for (var k in myObject) {
	console.log( k, myObject[k] );
}
// "a" 2

var myObject = { };
Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);
Object.defineProperty(
	myObject,
	"b",
	// make `b` non-enumerable
	{ enumerable: false, value: 3 }
);
myObject.propertyIsEnumerable( "a" ); // true
myObject.propertyIsEnumerable( "b" ); // false
Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]

var myArray = [1, 2, 3];
for (var i = 0; i < myArray.length; i++) {
	console.log( myArray[i] );
}
// 1 2 3

var myArray = [ 1, 2, 3 ];
for (var v of myArray) {
	console.log( v );
}
// 1
// 2
// 3

var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }

var myObject = {
	a: 2,
	b: 3
};
Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys( o );
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				};
			}
		};
	}
} );
// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }
// iterate `myObject` with `for..of`
for (var v of myObject) {
	console.log( v );
}
// 2
// 3

var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		};
	}
};
var randoms_pool = [];
for (var n of randoms) {
	randoms_pool.push( n );

	// don't proceed unbounded!
	if (randoms_pool.length === 100) break;
}

Chapter 4:
class CoolGuy {
	specialTrick = nothing
	CoolGuy( trick ) {
		specialTrick = trick
	}
	showOff() {
		output( "Here's my trick: ", specialTrick )
	}
}

Joe = new CoolGuy( "jumping rope" )
Joe.showOff() // Here's my trick: jumping rope

class Vehicle {
	engines = 1

	ignition() {
		output( "Turning on my engine." )
	}

	drive() {
		ignition()
		output( "Steering and moving forward!" )
	}
}

class Car inherits Vehicle {
	wheels = 4
	drive() {
		inherited:drive()
		output( "Rolling on all ", wheels, " wheels!" )
	}
}
class SpeedBoat inherits Vehicle {
	engines = 2
	ignition() {
		output( "Turning on my ", engines, " engines." )
	}
	pilot() {
		inherited:drive()
		output( "Speeding through the water with ease!" )
	}
}

// vastly simplified `mixin(..)` example:
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		// only copy if not already present
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}
var Vehicle = {
	engines: 1,
	ignition: function() {
		console.log( "Turning on my engine." );
	},
	drive: function() {
		this.ignition();
		console.log( "Steering and moving forward!" );
	}
};
var Car = mixin( Vehicle, {
	wheels: 4,
	drive: function() {
		Vehicle.drive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	}
} );

// vastly simplified `mixin()` example:
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		// only copy if not already present
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}

// alternate mixin, less "safe" to overwrites
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		targetObj[key] = sourceObj[key];
	}
	return targetObj;
}
var Vehicle = {
	// ...
};
// first, create an empty object with
// Vehicle's stuff copied in
var Car = mixin( Vehicle, { } );
// now copy the intended contents into Car
mixin( {
	wheels: 4,
	drive: function() {
		// ...
	}
}, Car );

// "Traditional JS Class" `Vehicle`
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = function() {
	console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log( "Steering and moving forward!" );
};
// "Parasitic Class" `Car`
function Car() {
	// first, `car` is a `Vehicle`
	var car = new Vehicle();
	// now, let's modify our `car` to specialize it
	car.wheels = 4;
	// save a privileged reference to `Vehicle::drive()`
	var vehDrive = car.drive;
	// override `Vehicle::drive()`
	car.drive = function() {
		vehDrive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	};
	return car;
}
var myCar = new Car();
myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!

var Something = {
	cool: function() {
		this.greeting = "Hello World";
		this.count = this.count ? this.count + 1 : 1;
	}
};
Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1
var Another = {
	cool: function() {
		// implicit mixin of `Something` to `Another`
		Something.cool.call( this );
	}
};
Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)

Chapter 5:
var myObject = {
	a: 2
};
myObject.a; // 2

var anotherObject = {
	a: 2
};
// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );
myObject.a; // 2

var anotherObject = {
	a: 2
};
// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );
for (var k in myObject) {
	console.log("found: " + k);
}
// found: a
("a" in myObject); // true

var anotherObject = {
	a: 2
};
var myObject = Object.create( anotherObject );
anotherObject.a; // 2
myObject.a; // 2
anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false
myObject.a++; // oops, implicit shadowing!
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true

function Foo() {
	// ...
}
var a = new Foo();
Object.getPrototypeOf( a ) === Foo.prototype; // true

function Foo() {
	// ...
}
var a = new Foo();

function Foo() {
	// ...
}
Foo.prototype.constructor === Foo; // true
var a = new Foo();
a.constructor === Foo; // true

function NothingSpecial() {
	console.log( "Don't mind me!" );
}
var a = new NothingSpecial();
// "Don't mind me!"
a; // {}

function Foo(name) {
	this.name = name;
}
Foo.prototype.myName = function() {
	return this.name;
};
var a = new Foo( "a" );
var b = new Foo( "b" );
a.myName(); // "a"
b.myName(); // "b"

function Foo() { /* .. */ }
Foo.prototype = { /* .. */ }; // create a new prototype object
var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!

function Foo() { /* .. */ }
Foo.prototype = { /* .. */ }; // create a new prototype object
// Need to properly "fix" the missing `.constructor`
// property on the new object serving as `Foo.prototype`.
// See Chapter 3 for `defineProperty(..)`.
Object.defineProperty( Foo.prototype, "constructor" , {
	enumerable: false,
	writable: true,
	configurable: true,
	value: Foo    // point `.constructor` at `Foo`
} );

function Foo(name) {
	this.name = name;
}
Foo.prototype.myName = function() {
	return this.name;
};
function Bar(name,label) {
	Foo.call( this, name );
	this.label = label;
}
// here, we make a new `Bar.prototype`
// linked to `Foo.prototype`
Bar.prototype = Object.create( Foo.prototype );
// Beware! Now `Bar.prototype.constructor` is gone,
// and might need to be manually "fixed" if you're
// in the habit of relying on such properties!
Bar.prototype.myLabel = function() {
	return this.label;
};
var a = new Bar( "a", "obj a" );
a.myName(); // "a"
a.myLabel(); // "obj a"

// doesn't work like you want!
Bar.prototype = Foo.prototype;
// works kinda like you want, but with
// side-effects you probably don't want :(
Bar.prototype = new Foo();

// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );
// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );

function Foo() {
	// ...
}
Foo.prototype.blah = ...;
var a = new Foo();

a instanceof Foo; // true

// helper utility to see if `o1` is
// related to (delegates to) `o2`
function isRelatedTo(o1, o2) {
	function F(){}
	F.prototype = o2;
	return o1 instanceof F;
}
var a = {};
var b = Object.create( a );
isRelatedTo( b, a ); // true

Foo.prototype.isPrototypeOf( a ); // true

// Simply: does `b` appear anywhere in
// `c`s [[Prototype]] chain?
b.isPrototypeOf( c );

Object.getPrototypeOf( a );

Object.getPrototypeOf( a ) === Foo.prototype; // true

a.__proto__ === Foo.prototype; // true

Object.defineProperty( Object.prototype, "__proto__", {
	get: function() {
		return Object.getPrototypeOf( this );
	},
	set: function(o) {
		// setPrototypeOf(..) as of ES6
		Object.setPrototypeOf( this, o );
		return o;
	}
} );

var foo = {
	something: function() {
		console.log( "Tell me something good..." );
	}
};
var bar = Object.create( foo );
bar.something(); // Tell me something good...

if (!Object.create) {
	Object.create = function(o) {
		function F(){}
		F.prototype = o;
		return new F();
	};
}

var anotherObject = {
	a: 2
};
var myObject = Object.create( anotherObject, {
	b: {
		enumerable: false,
		writable: true,
		configurable: false,
		value: 3
	},
	c: {
		enumerable: true,
		writable: false,
		configurable: false,
		value: 4
	}
} );
myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
myObject.hasOwnProperty( "c" ); // true
myObject.a; // 2
myObject.b; // 3
myObject.c; // 4

function createAndLinkObject(o) {
	function F(){}
	F.prototype = o;
	return new F();
}
var anotherObject = {
	a: 2
};
var myObject = createAndLinkObject( anotherObject );
myObject.a; // 2

var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};
var myObject = Object.create( anotherObject );
myObject.cool(); // "cool!"

var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};
var myObject = Object.create( anotherObject );
myObject.doCool = function() {
	this.cool(); // internal delegation!
};
myObject.doCool(); // "cool!"

Chapter 6:
class Task {
	id;
	// constructor `Task()`
	Task(ID) { id = ID; }
	outputTask() { output( id ); }
}
class XYZ inherits Task {
	label;
	// constructor `XYZ()`
	XYZ(ID,Label) { super( ID ); label = Label; }
	outputTask() { super(); output( label ); }
}
class ABC inherits Task {
	// ...
}

var Task = {
	setID: function(ID) { this.id = ID; },
	outputID: function() { console.log( this.id ); }
};
// make `XYZ` delegate to `Task`
var XYZ = Object.create( Task );
XYZ.prepareTask = function(ID,Label) {
	this.setID( ID );
	this.label = Label;
};
XYZ.outputTaskDetails = function() {
	this.outputID();
	console.log( this.label );
};
// ABC = Object.create( Task );
// ABC ... = ...

function Foo() {}
var a1 = new Foo();
a1; // Foo {}

function Foo() {}
var a1 = new Foo();
a1.constructor; // Foo(){}
a1.constructor.name; // "Foo"

function Foo() {}
var a1 = new Foo();
Foo.prototype.constructor = function Gotcha(){};
a1.constructor; // Gotcha(){}
a1.constructor.name; // "Gotcha"
a1; // Foo {}

var Foo = {};
var a1 = Object.create( Foo );
a1; // Object {}
Object.defineProperty( Foo, "constructor", {
	enumerable: false,
	value: function Gotcha(){}
});
a1; // Gotcha {}

function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};
function Bar(who) {
	Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );
Bar.prototype.speak = function() {
	alert( "Hello, " + this.identify() + "." );
};
var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );
b1.speak();
b2.speak();

var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};
var Bar = Object.create( Foo );
Bar.speak = function() {
	alert( "Hello, " + this.identify() + "." );
};
var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );
b1.speak();
b2.speak();

// Parent class
function Widget(width,height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$elem = null;
}
Widget.prototype.render = function($where){
	if (this.$elem) {
		this.$elem.css( {
			width: this.width + "px",
			height: this.height + "px"
		} ).appendTo( $where );
	}
};
// Child class
function Button(width,height,label) {
	// "super" constructor call
	Widget.call( this, width, height );
	this.label = label || "Default";
	this.$elem = $( "<button>" ).text( this.label );
}
// make `Button` "inherit" from `Widget`
Button.prototype = Object.create( Widget.prototype );
// override base "inherited" `render(..)`
Button.prototype.render = function($where) {
	// "super" call
	Widget.prototype.render.call( this, $where );
	this.$elem.click( this.onClick.bind( this ) );
};
Button.prototype.onClick = function(evt) {
	console.log( "Button '" + this.label + "' clicked!" );
};
$( document ).ready( function(){
	var $body = $( document.body );
	var btn1 = new Button( 125, 30, "Hello" );
	var btn2 = new Button( 150, 40, "World" );
	btn1.render( $body );
	btn2.render( $body );
} );

class Widget {
	constructor(width,height) {
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	}
	render($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
}
class Button extends Widget {
	constructor(width,height,label) {
		super( width, height );
		this.label = label || "Default";
		this.$elem = $( "<button>" ).text( this.label );
	}
	render($where) {
		super.render( $where );
		this.$elem.click( this.onClick.bind( this ) );
	}
	onClick(evt) {
		console.log( "Button '" + this.label + "' clicked!" );
	}
}
$( document ).ready( function(){
	var $body = $( document.body );
	var btn1 = new Button( 125, 30, "Hello" );
	var btn2 = new Button( 150, 40, "World" );

	btn1.render( $body );
	btn2.render( $body );
} );

var Widget = {
	init: function(width,height){
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	},
	insert: function($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
};
var Button = Object.create( Widget );
Button.setup = function(width,height,label){
	// delegated call
	this.init( width, height );
	this.label = label || "Default";
	this.$elem = $( "<button>" ).text( this.label );
};
Button.build = function($where) {
	// delegated call
	this.insert( $where );
	this.$elem.click( this.onClick.bind( this ) );
};
Button.onClick = function(evt) {
	console.log( "Button '" + this.label + "' clicked!" );
};
$( document ).ready( function(){
	var $body = $( document.body );
	var btn1 = Object.create( Button );
	btn1.setup( 125, 30, "Hello" );
	var btn2 = Object.create( Button );
	btn2.setup( 150, 40, "World" );
	btn1.build( $body );
	btn2.build( $body );
} );

// Parent class
function Controller() {
	this.errors = [];
}
Controller.prototype.showDialog = function(title,msg) {
	// display title & message to user in dialog
};
Controller.prototype.success = function(msg) {
	this.showDialog( "Success", msg );
};
Controller.prototype.failure = function(err) {
	this.errors.push( err );
	this.showDialog( "Error", err );
};

// Child class
function LoginController() {
	Controller.call( this );
}
// Link child class to parent
LoginController.prototype = Object.create( Controller.prototype );
LoginController.prototype.getUser = function() {
	return document.getElementById( "login_username" ).value;
};
LoginController.prototype.getPassword = function() {
	return document.getElementById( "login_password" ).value;
};
LoginController.prototype.validateEntry = function(user,pw) {
	user = user || this.getUser();
	pw = pw || this.getPassword();
	if (!(user && pw)) {
		return this.failure( "Please enter a username & password!" );
	}
	else if (pw.length < 5) {
		return this.failure( "Password must be 5+ characters!" );
	}
	// got here? validated!
	return true;
};
// Override to extend base `failure()`
LoginController.prototype.failure = function(err) {
	// "super" call
	Controller.prototype.failure.call( this, "Login invalid: " + err );
};

// Child class
function AuthController(login) {
	Controller.call( this );
	// in addition to inheritance, we also need composition
	this.login = login;
}
// Link child class to parent
AuthController.prototype = Object.create( Controller.prototype );
AuthController.prototype.server = function(url,data) {
	return $.ajax( {
		url: url,
		data: data
	} );
};
AuthController.prototype.checkAuth = function() {
	var user = this.login.getUser();
	var pw = this.login.getPassword();
	if (this.login.validateEntry( user, pw )) {
		this.server( "/check-auth",{
			user: user,
			pw: pw
		} )
		.then( this.success.bind( this ) )
		.fail( this.failure.bind( this ) );
	}
};
// Override to extend base `success()`
AuthController.prototype.success = function() {
	// "super" call
	Controller.prototype.success.call( this, "Authenticated!" );
};
// Override to extend base `failure()`
AuthController.prototype.failure = function(err) {
	// "super" call
	Controller.prototype.failure.call( this, "Auth Failed: " + err );
};

var auth = new AuthController(
	// in addition to inheritance, we also need composition
	new LoginController()
);
auth.checkAuth();

var LoginController = {
	errors: [],
	getUser: function() {
		return document.getElementById( "login_username" ).value;
	},
	getPassword: function() {
		return document.getElementById( "login_password" ).value;
	},
	validateEntry: function(user,pw) {
		user = user || this.getUser();
		pw = pw || this.getPassword();
		if (!(user && pw)) {
			return this.failure( "Please enter a username & password!" );
		}
		else if (pw.length < 5) {
			return this.failure( "Password must be 5+ characters!" );
		}
		// got here? validated!
		return true;
	},
	showDialog: function(title,msg) {
		// display success message to user in dialog
	},
	failure: function(err) {
		this.errors.push( err );
		this.showDialog( "Error", "Login invalid: " + err );
	}
};

// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create( LoginController );
AuthController.errors = [];
AuthController.checkAuth = function() {
	var user = this.getUser();
	var pw = this.getPassword();
	if (this.validateEntry( user, pw )) {
		this.server( "/check-auth",{
			user: user,
			pw: pw
		} )
		.then( this.accepted.bind( this ) )
		.fail( this.rejected.bind( this ) );
	}
};
AuthController.server = function(url,data) {
	return $.ajax( {
		url: url,
		data: data
	} );
};
AuthController.accepted = function() {
	this.showDialog( "Success", "Authenticated!" )
};
AuthController.rejected = function(err) {
	this.failure( "Auth Failed: " + err );
};

AuthController.checkAuth();

var controller1 = Object.create( AuthController );
var controller2 = Object.create( AuthController );

class Foo {
	methodName() { /* .. */ }
}

var LoginController = {
	errors: [],
	getUser() { // Look ma, no `function`!
		// ...
	},
	getPassword() {
		// ...
	}
	// ...
};

// use nicer object literal syntax w/ concise methods!
var AuthController = {
	errors: [],
	checkAuth() {
		// ...
	},
	server(url,data) {
		// ...
	}
	// ...
};
// NOW, link `AuthController` to delegate to `LoginController`
Object.setPrototypeOf( AuthController, LoginController );

var Foo = {
	bar() { /*..*/ },
	baz: function baz() { /*..*/ }
};

var Foo = {
	bar: function() { /*..*/ },
	baz: function baz() { /*..*/ }
};

var Foo = {
	bar: function(x) {
		if (x < 10) {
			return Foo.bar( x * 2 );
		}
		return x;
	},
	baz: function baz(x) {
		if (x < 10) {
			return baz( x * 2 );
		}
		return x;
	}
};

function Foo() {
	// ...
}
Foo.prototype.something = function(){
	// ...
}
var a1 = new Foo();
// later
if (a1 instanceof Foo) {
	a1.something();
}

function Foo() { /* .. */ }
Foo.prototype...
function Bar() { /* .. */ }
Bar.prototype = Object.create( Foo.prototype );
var b1 = new Bar( "b1" );

// relating `Foo` and `Bar` to each other
Bar.prototype instanceof Foo; // true
Object.getPrototypeOf( Bar.prototype ) === Foo.prototype; // true
Foo.prototype.isPrototypeOf( Bar.prototype ); // true
// relating `b1` to both `Foo` and `Bar`
b1 instanceof Foo; // true
b1 instanceof Bar; // true
Object.getPrototypeOf( b1 ) === Bar.prototype; // true
Foo.prototype.isPrototypeOf( b1 ); // true
Bar.prototype.isPrototypeOf( b1 ); // true

if (a1.something) {
	a1.something();
}

var Foo = { /* .. */ };
var Bar = Object.create( Foo );
Bar...
var b1 = Object.create( Bar );

// relating `Foo` and `Bar` to each other
Foo.isPrototypeOf( Bar ); // true
Object.getPrototypeOf( Bar ) === Foo; // true
// relating `b1` to both `Foo` and `Bar`
Foo.isPrototypeOf( b1 ); // true
Bar.isPrototypeOf( b1 ); // true
Object.getPrototypeOf( b1 ) === Bar; // true

