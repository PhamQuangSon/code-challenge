// Method 1: Using a for loop
// Time Complexity: (O(n))
// Iterates through each number from 1 to n, making it less efficient for large values of n.
function sumToN_a(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Method 2: Using a mathematical formula
// This method is the most efficient for performance as it computes the sum in constant time O(1).
// Best choose - It demonstrates the use of mathematical formulas for efficient computation.
function sumToN_b(n) {
    return n * (n + 1) / 2;
}

// Method 3: Using recursion (not recommended due to inefficiency)
// Time Complexity: (O(n))
// Involves multiple function calls, leading to higher overhead and inefficiency for large values of n.
function sumToN_c(n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sumToN_c(n - 1);
    }
}

// Example usage:
const n = 10;
console.log(`The sum of numbers from 1 to ${n} is ${sumToN_a(n)}`);
console.log(`The sum of numbers from 1 to ${n} is ${sumToN_b(n)}`);
console.log(`The sum of numbers from 1 to ${n} is ${sumToN_c(n)}`);

// Test cases
function runTests() {
    const testCases = [
        { input: 1, expected: 1 },
        { input: 5, expected: 15 },
        { input: 10, expected: 55 },
        { input: 100, expected: 5050 },
    ];

    testCases.forEach(({ input, expected }) => {
        console.assert(sumToN_a(input) === expected, `sumToN_a(${input}) should be ${expected}`);
        console.assert(sumToN_b(input) === expected, `sumToN_b(${input}) should be ${expected}`);
        console.assert(sumToN_c(input) === expected, `sumToN_c(${input}) should be ${expected}`);
    });

    console.log("All tests passed!");
}

runTests();