import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const setActive = ({ isActive }: any) => (isActive ? 'active' : '')

const Header = () => {
	const [noteFound, setNoteFound] = useState<boolean>(false)
	return (
		<>
			<header className={styles.header}>
				<NavLink to='/listOfCurrencies' className={setActive}>
					Список валют
				</NavLink>
				<NavLink to='/converter' className={setActive}>
					Конвертер
				</NavLink>
				{noteFound && <Link to='/noteFound' />}
			</header>
		</>
	)
}

export default Header
