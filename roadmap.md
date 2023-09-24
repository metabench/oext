Aliases
    For field, read_only, prop

Does the object being extended have a 'raise' function?
    Use that to determine if we can even raise a 'change' event.


lazy(this, prop_name, fn_object_provider)

2022 - This could benefit from functionality concerning types.
    Setting the type of a property - to be validated on 'set'.
    Maybe some more complex things involving type / subtype transformations.
    Work will be done on such types (Signifier and Representations) that could have use here - but possibly it should be at a lower level than oext.
    lang-mini could even be a good place for it for the moment - would would need to make them really good, with compact (enough) code in lang-mini.

Consider both signifier and representative types

Signifier types is (only) a name?
Or rather, type signifier.

A Type_Name class perhaps?
  A language property
  Could even reference a language object.
  