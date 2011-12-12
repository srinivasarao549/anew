void function(init){

    var get_proto = Object.getPrototypeOf,
        anew = function(proto, object){
            
            
            function mixin_object(to, from){
                // in case from is undefined
                if ( !from ) return 
                
                // mixin
                Object.keys(from).forEach(function(key){
                    to[key] = from[key]
                })
            }
            
            function call_proto_inits(object, proto){

                // in case proto is undefined
                if ( !proto ) proto = get_proto(object)
                
                // if we've reached the top of the stack, return
                if ( proto === Object.prototype ) return
                
                // recurse
                call_proto_inits(object, get_proto(proto)) 
                
                // apply
                if ( proto[init] ) proto[init].apply(object)

            }
            
            var new_object = Object.create(proto)
            
            // mixin extra props
            mixin_object(new_object, object)

            // call all inits in prototype
            if ( proto instanceof Object ) call_proto_inits(new_object)
           
            // call init that's been mixed in, if any
            if ( {}.hasOwnProperty.call(new_object, init) ) new_object[init]()
            
            return new_object
        }
    
    // export
    window["anew"] = anew

}("init")
