class ParkingEditor extends markingEditor {
    constructor(viewport, world) {
        super(viewport, world, world.laneGuides)
    }

    createMarking(center, directionVector) {
        return new Parking (
            center,
            directionVector,
            world.roadWidth / 1.88,
            world.roadWidth / 1.88
        )
    }
}