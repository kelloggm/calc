import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("")

  const handleButtonClick = (value) => {
    setResult("") // Clear result when starting new expression
    setExpression((prev) => prev + value)
  }

  const handleClear = () => {
    setExpression("")
    setResult("")
  }

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1))
  }

  const handleToggleSign = () => {
    // Basic logic: if last part is a number, toggle its sign
    // For simplicity, we can just wrap the whole current expression or the last number
    if (!expression) return;
    
    const parts = expression.split(/([+\-x÷%])/);
    const lastPart = parts[parts.length - 1];
    
    if (lastPart && !isNaN(lastPart)) {
      if (lastPart.startsWith('-')) {
        parts[parts.length - 1] = lastPart.substring(1);
      } else {
        parts[parts.length - 1] = '-' + lastPart;
      }
      setExpression(parts.join(''));
    }
  }

  const handleCalculate = async () => {
    if (!expression) return;
    try {
      const response = await axios.post('http://localhost:5001/calculate', { expression });
      setResult(response.data.result);
      setExpression(response.data.result); // Update expression with result for chaining
    } catch (error) {
      console.error("Error calculating:", error);
      setResult("Error");
    }
  }

  const buttons = [
    'Clear', 'Backspace', '+/-', '÷',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '%', '='
  ];

  return (
    <div className="calculator-container">
      <div className="display">
        <div className="expression">{expression || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="button-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`btn ${isNaN(btn) && btn !== '.' ? 'operator' : ''} ${btn === '=' ? 'equals' : ''} ${['Clear', 'Backspace'].includes(btn) ? 'special' : ''}`}
            onClick={() => {
              if (btn === 'Clear') handleClear();
              else if (btn === 'Backspace') handleBackspace();
              else if (btn === '+/-') handleToggleSign();
              else if (btn === '=') handleCalculate();
              else handleButtonClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
