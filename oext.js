// Field
// Prop

// put this in lang-mini?

// Validate and transform in one function?
//  Throws an exception then it's a validation error.

const {
	each,
	get_a_sig,
	def,
	is_array,
	tof,
	tf
} = require("lang-mini");

const ifn = item => typeof item === "function";
const ia = is_array;


//const prop = (obj, prop_name, default_value, fn_transform) => {

// Raising change events or not.

// interested in having field version that works differently in node.
//  however, could possibly use prop? respond to the change event by setting _fields.[key]

/*
    oext fields would definitely help.
    setting _fields object in node environment would be great.

    nfield? a field specifically for non/browser environments.
    // could work with ._ value.

    // could use the _ object again with fields.
    //  then write the control fields as data-jsgui-fields or data-jsgui-_ data-jsgui_ or data-_
    //  with _ representing the fields.

    // with ._ giving direct access that does not go via the getter or setter or change event.
    //  seems like a good system.
    //  always change the property on the _ object with a field. Makes it easier to iterate through fields.
    //   no difference on node that way.
*/

// These fields could change the way controls work.
//  Anything set to the ._ property is a field.
//   They will all be transferred from the server to the client. Maybe just if the right data types.
//   Props won't be transferred.

// key or value fields
//  dba database annotation in object (on static object)
//  kv_fields


// Better automatic handling of changes?
//  With no raising of change events?
//   Change events on one object could get clogged.
//   Maybe don't want need to raise these change events. Maybe just want to run a function within the definition.


// Application-level options will help.
//  Be able to change a module options variable.

// Be able to use different options for different modules that reference this module?
//  Require loads the same module, I think.
//   May be problems with overridings / inteference with these module level options on a singleton.
//   Loading more than 1 instance of a module with node require?

// https://stackoverflow.com/questions/28833808/how-to-get-multiple-instances-of-module-in-node-js


// Sepearate instance of the function for each module reference?
//  Probably best not to do it this way / have a new instance as being optional.

const get_instance = function () {

	const opts = {
		raise_change_events: true
	}


	// Maybe use MFP for this too?
	//  Worth benchmarking before and after. mfp not benchmarked yet.

	const states = (obj, states) => {
		// set the states
		// set / get the state by name
		// set / get the states by index
		// alternate / toggle between states
	};

	// add the db field data


	// uses ._[name]

	// Should make the prop_name work as an array for aliases.
	const field = (...a) => {

		// let obj, prop_name, default_value, fn_transform;
		//  a function for responding to changes? Change handler here?
		//   and not raise the change event?
		//    maybe do that with prop first or instead.


		// multiple fields to one object.
		// multiple fields to different objects

		let s = get_a_sig(a);

		if (s === "[a]") {
			each(a[0], item_params => {
				prop.apply(this, item_params);
			});
		} else {
			if (a.length > 1) {
				if (ia(a[0])) {
					// the rest of the properties applied to the array of items.
					let objs = a.shift();
					each(objs, obj => {
						prop.apply(this, [obj].concat(item_params));
					});
				} else {
					// normal operation.
					// single object.
					// no default value?
					let obj, prop_name, default_value, fn_transform;

					let raise_change_events = opts.raise_change_events;

					const t_raise = tf(obj.raise);
					if (t_raise !== 'f') {
						raise_change_events = false;
					}

					// If obj does not have a .raise function, we can't raise the event anyway.



					if (a.length === 2) {
						[obj, prop_name] = a;
						//[obj, prop_name, default_value, fn_transform] = a;
					}
					if (a.length === 3) {
						if (ifn(a[2])) {
							[obj, prop_name, fn_transform] = a;
						} else {
							[obj, prop_name, default_value] = a;
						}
						//[obj, prop_name, default_value, fn_transform] = a;
					}
					if (a.length === 4) {
						[obj, prop_name, default_value, fn_transform] = a;
					}
					//let [obj, prop_name, default_value, fn_transform] = a;

					//let _prop_value = default_value;
					Object.defineProperty(obj, prop_name, {
						get() {
							if (def(obj._)) {
								return obj._[prop_name];
							} else {
								return undefined;
							}
							//return _prop_value;
						},
						set(value) {
							//console.log('setting prop: ' + prop_name);
							let old = (obj._ = obj._ || {})[prop_name];
							// value must be an array of length 2.
							let _value;
							if (fn_transform) {
								//try {
								_value = fn_transform(value);
								//} catch (err) {
								//    throw err;
								//}
							} else {
								_value = value;
							}
							obj._[prop_name] = _value;
							//let old = _prop_value;
							//_prop_value = _value;

							// Seems not to be set up to do this on client-side controls?
							//   conflicts with dom change?
							//    want to listen to the event from non-dom sources too. Should be OK.
							//    Shouldn't only be attached on DOM listeners.
							//    Need to ensure the fields get set up on activation.

							if (raise_change_events) {
								obj.raise("change", {
									name: prop_name,
									old: old,
									value: _value
								});
							}


						}
					});
					//obj.silent = (name, value) => {
					//
					//}
					if (def(default_value)) {
						// could have a spec object.
						(obj._ = obj._ || {})[prop_name] = default_value;
					}
				}
			}
		}
	};


	const get_set = (obj, prop_name, fn_get, fn_set) => {
		const def = {
			// Using shorthand method names (ES2015 feature).
			// This is equivalent to:
			// get: function() { return bValue; },
			// set: function(newValue) { bValue = newValue; },
			get: fn_get,
			set: fn_set,
			enumerable: true,
			configurable: false
		}

		const t_prop_name = tf(prop_name);
		if (t_prop_name === 'a') {
			each(prop_name, name => Object.defineProperty(obj, name, def));
		} else if (t_prop_name === 's') {
			Object.defineProperty(obj, prop_name, def);
		} else {
			console.trace();
			throw 'Unexpected prop_name, must be array or string';
		}


	}

	//


	// Should make the prop_name work as an array for aliases.
	const read_only = (obj, prop_name, fn_get) => {
		/*
		  Object.defineProperty(obj, prop_name, {
		      get() {
		          return fn_get();
		      }
		  });
		  */

		Object.defineProperty(obj, prop_name, {
			enumerable: true,
			get: fn_get
		});
	};

	// prop does / should raise 'change' events on the parent object.
	// Aliases would help a lot too.

	// Maybe a create_alias function?
	//  Allow multiple aliases.
	//  Also, make change events raise optional.

	// Think prop deals with aliases as an array.
	//  Make tests before examples.


	// [obj, prop_name, default_value, options]


	const prop = (...a) => {
		// ...args?
		let s = get_a_sig(a);

		console.log('prop sig', s);

		// Need to read the params.
		//  Maybe could use a new param reading specific function?


		// This needs to be fast to set up as well.

		if (s === "[a]") {

			// Signature as a single object...?

			each(a[0], item_params => {
				prop.apply(this, item_params);
			});
		} else {
			//console.log('a.length', a.length);

			// a length 2
			//  obj, arr
			if (a.length === 2) {
				//console.log('a[1]', a[1]);
				if (ia(a[1])) {
					const target = a[0];
					//console.log('item', item);
					each(a[1], item => {
						if (ia(item)) {
							throw "NYI 468732";
						} else {
							prop(target, item);
						}
					});
				} else {
					//console.trace();
					//

					// obj, name, no default value

					// is the second param a string?
					//  is it multiple options that apply to an object?

					// mfp would help with this, especially with some kind of wildcards.

					// io is obj?
					// iso?
					// isa?

					//console.log('typeof a[1]', typeof a[1]);
					const ta1 = tof(a[1]);

					if (ta1 === "string") {
						// prop name
						[obj, prop_name] = a;
					} else {
						// multiple properties in an object.

						// Not so sure about load options / other options either.

						throw "NYI 468732b";
					}
				}
			}

			// Giving the property name as an array would be a good / the best way to set aliases.



			if (a.length > 2) {
				// one item, multiple property names.
				// object a[0]
				//

				if (ia(a[0])) {
					// the rest of the properties applied to the array of items.
					throw "stop";
					let objs = a.shift();
					each(objs, obj => {
						prop.apply(this, [obj].concat(item_params)); // bug
					});
				} else {


					// normal operation.
					// single object.
					// no default value?
					// fn_onchange

					// just a transform function really.
					//  could have validation too.

					// options variable will need to be earlier.
					//  maybe best to only use the options variable?
					//  or mfp for better / more complex handling of params.
					//   an option object could be used here relatively simple.
					//    then use mfp so it sets up the options object.

					// all options object params could be a nice way of working.
					//  could be a lot more explicit, then mfp would arrange it for flexible
					//  calling with defind signatures (also explicit).

					// onchange function, as well as enabling and disabling the change events
					// transform function.
					//  also identify functions by their wrapped names / types.

					// Moving options to the front makes sense.
					//  (obj, prop_name, default_value, options)
					//  (obj, prop_name, default_value???)
					//  (obj, prop_name, options???)
					//  (options)

					// Try getting

					//console.log('oext prop a.length', a.length);



					let obj, prop_name, default_value, fn_onchange, fn_transform, fn_on_ready, options;

					const load_options = options => {
						//console.log('options', options);
						prop_name = prop_name || options.name || options.prop_name;
						fn_onchange =
							options.fn_onchange || options.onchange || options.change;
						fn_transform =
							options.fn_transform || options.ontransform || options.transform;
						fn_on_ready = options.ready || options.on_ready;
						default_value = default_value || options.default_value || options.default;

						//console.log('fn_on_ready', fn_on_ready);

					};
					if (a.length === 2) {
						[obj, options] = a;
						load_options(options);
						//[obj, prop_name, default_value, fn_transform] = a;
					}

					if (a.length === 3) {
						if (ifn(a[2])) {
							//[obj, prop_name, fn_transform] = a;
							[obj, prop_name, fn_onchange] = a;
						} else {

							//console.log('not ifn a[2]. could it be an options object?');
							// could duck type to see if it's got functions attached.

							//console.log('a[2]', a[2]);

							// default, change, ready.
							//  those are the options that the options object could contain.
							if (a[2].change || a[2].ready) {
								// thats the options object.
								load_options(a[2]);

								[obj, prop_name] = a;
							} else {
								[obj, prop_name, default_value] = a;
							}
						}
						//[obj, prop_name, default_value, fn_transform] = a;
					}
					if (a.length === 4) {

						console.log('a length 4');
						// onchange optional function too.
						// get_a_sig would help here.
						if (ifn(a[2]) && ifn(a[3])) {
							// transform, onchange
							console.log('2 and 3 are functions');

							// Transformation of input value
							// Response to change

							[obj, prop_name, fn_transform, fn_onchange] = a;
						} else if (ifn(a[3])) {
							//[obj, prop_name, fn_transform] = a;
							[obj, prop_name, default_value, fn_onchange] = a;
						} else {
							[obj, prop_name, default_value, options] = a;
							load_options(options);
						}
					}
					if (a.length === 5) {
						// onchange optional function too.
						[obj, prop_name, default_value, fn_transform, fn_onchange] = a;
					}
					//let [obj, prop_name, default_value, fn_transform] = a;
					//let _prop_value = default_value;
					//console.log('!!fn_onchange', !!fn_onchange);

					// if the name is given as an array...?
					let _prop_value;

					if (typeof default_value !== 'undefined') _prop_value = default_value;
					// And a silent set function that does not raise the change event.
					const _silent_set = value => {
						let _value;
						if (fn_transform) {
							//try {
							// Validation could throw an error
							// rectify function?
							_value = fn_transform(value);
							//} catch (err) {
							//    throw err;
							//}
						} else {
							_value = value;
						}
						_prop_value = _value;
					}

					// Should have been set already?

					const _set = value => {
						let _value;
						//const raise_change_events = true;

						if (fn_transform) {
							//try {
							// Validation could throw an error
							// rectify function?
							_value = fn_transform(value);
							//} catch (err) {
							//    throw err;
							//}
						} else {
							_value = value;
						}
						let old = _prop_value;
						//console.log('old', old);
						_prop_value = _value;


						if (fn_onchange) {

							//fn_onchange([_prop_value, old]);
							fn_onchange({
								old: old,
								value: _prop_value
							});

						}
						if (obj.raise && opts.raise_change_events) {
							obj.raise("change", {
								name: prop_name,
								old: old,
								value: _prop_value
							});
						}
					};

					/*
					if (def(default_value)) {
					  _set(default_value);
					}
					*/

					if (def(default_value)) {
						_prop_value = default_value;
					}

					const t_prop_name = tf(prop_name);

					if (t_prop_name === 's') {

						Object.defineProperty(obj, prop_name, {
							get() {
								return _prop_value;
							},
							set(value) {
								_set(value);
							}
						});

					} else if (t_prop_name === 'a') {
						const l = prop_name.length;
						//console.log('prop_name', prop_name);
						let item_prop_name;
						for (let c = 0; c < l; c++) {
							item_prop_name = prop_name[c];
							//console.log('item_prop_name', item_prop_name);
							Object.defineProperty(obj, item_prop_name, {
								get() {
									return _prop_value;
								},
								set(value) {
									_set(value);
								}
							});
						}
					} else {
						throw 'Unexpected name type: ' + t_prop_name;
					}

					//console.log('!!fn_on_ready', !!fn_on_ready);

					if (fn_on_ready) {
						fn_on_ready({
							silent_set: _silent_set
						})
					}
				}
			}
		}
	};

	// could return a function get_instance, with those functions merged.

	return {
		opts: opts, // module level options
		prop: prop,
		field: field,
		read_only: read_only,
		ro: read_only,
		get_set: get_set,
		gs: get_set
	};
};
module.exports = get_instance();

