void function(){
    // conveniences
    var get_proto = Object.getPrototypeOf,

    
    // main func
        anew = function(proto, object){
            
            var new_object = Object.create(proto)

            function mixin_object(to, from){
                if ( !from ) return 
                Object.keys(from).forEach(function(key, val){
                    to[key] = val
                })
            }
            
            function call_proto_inits(object, proto){
                if ( !proto ) proto = get_proto(object)
                if ( proto === Object.prototype ) return
                call_proto_inits(object, get_proto(proto))
                if ( proto.init ) proto.init.apply(object)
            }
            
            call_proto_inits(new_object)
            mixin_object(new_object, object)
            new_object.init()
            return new_object
        }
    
    // export
    window["anew"] = anew

}()
