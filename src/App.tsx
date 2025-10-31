import './App.css'
import { UserProvider } from './context/user-context'
import ListUsers from './components/Pages/ListUsers'

function App() {
  return (
    
    <UserProvider>
      <ListUsers />
    </UserProvider>
  )
}

export default App
