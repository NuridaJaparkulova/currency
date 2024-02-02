import { useState } from 'react'
import ConverterBase from './components/ConverterBase'
import { GoArrowSwitch } from 'react-icons/go'
import styles from './Converter.module.scss'
import ConverterReverse from './components/ConverterReverse'

export const Converter = () => {
	
	const [button, setButton] = useState(true)

	const handleClickButton = () => {
		setButton(!button)
	}
	return (
		<div className={styles.converter}>
			<h1>Конвертер</h1>
			<button className={styles.button} onClick={handleClickButton}>
				<GoArrowSwitch className={styles.arrowButton} />
			</button>

			{button ? <ConverterBase /> : <ConverterReverse />}
		</div>
	)
}
