class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load (info) {
        const points = []
        const segments = []
        for ( const pointInfo of info.points) {
            points.push(new Point(pointInfo.x, pointInfo.y))
        }
        for (const segmentInfo of info.segments) {
            segments.push(new Segment(
                points.find( (p) => p.equals(segmentInfo.p1)),
                points.find( (p) => p.equals(segmentInfo.p2))
            ) )
        }
        return new Graph(points, segments)
    }

    hash() {
        return JSON.stringify(this)
    }


    addPoint(point) {
        this.points.push(point)
    }

    tryAddPoint(point) {
        if(!this.containsPoint(point)) {
            this.addPoint(point)
            return true
        }
        return false
    }

    containsPoint(point) {
        return this.points.find(
            function(p) {
                return p.equals(point)
            }
        )
    }

    removePoint(point) {
        const segs = this.getSegmentsWithPoint(point)
        for (const seg of segs) {
            this.removeSegment(seg)
        }
        this.points.splice(this.points.indexOf(point), 1)
    }

    getSegmentsWithPoint(point) {
        const segs = []
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg)
            }
        }
        return segs
    }

    containsSegment(seg) {
        return this.segments.find( (s) => s.equals(seg))
    }

    tryAddSegment(seg) {
        if(!this.containsSegment(seg) && !seg.p2.equals(seg.p1)) {
            this.addSegment(seg)
            return true
        }
        return false
    }

    addSegment(seg) {
        this.segments.push(seg)
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1)
    }


    dispose() {
        this.points.length = 0
        this.segments.length = 0
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}
