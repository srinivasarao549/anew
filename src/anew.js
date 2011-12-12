void function(){

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
                
                // apply
                if ( proto.init ) proto.init.apply(object)

                // if we've reached the top of the stack, return
                if ( proto === Object.prototype ) return
                
                // recurse
                call_proto_inits(object, get_proto(proto))   
            }
            
            var new_object = Object.create(proto)
            
            // call all inits in prototype
            if ( proto instanceof Object ) call_proto_inits(new_object)

            // mixin extra props
            mixin_object(new_object, object)

            // call init that's been mixed in, if any
            if ( new_object.init ) new_object.init()
            
            return new_object
        }
    
    // export
    window["anew"] = anew

}()
