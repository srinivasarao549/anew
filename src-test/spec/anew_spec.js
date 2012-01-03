describe("anew", function(){

    describe("examples", function(){

        it("constructor methods as constructors", function(){
        
            var obj = anew(null, {
                constructor: function(){
                    this.x = 3   
                }
            })
            
            expect(obj.x).toEqual(3)
        })

        it("inheritence", function(){
        
            var gramps = {constructor: function(){ this.likes = "bridge"}},
                dad = anew(gramps, {constructor: function(){ this.likes = "golf"}}),
                kid = anew(dad)

            expect(kid.likes).toEqual("golf")
            expect(kid.constructor).toBe(dad.constructor)
        })
    
        it("constructor takes precedence over mixin object", function(){
            
            var parent = {constructor: function(){ this.x = 2}},
                child = anew(parent, {x: 3})

            expect(child.x).toEqual(2)
        })

        it("main example", function(){
        
            var object_manager = {
                constructor: function(){
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

    describe("edge cases", function(){
        
        it("must only add own properties on the mixin", function(){
            var parent_obj = {x: 4},        // this should be ignored
                mixin_obj = Object.create(parent_obj)
            
            mixin_obj.y = true
            
            var obj = anew({}, mixin_obj)
            

            expect(obj.y).toEqual(true)
            expect(obj.x).toEqual(undefined)    
        })
    
    })

})
