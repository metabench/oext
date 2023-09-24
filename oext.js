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
					let obj, prop_name, default_value, fn_transform;
					let raise_change_events = opts.raise_change_events;
					if (a.length === 2) {
						[obj, prop_name] = a;
					}
					if (a.length === 3) {
						if (ifn(a[2])) {
							[obj, prop_name, fn_transform] = a;
						} else {
							[obj, prop_name, default_value] = a;
						}
					}
					if (a.length === 4) {
						[obj, prop_name, default_value, fn_transform] = a;
					}

					if (obj !== undefined) {
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
								if (raise_change_events) {
									obj.raise("change", {
										name: prop_name,
										old: old,
										value: _value
									});
								}
							}
						});
						if (def(default_value)) {
							(obj._ = obj._ || {})[prop_name] = default_value;
						}
					} else {
						throw 'stop';
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

	const prop = (...a) => {
		// ...args?
		let s = get_a_sig(a);
		if (s === "[a]") {
			each(a[0], item_params => {
				prop.apply(this, item_params);
			});
		} else {
			if (a.length === 2) {
				if (ia(a[1])) {
					const target = a[0];
					each(a[1], item => {
						if (ia(item)) {
							throw "NYI 468732";
						} else {
							prop(target, item);
						}
					});
				} else {
					const ta1 = tof(a[1]);
					if (ta1 === "string") {
						[obj, prop_name] = a;
					} else {
						throw "NYI 468732b";
					}
				}
			}

			if (a.length > 2) {
				if (ia(a[0])) {
					// the rest of the properties applied to the array of items.
					throw "stop";
					let objs = a.shift();
					each(objs, obj => {
						prop.apply(this, [obj].concat(item_params)); // bug
					});
				} else {
					let obj, prop_name, default_value, fn_onchange, fn_transform, fn_on_ready, options;
					const load_options = options => {
						prop_name = prop_name || options.name || options.prop_name;
						fn_onchange =
							options.fn_onchange || options.onchange || options.change;
						fn_transform =
							options.fn_transform || options.ontransform || options.transform;
						fn_on_ready = options.ready || options.on_ready;
						default_value = default_value || options.default_value || options.default;
					};
					if (a.length === 2) {
						[obj, options] = a;
						load_options(options);
					}

					if (a.length === 3) {
						if (ifn(a[2])) {
							[obj, prop_name, fn_onchange] = a;
						} else {
							if (a[2].change || a[2].ready) {
								load_options(a[2]);

								[obj, prop_name] = a;
							} else {
								[obj, prop_name, default_value] = a;
							}
						}
						//[obj, prop_name, default_value, fn_transform] = a;
					}
					if (a.length === 4) {
						if (ifn(a[2]) && ifn(a[3])) {
							[obj, prop_name, fn_transform, fn_onchange] = a;
						} else if (ifn(a[3])) {
							[obj, prop_name, default_value, fn_onchange] = a;
						} else {
							[obj, prop_name, default_value, options] = a;
							load_options(options);
						}
					}
					if (a.length === 5) {
						[obj, prop_name, default_value, fn_transform, fn_onchange] = a;
					}
					let _prop_value;

					if (typeof default_value !== 'undefined') _prop_value = default_value;
					// And a silent set function that does not raise the change event.
					const _silent_set = value => {
						let _value;
						if (fn_transform) {
							_value = fn_transform(value);
						} else {
							_value = value;
						}
						_prop_value = _value;
					}
					const _set = value => {
						let _value;
						if (fn_transform) {
							_value = fn_transform(value);
						} else {
							_value = value;
						}
						let old = _prop_value;
						_prop_value = _value;
						if (fn_onchange) {
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
		opts, // module level options
		prop,
		field,
		read_only,
		ro: read_only,
		get_set,
		gs: get_set
	};
};
module.exports = get_instance();



