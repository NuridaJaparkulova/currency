import { RootStore } from '../../../../store'
import { ICurrency, IRates } from '../../../../types'
import styles from './ConverterBase.module.scss'
import { useEffect, useState } from 'react'
const storeData = new RootStore()
const storeRates = new RootStore()
const handleCurrencyChange = new RootStore()
const ConverterBase = () => {
	const fetchDataForChanges = Object.values(storeData.data)
	const fetchRatesForChanges = Object.entries(storeRates.data)
	const [rates, setRates] = useState<any>({})
	const [fromCurrencyValue, setFromCurrencyValue] = useState(0)
	const [fromCurrency, setFromCurrency] = useState<any>('')
	const [toCurrency, setToCurrency] = useState('')
	const [currentValute, setCurrentValute] = useState<any>('')
	const [result, setResult] = useState<number>(0)

	const handleCurrencyChange = (event: any) => {
		setToCurrency(event.target.value)
		const currData: any = fetchDataForChanges.find(
			(curr: ICurrency) => curr.CharCode === event.target.value
		)

		setCurrentValute(currData)
		setFromCurrency(currData.Value)
	}
	useEffect(() => {
		storeData.fetchData().then((data) => {
			setRates(data)
		})
		storeRates.fetchRates().then((data) => {
			setRates(data)
		})
	}, [])

	useEffect(() => {
		const calculatedResult = fromCurrencyValue / fromCurrency
		setResult(Number(calculatedResult.toFixed(3)))
	}, [fromCurrencyValue, currentValute, toCurrency])

	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.block}>
					<p className={styles.select}> RUB </p>
					<input
						type='number'
						className={styles.input}
						defaultValue={fromCurrencyValue}
						onChange={(e) => setFromCurrencyValue(Number(e.target.value))}
					/>
				</div>

				<div className={styles.block}>
					<select
						className={styles.select}
						value={toCurrency}
						onChange={handleCurrencyChange}
					>
						{fetchRatesForChanges.map(([name, value]) => (
							<option value={name}>{name}</option>
						))}
					</select>
					<input
						type='number'
						className={styles.input}
						disabled
						value={result}
						onChange={(event) => setResult(Number(event.target.value))}
					/>
				</div>
			</div>
		</div>
	)
}

export default ConverterBase
