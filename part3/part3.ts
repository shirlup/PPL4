/*
 * From Mozilla Developer Network:
 * The Promise.race(promises) method returns a promise that resolves or rejects
 * as soon as one of the promises in the array resolves or rejects,
 * with the value or reason from that promise.
 */
import {isArray} from "util";

export function race(promises) {
       return new Promise((res, rej) => {
            promises.forEach(p => p.then(res).catch(rej));
        });
}

/*
 * Write a function that takes an arbitrarily
 * nested array and generates the sequence
 * of values from the array.
 * Example: [...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])] => [1, 2, 3, 4, 5, 6, 7, 8]
 */
export function* flatten(array) {
    while(array.length!=0) {
        if (!isArray(array[0])) {
            yield(array[0]);
            array = array.slice(1);
        }
        else
            array = [].concat(array[0],array.slice(1));
    }

}
/*
 * Given two generators, write a function
 * that generates the interleaved sequence
 * of elements of both generators.
 * Example: given generators for even and odd
 * numbers, take(interleave(evens(), odds()), 8) => [0, 1, 2, 3, 4, 5, 6, 7]
 */
export function* interleave(g1, g2) {
    while(true){
        const value= g1.next().value;
        const value2 = g2.next().value;
        if(value==undefined && value2 == undefined)
            break;
        if(value != undefined)
            yield(value);
        if(value2 != undefined)
            yield(value2);


    }

}

/*
 * Write a function that continuously generates
 * elements of a given array in a cyclic manner.
 * Example: take(cycle([1, 2, 3]), 8) => [1, 2, 3, 1, 2, 3, 1, 2]
 */
export function* cycle(array) {
    let n = 0
    while(true){
        yield(array[n]);
        n++;
        if(n == array.length)
            n = 0;
    }
}

/*
 * Write a function that returns
 * all elements from the first array,
 * then all elements from the next array, etc.
 * This function lets us to treat an array of arrays
 * as a single collection.
 * Example: [...chain([['A', 'B'], ['C', 'D']])] => ['A', 'B', 'C', 'D']
 */
export function* chain(arrays) {
    let n = 0;
    while(n<arrays.length){
        let r = 0;
        while(r<arrays[n].length){
            yield(arrays[n][r]);
            r++;
        }
        n++;
    }

}

/*
 * In order to make testing your generators easier,
 * the function take takes a generator g and a natural number n
 * and returns an array of the first n elements of g.
 * If g is exhausted before reaching n elements,
 * less than n elements are returned. 
 */
export function take(g, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const { value, done } = g.next();
        if (done) {
            break;
        }
        result.push(value);
    }
    return result;
}
