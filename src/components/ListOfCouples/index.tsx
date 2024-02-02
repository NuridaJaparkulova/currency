import { useEffect, useState } from 'react'
import { ICurrency } from '../../types'
import { RootStore } from '../../store'
import { observer } from 'mobx-react-lite'
import style from './ListOfCouples.module.scss'

const storeData = new RootStore()
const storeRates = new RootStore()

export const ListOfCouples = observer(() => {
	const [baseCurrency, setBaseCurrency] = useState('RUB')
	const [exchangeRates, setExchangeRates] = useState<any>({})

	const filteredCurrencies = Object.values(storeData.data)
	const ratesCurrencies = Object.entries(storeRates.data)
	useEffect(() => {
		storeData.fetchData()
		storeRates.fetchRates()
	}, [])

	useEffect(() => {
		const calculateExchangeRates = () => {
			const rates: any = {}
			filteredCurrencies.forEach((currency: ICurrency) => {
				rates[currency.CharCode] = 1 / currency.Value
			})
			setExchangeRates(rates)
		}
		calculateExchangeRates()
	}, [filteredCurrencies])

	return (
		<div className={style.listFlex}>
			<ul>
				{ratesCurrencies.map(([name, value]) => (
					<li key={name}>
						{`1  ${name}  - ${(1 / value).toFixed(3)} ${baseCurrency}`}
					</li>
				))}
			</ul>
			<ul>
				{ratesCurrencies.map(([key, value]) => (
					<li key={key}>
						{`1  ${baseCurrency}  - ${(+value).toFixed(4)} ${key}`}
					</li>
				))}
			</ul>
		</div>
	)
})
