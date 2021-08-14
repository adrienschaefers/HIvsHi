// Two sperate things matter needs 
//first thngs an engine - computation and math behinf this
// second thing a renderer - This draw an engine

//alias is a shortcut to make our code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const {Engine, Render, Bodies, World} = Matter

//Where matter us deployed
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
    return Bodies.circle(x, y, 20 + 20 * Math.random())
}

//wehn we click the page add a new shape

document.addEventListener("click", function(event) {
    const shape = createShape(event.pageX, event.pageY)
    World.add(engine.world, shape)
})












//run both the engine and the renderer
Engine.run(engine)
Render.run(renderer)