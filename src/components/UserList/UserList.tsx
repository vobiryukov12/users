import { useEffect, useState } from 'react'

import { UserCard } from '@/components'
import { useAppSelector } from '@/hooks'

import styles from './UserList.module.scss'

/**
 * Компонент списка карточек пользователя
 */

export function UserList() {
  const { users, filters } = useAppSelector((state) => state.users)
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    filters.length > 0
      ? setFilteredUsers(users.filter((item) => filters.includes(item.name)))
      : setFilteredUsers(users)
  }, [filters, users])

  return (
    filteredUsers?.length > 0 && (
      <ul className={styles.usersList}>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} {...user}></UserCard>
        ))}
      </ul>
    )
  )
}
