void function(){
    // conveniences
    var get_proto = Object.getPrototypeOf,

    
    // main func
        anew = function(object){
        
            function process_proto(object, proto){
                if ( !proto ) proto = get_proto(object)
                if ( proto === Object.prototype ) return
                process_proto(object, get_proto(proto))
                if ( proto.init ) proto.init.apply(object)
            }
            
            process_proto(object)
            object.init()
            return object
        }
    
    // export
    window["anew"] = anew

}()
