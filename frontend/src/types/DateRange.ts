export class DateRange {
    fromTime: number;
    toTime: number;
    constructor(from: Date, to: Date) {
        this.fromTime = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
        this.toTime = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1).getTime();
    }
    calcDiffer(): Date {
        return new Date(this.toTime - this.fromTime);
    }
    isInRange(date: Date): boolean{
        let dateTime = date.getTime();
        return this.fromTime <= dateTime && this.toTime >= dateTime;
    }
}
