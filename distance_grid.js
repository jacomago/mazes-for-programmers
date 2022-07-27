class DistanceGrid extends Grid {
    distances;
    constructor(rows, columns) {
        super(rows, columns);
    }
    contents_of(cell) {
        if (this.distances && this.distances.get(cell)) {
            return this.distances.get(cell);
        } else {
            return super.contents_of(cell);
        }
    }
}