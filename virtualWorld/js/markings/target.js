class Target extends Marking{
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height)

        this.type = 'target'
        
    }

    draw(ctx) {        
        this.center.draw(ctx, {size:28, color: "red"})
        this.center.draw(ctx, {size:16, color: "white"})
        this.center.draw(ctx, {size:6, color: "red"})

    }
}