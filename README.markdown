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

The major problem with this is *instances of Game don't have their own 'object' property*. You can't use more than one instance of Game without running into serious issues:

    var game_a = new Game,
        game_b = new Game

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    console.log(game_a.objects) // [{owner: "a"}, {owner: "b"}], *NOT* what we want
    console.log(game_a.objects) // [{owner: "a"}, {owner: "b"}], *NOT* what we want

Anew is a lib designed to make specifying per-instance properties easy, and inheritable.

## API

To show, rather than tell:

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

Now, our example from above will work correctly:

    var game_a = anew(game),
        game_b = anew(game)

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    console.log(game_a.objects) //  [{owner: "a"}]
    console.log(game_b.objects) //  [{owner: "b"}]


## How

Anew works rather like Object.create, except for the fact that it 'walks' up the prototype tree and applies all init methods from the 'oldest' ancestor to the newest to the returned object.  It also takes a second param, which specifies the properties for the new object. That means we can re-write that badboy up there like so:

## Compatibility

At the moment, ES5 compatibility is assumed - no shims are used.

## Testing

[click here to run tests](http://hughfdjackson.github.com/anew/src-test/SpecRunner.html)
