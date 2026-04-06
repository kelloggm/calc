const { evaluate } = require('mathjs');

/**
 * Calculates the value of a mathematical expression.
 * Handles +, -, *, /, %, etc.
 * @param {string} expression 
 * @returns {string}
 */
function calculate(expression) {
    if (!expression) return "0";
    try {
        // Pre-process expression for ÷ and x characters
        const processedExpression = expression
            .replace(/÷/g, '/')
            .replace(/x/g, '*')
            .replace(/%/g, '/100'); // % is often used as "divided by 100" or for modulo, 
                                    // in standard calculators like iPhone it means /100.
                                    // Given requirements, I'll treat it as /100.

        const result = evaluate(processedExpression);
        return result.toString();
    } catch (error) {
        console.error("Calculation Error:", error);
        return "Error";
    }
}

module.exports = { calculate };
