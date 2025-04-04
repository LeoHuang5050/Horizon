import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Home from './components/Home'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/horizon" replace />} />
          <Route path="/horizon" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App 