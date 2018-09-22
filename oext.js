// Field
// Prop

// Validate and transform in one function?
//  Throws an exception then it's a validation error.

const lang = require('lang-mini');
const {
    each,
    get_a_sig,
    def
} = lang;

const ifn = item => typeof item === 'function';
const ia = lang.is_array;
//const prop = (obj, prop_name, default_value, fn_validate_transform) => {

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

// add the db field data 


const field = (...a) => {

    // multiple fields to one object.
    // multiple fields to different objects

    let s = get_a_sig(a);

    if (s === '[a]') {
        each(a[0], item_params => {
            prop.apply(this, item_params);
        })
    } else {
        if (a.length > 1) {
            if (ia(a[0])) {
                // the rest of the properties applied to the array of items.

                let objs = a.shift();
                each(objs, obj => {
                    prop.apply(this, [obj].concat(item_params));
                })


            } else {
                // normal operation.
                // single object.

                // no default value?
                let obj, prop_name, default_value, fn_validate_transform;
                if (a.length === 2) {
                    [obj, prop_name] = a;
                    //[obj, prop_name, default_value, fn_validate_transform] = a;
                }

                if (a.length === 3) {
                    if (ifn(a[2])) {
                        [obj, prop_name, fn_validate_transform] = a;
                    } else {
                        [obj, prop_name, default_value] = a;
                    }
                    //[obj, prop_name, default_value, fn_validate_transform] = a;
                }
                if (a.length === 4) {
                    [obj, prop_name, default_value, fn_validate_transform] = a;
                }

                //let [obj, prop_name, default_value, fn_validate_transform] = a;

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

                        if (fn_validate_transform) {
                            //try {
                            _value = fn_validate_transform(value)
                            //} catch (err) {
                            //    throw err;
                            //}
                        } else {
                            _value = value;
                        }
                        obj._[prop_name] = _value;
                        //let old = _prop_value;
                        //_prop_value = _value;

                        obj.raise('change', {
                            'name': prop_name,
                            'old': old,
                            'value': _value
                        });
                    }
                });

                if (def(default_value)) {
                    // could have a spec object.
                    obj._[prop_name] = default_value;
                }
            }
        }
    }
}

const prop = (...a) => {
    // ...args?
    let s = get_a_sig(a);

    if (s === '[a]') {
        each(a[0], item_params => {
            prop.apply(this, item_params);
        })
    } else {
        if (a.length > 2) {
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
                let obj, prop_name, default_value, fn_validate_transform;

                if (a.length === 3) {
                    if (ifn(a[2])) {
                        [obj, prop_name, fn_validate_transform] = a;
                    } else {
                        [obj, prop_name, default_value] = a;
                    }
                    //[obj, prop_name, default_value, fn_validate_transform] = a;
                }
                if (a.length === 4) {
                    [obj, prop_name, default_value, fn_validate_transform] = a;
                }

                //let [obj, prop_name, default_value, fn_validate_transform] = a;

                let _prop_value = default_value;
                Object.defineProperty(obj, prop_name, {
                    get() {
                        return _prop_value;
                    },
                    set(value) {
                        // value must be an array of length 2.
                        let _value;

                        if (fn_validate_transform) {
                            //try {
                            _value = fn_validate_transform(value)
                            //} catch (err) {
                            //    throw err;
                            //}
                        } else {
                            _value = value;
                        }
                        let old = _prop_value;
                        _prop_value = _value;

                        obj.raise('change', {
                            'name': name,
                            'old': old,
                            'value': _prop_value
                        });

                        /*
                        if (fn_validate) {
                            let val = fn_validate(value);
                            if (val === true) {
                                

                            } else {
                                throw val;
                            }
                        } else {
                            let old = _prop_value
                            _prop_value = value;
                            if (!obj.el) {
                                (obj._fields = obj._fields || {})[name] = value;
                                //this._fields = this._fields || {};
                                //this._fields[name] = value;
                            }
                            obj.raise('change', {
                                'name': name,
                                'old': old,
                                'value': value
                            });
                        }
                        */
                    }
                });
            }
        }
    }

    // then different param setting functions.

    /*
    let map_fns_by_sig = {
        '[?,s,?,f]': {}
    }

    let fn_validate_transform;
    let [obj, prop_name, default_value] = a;
    if (a.length === 4 && ifn(a[3])) fn_validate_transform = a[3];
    */

    // if the prop name is an array.

    // if we get a single array teh run that array.




}

// and a field function as well.
//  field would have extra meaning on a Control.
//   would operate differently in different modes
//   in node, will add to _fields object.

// or system with optional function call for when it operates in node.



// array of property names...

module.exports = {
    'prop': prop,
    'field': field
}