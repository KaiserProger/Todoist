export class FilterChain {
    filterChain: ((value: any) => boolean)[];
    constructor() { this.filterChain = []; }
    applyFilter(filter: ((value: any) => boolean)){
        this.filterChain.push(filter);
    }
    process<Type>(value: Array<Type>): Array<Type>{
        let result = value;
        this.filterChain.forEach((valueIn) => {
            result = result.filter(valueIn);
        })
        return result;
    }
}
