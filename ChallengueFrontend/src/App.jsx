import { AppRouter } from './router/AppRouter'
import { ProvideDarkTheme } from './components/provideDarkTheme'
function App() {
  return (
    <ProvideDarkTheme>
      <AppRouter />
    </ProvideDarkTheme>
  )
}

export default App
