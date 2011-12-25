# Anew - Why do we need more Object creation sugar?

Javascript is a pretty nice language.  If you look at my repos, you can probably tell I like it quite a lot.  I have only *one* major gripe with the inheritance system.  Consider:

```javascript
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
```

The major problem with this is *instances of Game don't have their own 'objects' property*. You can't use more than one instance of Game without running into serious issues:

```javascript
    var game_a = new Game,
        game_b = new Game

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    // both objects are modifying the prototype
    // which is *not* what we'd like:

    // game_a.objects => [{owner: "a"}, {owner: "b"}]
    // game_b.objects => [{owner: "a"}, {owner: "b"}]
```

## API

### Signature

Anew is a single function, w/ a similar signature to Object.create:

```javascript
    function anew(proto, object) // -> object 
                                 // where object[[prototype]] == proto
```

###  constructors

Anew assumes that 'constructor' methods should be called on inheriting and applied to the new object instance.  This is where all per-instance properties are to be defined, e.g.:

```javascript
    var obj = anew(null, {
        constructor: function(){
            this.x = 3   
        }
    })

    // obj => {constructor: function(){ this.x = 3  }, x: 3}
```



### inheriting per-instance variables

Inheritance in OOP works on the basis that, in the inheriting object, the 'sub' overwrites the 'super' (be it an object or class).  In the same spirit, anew will apply each constructor method in the prototype chain from the oldest to the newest to the return object.  The implication of this is:

```javascript
    var gramps = {constructor: function(){ this.likes = "bridge"}},
        dad = anew(gramps, {constructor: function(){ this.likes = "golf"}}),
        kid = anew(dad)
    
    // kid.likes == "golf" 
```


Constructor methods *anywhere* in the prototype chain will take precedence over regular object properties:

```javascript
    var parent = {constructor: function(){ this.x = 2}},
        child = anew(parent, {x: 3})

    // child => {x: 2}
```

### Final example

If we use this to 'correct' the buggy example in the intro, it'd look like this:

```javascript
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
```

Now, our example from above will work correctly:

```javascript
    var game_a = anew(game),
        game_b = anew(game)

    game_a.add({owner: "a"})
    game_b.add({owner: "b"})

    // game_a.objects => [{owner: "a"}]
    // game_b.objects => [{owner: "b"}]
```

## Compatibility

The library itself is based on ES5 functionality.  However, if you include [es5-shim](https://github.com/kriskowal/es5-shim), you can get the following compatibility (at least):

 * ie 6+
 * safari 5 + 
 * chrome 13 + 
 * firefox 5 + 

It's very likely there's even better compatibility - feel free to run the tests (which include es5-shim by default) below, and notify me of any other browsers I need to add to the list.

## Testing

All of the examples shown have been tested.  [click here to run tests](http://hughfdjackson.github.com/anew/src-test/SpecRunner.html)
