void function(init){

    var get_proto = Object.getPrototypeOf
    
    function anew(proto, object){
        
        void function set_defaults(){
            if ( proto === undefined ) proto = {}
            if ( object === undefined ) object = {}
        }()

        var return_object = Object.create(proto)
        
        mixin_object(return_object, object)
        if ( proto instanceof Object ) call_proto_inits(return_object)
        if ( {}.hasOwnProperty.call(return_object, init) ) return_object[init]()
        
        return return_object


    // HELPERS


        function mixin_object(to, from){
            
            Object.keys(from).forEach(function(key){
                to[key] = from[key]
            })
        
        }
        
        function call_proto_inits(object, proto){
            
            if ( !proto ) proto = get_proto(object)
            
            if ( proto === Object.prototype ) return
            else call_proto_inits(object, get_proto(proto)) 
            
            // apply while falling from stack 
            if ( proto[init] ) proto[init].apply(object)

        }

    }

    // export
    window["anew"] = anew

}("init")
