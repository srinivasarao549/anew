# Anew - what (or why) is it?

Javascript is a pretty nice language.  If you look at my repos, you can probably tell I like it quite a lot.  I have only *one* major gripe with the inheritance system.  Consider:

    // A simple object management tool
    function ObjectManager(){
        this.objects = []
    }
    ObjectManager.prototype = ({
        add: function(object){
            this.objects.push(object)
        }
    })

    /*  To use this in a game, we might consider the generic 'objects'
        above to be 'entities' in our game.  We'd like to be able to update
        all of our entities from a method in our game object, since it's 
        the one in control.  (This is a pattern I actually use *a lot*)
    */
    function Game(){}
    Game.prototype = new ObjectManager
    
    // if an object in the Game has an update function, call it
    Game.prototype.update_entities = function(){
        this.objects.forEach(function(object){
            if ( object.update ) object.update()
        })
    }

Okay, so it's a bit ugly.  We can do the same thing more prettily with Object.create, but the root problem is the same: *instances of Game don't have their own 'object' property*.  Therefore, this will break:

    var game_a = new Game,
        game_b = new Game

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    console.log(game_a.objects) // This returns [{owner: "a"}, {owner: "b"}], *NOT* what we want

Anew is a lib designed to make specifying per-instance variables easy, and inheritable.


## How?

Erm, get back to you on that.  Anew is a work in progress.
