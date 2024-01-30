class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport
        this.canvas = viewport.canvas
        this.graph = graph
    
        this.ctx = this.canvas.getContext("2d")

        this.selected = null
        this.hovered = null
        this.dragging = false
        this.mouse = null

    }

    enable() {
        this.#addEventListener()
    }

    disable() {
        this.#removeEventListener()
        this.selected = false
        this.hovered = false
    }


    #addEventListener() { 
        this.boundMouseDown = this.#handleMouseDown.bind(this)
        this.boundMouseMove = this.#handleMouseMove.bind(this)
        this.boundMouseClick = () => this.dragging = false
        this.boundContextMenu = (evt) => evt.preventDefault()
        this.canvas.addEventListener("mousedown",  this.boundMouseDown)
        this.canvas.addEventListener("mousemove",  this.boundMouseMove )
        this.canvas.addEventListener('click', this.boundMouseClick);
        this.canvas.addEventListener('contextmenu', this.boundContextMenu)
    }

    #removeEventListener() { 
        this.canvas.removeEventListener("mousedown", this.boundMouseDown )
        this.canvas.removeEventListener("mousemove", this.boundMouseMove  )
        this.canvas.removeEventListener('click', this.boundMouseClick);
        this.canvas.removeEventListener('contextmenu', this.boundContextMenu)
    }

    #handleMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt, true)
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 13 * this.viewport.zoom)  
        if (this.dragging == true) {
            this.selected.x = this.mouse.x
            this.selected.y = this.mouse.y
        }
    }

    #handleMouseDown(evt) {
        if (evt.button == 2 ) { //right click
            if (this.selected) {
                this.selected = null
            }
            else if (this.hovered) {
                this.#removePoint(this.hovered)
            }
        }
        if (evt.button == 0) { //left click
            if (this.hovered) {
                this.#select(this.hovered) //segment between selected and hovered
                this.selected = this.hovered
                this.dragging = true
                return
            }
            this.graph.addPoint(this.mouse)
            this.#select(this.mouse) //creates a segment between selected and this.mouse
            this.selected = this.mouse
            this.hovered = this.mouse
        }
    }

    #removePoint(point) {
        this.graph.removePoint(point)
        this.hovered = null
        if (this.selected == point) {
            this.selected = null}
    }

    #select (point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment (this.selected, point))
        }
    }

    dispose() {
        this.graph.dispose()
        this.selected = null
        this.hovered = null
    }

    display() {
        this.graph.draw(this.ctx)
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true})
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse 
            new Segment(this.selected, intent).draw(ctx, {dash : [3,3]})
            this.selected.draw(this.ctx, { outline: true})
        }
    }


}