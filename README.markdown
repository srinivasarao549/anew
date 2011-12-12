# Anew - Why do we need more Object creation sugar?

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

    /*  To use this in a game, we'd like to be able to update
        all of our objects from a method in our game object.
    */
    function Game(){}
    Game.prototype = new ObjectManager
    
    // if an object in the Game has an update function, call it
    Game.prototype.update_objects = function(){
        this.objects.forEach(function(object){
            if ( object.update ) object.update()
        })
    }

The major problem with this is *instances of Game don't have their own 'objects' property*. You can't use more than one instance of Game without running into serious issues:

    var game_a = new Game,
        game_b = new Game

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    console.log(game_a.objects) // [{owner: "a"}, {owner: "b"}], *NOT* what we want
    console.log(game_b.objects) // [{owner: "a"}, {owner: "b"}], *NOT* what we want

## API

### Signature

Anew is a single function, w/ a similar signature to Object.create:

    function anew(proto, object) // -> object 
                                 // where object[[prototype]] == proto

### init methods as constructors

Anew assumes that 'init' methods should act like constructors.  This is where all per-instance
properties are to be defined, e.g.:

    var obj = anew(null, {
        init: function(){
            this.x = 3   
        }
    })

    // obj === {init: function(){ this.x = 3  }, x: 3}
 
### inheriting per-instance variables

Inheritance in OOP works on the basis that, in the inheriting object, the 'sub' overwrites the 'super' (be it an object or class).  In the same spirit, anew will apply each init method in the prototype chain from the oldest to the newest to the return object.  The implication of this is:

    var gramps = {init: function(){ this.x = 1}},
        dad = anew(gramps, {init: function(){ this.x = 2}}),
        kid = anew(dad)

    // kid.x === 2

### Final example

If we use this to 'correct' the buggy example in the intro, it'd look like this:

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


## Compatibility

At the moment, ES5 compatibility is assumed - no shims are used.

## Testing

All of the examples shown have been tested.  [click here to run tests](http://hughfdjackson.github.com/anew/src-test/SpecRunner.html)
