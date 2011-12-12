describe("anew", function(){

    describe("Object create", function(){
    
        // don't run the tests of Object.create isn't supported 
       // if ( !Object.create ) return 

        it("must find all 'init' methods of objects, and call them in order", function(){
            var proto_a = {init: function(){ this.x =1 }},
                proto_b, proto_c, object
            
            proto_b = Object.create(proto_a)
            proto_b.init = function(){ this.x = 2 }
            
            proto_c = Object.create(proto_b)
            proto_c.init = function(){ this.x = 3 }
        
            object = anew(proto_c)

            console.log(object)
            expect(object.x).toEqual(3)
        })
    
    })

})
