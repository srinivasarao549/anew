describe("anew", function(){

    describe("Object create", function(){
    
        // don't run the tests of Object.create isn't supported 
       // if ( !Object.create ) return 

        it("must create new object, then call init methods in order", function(){
            var proto_a = {init: function(){ this.x =1 }},
                proto_b, proto_c, object
            
            proto_b = Object.create(proto_a)
            proto_b.init = function(){ this.x = 2 }
            
            proto_c = Object.create(proto_b)
            proto_c.init = function(){ this.x = 3 }
        
            object = anew(proto_c)

            expect(object.x).toEqual(3)
            // proto_c should not be changed
            expect(proto_c.x).toEqual(undefined)
        })
   
    })

    describe("examples", function(){

        it("init methods as constructors", function(){
        
            var obj = anew(null, {
                init: function(){
                    this.x = 3   
                }
            })
            
            expect(obj.x).toEqual(3)
        })

        it("inheritence", function(){
        
            var gramps = {init: function(){ this.likes = "bridge"}},
                dad = anew(gramps, {init: function(){ this.likes = "golf"}}),
                kid = anew(dad)

            expect(kid.likes).toEqual("golf")
            expect(kid.init).toBe(dad.init)
        })
    
         
        it("main example", function(){
        
            var object_manager = {
                init: function(){
                    this.objects = []
                },
                add: function(object){
                    this.objects.push(object)   
                }
            }

            var game = anew(object_manager, {
                update: function(){
                    this.objects.forEach(function(object){
                        if ( object.update ) object.update()
                    })
                }
            })

            var game_a = anew(game),
                game_b = anew(game)

            game_a.add({owner: "a"})
            game_b.add({owner: "b"})
            
            expect(game_a.objects).toEqual([{owner: "a"}])
            expect(game_b.objects).toEqual([{owner: "b"}])
        })


    })

})
