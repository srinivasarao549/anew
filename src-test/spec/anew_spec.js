describe("anew", function(){

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
    
        it("init takes precedence over mixin object", function(){
            
            var parent = {init: function(){ this.x = 2}},
                child = anew(parent, {x: 3})

            expect(child.x).toEqual(2)
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
