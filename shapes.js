// Two sperate things matter needs 
//first thngs an engine - computation and math behinf this
// second thing a renderer - This draw an engine

//alias is a shortcut to make our code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

//Where matter is deployed
const sectionTag = document.querySelector("section.shapes")

const h = window.innerHeight;
const w = window.innerWidth;

const engine = Engine.create()
const renderer = Render.create({
    element: sectionTag,
    engine: engine, 
    options: {
        height : h,
        width : w , 
        background : "#000000",
        wireframes : false,
        pixelRatio : window.devicePixelRatio
    }
})



const createShape = function (x, y) {
    return Bodies.rectangle(x, y, 38, 50, {
       
        render : {
            sprite : {
                texture : "outline.png", 
                xScale: 0.5,
                yScale: 0.5,
            }
        }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w/4, h/4), {
    isStatic : true,
    render : {
        fillStyle : "#FFFFFF"
    }
})


const wallOptions = {
    isStatic: true, 
    render : {
        visible: false
    }
}

const ground = Bodies.rectangle(w / 2, h +50,  w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, - 50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag, 
    constraint : {
        render : {
            visible : false,
        }
    }
})

const initialShapes = Composites.stack(50, 50, 100, 5, 40, 40, function(x,y){
    return createShape(x, y)
})

//ajout la variable dans le canvas
World.add(engine.world, [
    bigBall, 
    ground, 
    ceiling,
    rightWall,
    leftWall,
    mouseControl,
    initialShapes,
])



//wehn we click the page add a new shape

document.addEventListener("click", function(event) {
    const shape = createShape(event.pageX, event.pageY)
//ajout la variable dans le canvas
    World.add(engine.world, shape)
})


// When we move our mouse, check matter for any collection
// Does the mouse touch a body

document.addEventListener("mousemove", function(event){
    const vector = { x : event.pageX, y : event.pageY,}
    const hoveredShapes = Query.point(initialShapes.bodies, vector)


    hoveredShapes.forEach (shape => {
        shape.render.sprite = null
        shape.render.fillStyle  =  "red"
    })
})








//run both the engine and the renderer
Engine.run(engine)
Render.run(renderer)


// let time = 0
// const changeGravity = function(){
//     time = time + 0.01

//     engine.world.gravity.x = Math.sin(time)
//     engine.world.gravity.y = Math.cos(time)

//     requestAnimationFrame(changeGravity)
// }

// changeGravity()

window.addEventListener("deviceorientation", function(event){
    engine.world.gravity.y = event.beta / 30
    engine.world.gravity.x = event.gamma / 30
})