import { useState } from 'react'
import './TerminalApp.css'

const TerminalApp = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    'Last login: Thu Jan 25 10:30:45 on ttys000',
    'user@macbook ~ % '
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newHistory = [...history, `user@macbook ~ % ${input}`]
    
    // Simple command responses
    if (input === 'ls') {
      newHistory.push('Applications  Desktop  Documents  Downloads  Pictures')
    } else if (input === 'pwd') {
      newHistory.push('/Users/user')
    } else if (input.startsWith('echo ')) {
      newHistory.push(input.slice(5))
    } else if (input === 'clear') {
      setHistory(['user@macbook ~ % '])
      setInput('')
      return
    } else {
      newHistory.push(`command not found: ${input}`)
    }
    
    newHistory.push('user@macbook ~ % ')
    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className="terminal-app">
      <div className="terminal-content">
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}

export default TerminalApp