class Light extends Marking{
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height)
        
        this.state = 'off'
        this.border = this.poly.segments[0]
        this.type = 'light'
    }

    draw(ctx) {
        //this.border.draw(ctx)

        const perp = perpendicular(this.directionVector)
        const line = new Segment (
            add(this.center, scale(perp, this.width / 2)),
            add(this.center, scale(perp, -this.width / 2))
       )

        const green = lerp2D(line.p1, line.p2, 0.2)
        const yellow = lerp2D(line.p1, line.p2, 0.5)
        const red = lerp2D(line.p1, line.p2, 0.8)

        new Segment(red, green).draw(ctx, {
            width: this.height / 3,
            cap: "round"
           })     
    

        green.draw(ctx, {size: this.height / 5, color: "#060"})
        red.draw(ctx, {size: this.height / 5, color: "#600"})
        yellow.draw(ctx, {size: this.height / 5, color: "#660"})


        switch (this.state) {
            case 'green':
                green.draw(ctx, {size: this.height / 5, color: "#0F0"})
                break
            case 'yellow':
                yellow.draw(ctx, {size: this.height / 5, color: "#FF0"})
                break
            case 'red':
                red.draw(ctx, {size: this.height / 5, color: "#F00"})
                break
        }

    }
}