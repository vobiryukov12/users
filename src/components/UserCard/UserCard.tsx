import { useRef, useState } from 'react'
import cn from 'classnames'

import { IUser } from '@/models'
import { Icon } from '@/components'
import { truncateString } from '@/utils'
import { useClickOutside } from '@/hooks'

import styles from './UserCard.module.scss'

/**
 * Компонент карточки пользователя
 * @param name - ФИО
 * @param username - имя пользователя
 * @param email - электронная почта
 * @param phone - номер телефона
 * @param website - веб-сайт
 * @param address - информация про адрес
 * @param company - информация о компании
 */

export function UserCard({
  name,
  username,
  email,
  phone,
  website,
  address,
  company,
}: IUser) {
  const [isVisible, setIsVisible] = useState(false)

  const cardRef = useRef(null)

  useClickOutside(
    cardRef,
    () => {
      setIsVisible(false)
      document.body.classList.remove(styles.darkBackground)
    },
    isVisible
  )

  function handleClick() {
    !isVisible
      ? document.body.classList.add(styles.darkBackground)
      : document.body.classList.remove(styles.darkBackground)
    setIsVisible((prev) => !prev)
  }

  const [firstName, lastName] = name.split(' ')

  return (
    <div
      className={cn(styles.userCard, {
        [styles['userCard--active']]: isVisible,
      })}
      onClick={handleClick}
      ref={cardRef}
    >
      <div className={styles.userCard__header}>
        <div className={styles.userCard__avatar}>
          {firstName[0] + lastName[0]}
        </div>
        <div>
          <div className={styles.userCard__name}>
            {truncateString(name, 25)}
          </div>
          <div className={styles.userCard__username}>{username}</div>
        </div>
      </div>
      <ul className={styles.userCard__body}>
        <li className={styles.userCard__listItem}>
          <Icon className={styles.userCard__icon} icon="Email" />
          <span>email: {email}</span>
        </li>
        <li className={styles.userCard__listItem}>
          <Icon className={styles.userCard__icon} icon="Website" />
          <span>website: {website}</span>
        </li>
        <li className={styles.userCard__listItem}>
          <Icon className={styles.userCard__icon} icon="Phone" />
          <span>phone: {phone}</span>
        </li>

        {isVisible && (
          <div
            className={cn(styles.userCard__additionalInfo, {
              [styles.visible]: isVisible,
            })}
          >
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="Street" />
              <span>street: {address.street}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="Suite" />
              <span>suite: {address.suite}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="City" />
              <span>city: {address.city}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="Zipcode" />
              <span>zipcode: {address.zipcode}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="Company" />
              <span>name company: {company.name}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="CatchPhrase" />
              <span>catchPhrase: {company.catchPhrase}</span>
            </li>
            <li className={styles.userCard__listItem}>
              <Icon className={styles.userCard__icon} icon="Bs" />
              <span>bs: {company.bs}</span>
            </li>
          </div>
        )}
      </ul>
    </div>
  )
}
