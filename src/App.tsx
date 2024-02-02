import './App.css'
import Header from './components/Header'
import { Routing } from './pages'
import { ICurrencyData } from './types'
function App() {
	const obj = {} as ICurrencyData

	return (
		<div className='App'>
			<Header />
			<Routing />
		</div>
	)
}

export default App
