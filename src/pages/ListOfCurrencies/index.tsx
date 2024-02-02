import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStore } from '../../store'
import { ICurrency } from '../../types'
import { ListOfCouples } from '../../components/ListOfCouples'
import styles from './ListOfCurrencies.module.scss'
const storeData = new RootStore()
const storeDate = new RootStore()

const ListOfCurrencies = observer(() => {
	const [searchQuery, setSearchQuery] = useState('')

	const fetchDataWithFilter = () => {
		const filteredCurrencies = Object.values(storeData.data).filter(
			(currency: ICurrency) => {
				return (
					currency.CharCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
					currency.Name.toLowerCase().includes(searchQuery.toLowerCase())
				)
			}
		)
		return filteredCurrencies
	}

	const handleSearch = () => {
		fetchDataWithFilter()
	}
	useEffect(() => {
		storeData.fetchData()
		storeDate.fetchDate()
	}, [])
	return (
		<div className={`${styles.container} ${styles.list}`}>
			{storeData.isLoading && <p>Загрузка...</p>}
			{storeData.error && (
				<p className={styles.errorColor}> {storeData.error} </p>
			)}
			<h1>Курсы валют ЦБ РФ на {storeDate.data}</h1>
			<div className={styles.cardsElements}>
				<ListOfCouples />
				<div className={styles.cardsInput}>
					<input
						type='text'
						placeholder='Найдите'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button onClick={handleSearch}>Поиск</button>
				</div>
			</div>
			<div className={styles.cards}>
				<h3>Цифр. код:</h3>
				<h3>Букв. код:</h3>
				<h3>Единиц:</h3>
				<h3 className={styles.cardValue}>Валюта</h3>
				<h3 className={styles.cardValue}>Курс:</h3>
			</div>
			{fetchDataWithFilter().map((currency: ICurrency) => (
				<div key={currency.ID} className={styles.cards}>
					<p className={styles.card}> {currency.NumCode}</p>
					<p className={styles.card}>{currency.CharCode}</p>
					<p className={styles.card}> {currency.Nominal}</p>
					<p className={styles.cardValue}>{currency.Name}</p>
					<p className={styles.card}> {currency.Value}</p>
					<p
						className={`card-arrow ${
							currency.Value > currency.Previous ? 'up' : 'down'
						}`}
					>
						{currency.Value > currency.Previous
							? `▲ ${(currency.Value - currency.Previous).toFixed(3)}`
							: `▼ ${(currency.Previous - currency.Value).toFixed(3)}`}
					</p>
				</div>
			))}
		</div>
	)
})

export default ListOfCurrencies
