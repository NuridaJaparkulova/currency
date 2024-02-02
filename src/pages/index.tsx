import { Route, Routes } from 'react-router'
import ListOfCurrencies from './ListOfCurrencies'
import NoteFound from './NoteFound'
import { Converter } from './Coverter'

export const Routing = () => (
	<Routes>
		<Route path='/listOfCurrencies' element={<ListOfCurrencies   />} />
		<Route path='/converter' element={<Converter />} />
		<Route path='noteFound' element={<NoteFound />} />
	</Routes>
)
