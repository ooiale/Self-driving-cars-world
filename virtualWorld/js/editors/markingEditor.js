class markingEditor{
    constructor(viewport, world, targetSegments) {
        this.viewport = viewport
        this.world = world

        this.canvas = viewport.canvas
        this.ctx = this.canvas.getContext('2d')

        this.mouse = null
        this.intent = null

        this.targetSegments = targetSegments

        this.markings = world.markings
    }

    //to be overwritten by the sub classes
    createMarking(center, directionVector) {
        return center
    }



    enable() {
        this.#addEventListener()
    }

    disable() {
        this.#removeEventListener()
    }


    #addEventListener() { 
        this.boundMouseDown = this.#handleMouseDown.bind(this)
        this.boundMouseMove = this.#handleMouseMove.bind(this)
        this.boundContextMenu = (evt) => evt.preventDefault()
        this.canvas.addEventListener("mousedown",  this.boundMouseDown)
        this.canvas.addEventListener("mousemove",  this.boundMouseMove )
        this.canvas.addEventListener('click', this.boundMouseClick);
        this.canvas.addEventListener('contextmenu', this.boundContextMenu)
    }

    #removeEventListener() { 
        this.canvas.removeEventListener("mousedown", this.boundMouseDown )
        this.canvas.removeEventListener("mousemove", this.boundMouseMove  )
        this.canvas.removeEventListener('contextmenu', this.boundContextMenu)
    }

    #handleMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt, true)
        const seg = getNearestSegment(
            this.mouse,
            this.targetSegments,
            13 * this.viewport.zoom
        )
        if (seg) {
            const proj = seg.projectPoint(this.mouse)
            if (proj.offset >= 0 && proj.offset <= 1) {
                this.intent = this.createMarking (
                    proj.point,
                    seg.directionVector()
                )
            }
            else {
                this.intent = null
            }
        }
        else {
            this.intent = null
        }  
    }

    #handleMouseDown(evt) {
        if (evt.button == 0) { //left click
            if (this.intent) {
                this.markings.push(this.intent)
                this.intent = null
            }
        }

        if (evt.button == 2) { //right click
            for (let i = 0; i < this.markings.length; i++) {
                const poly = this.markings[i].poly
                if (poly.containsPoint(this.mouse)) {
                    this.markings.splice(i, 1)
                    return
                }
            }
        }
    }

    display() {
        if (this.intent) {
            this.intent.draw(this.ctx, {width: 2})
        }
    }
}