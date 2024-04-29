import cn from 'classnames'
import { ChangeEvent, useRef, useState } from 'react'

import { useClickOutside, useAppDispatch, useAppSelector } from '@/hooks'
import { setFilter, removeFilter, clearFilter } from '@/store/users.slice'
import { Icon } from '@/components'

import styles from './SortingByFilters.module.scss'

/**
 * Компонент фильтра, для хранения состояния используется глобальный стейт (redux)
 */

export function SortingByFilters() {
  const { users, filters } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [value, setValue] = useState('Select name')
  const [checked, setChecked] = useState(() =>
    users.reduce<{ [key: string]: boolean }>((acc, curr) => {
      acc[curr.name] = false
      return acc
    }, {})
  )
  const [filterNames, setFilterNames] = useState(users)

  const buttonRef = useRef<HTMLInputElement>(null)
  const handleIconClick = () => {
    setDropdownIsOpen((prev) => !prev)
    if (!dropdownIsOpen) {
      setValue('')
      setFilterNames(users)
      buttonRef.current && buttonRef.current.focus()
    } else {
      setValue('Select name')
      buttonRef.current && buttonRef.current.blur()
    }
  }

  const onClose = () => {
    setDropdownIsOpen(false)
    setValue('Select name')
  }
  const contentRef = useRef(null)
  useClickOutside(contentRef, onClose, dropdownIsOpen)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    !dropdownIsOpen && setDropdownIsOpen(true)

    setFilterNames(
      users.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  const handleButtonClick = () => {
    !dropdownIsOpen && setDropdownIsOpen((prev) => !prev)
    setValue('')
    setFilterNames(users)
  }

  const handleClearFilters = () => {
    dispatch(clearFilter())
    setChecked((prev) =>
      Object.keys(prev).reduce<{ [key: string]: boolean }>(
        (acc, curr) => ((acc[curr] = false), acc),
        {}
      )
    )

    setValue('Select name')
  }

  const handleCheckboxChange = (name: string) => {
    const updatedChecked = {
      ...checked,
      [name]: !checked[name],
    }

    if (updatedChecked[name]) {
      dispatch(
        setFilter({
          name: name,
        })
      )
    } else {
      dispatch(
        removeFilter({
          name: name,
        })
      )
    }

    setChecked(updatedChecked)
  }

  const buttonClassNames = cn(styles.filter__button, {
    [styles['filter__button--open']]: dropdownIsOpen,
  })

  const iconClassNames = cn(styles.filter__icon, {
    [styles['filter__icon--open']]: dropdownIsOpen,
  })

  return (
    <div className={styles.filter}>
      <div className={styles.filter__select} ref={contentRef}>
        <div className={styles['filter__input-container']}>
          <input
            ref={buttonRef}
            className={buttonClassNames}
            onChange={handleChange}
            onClick={handleButtonClick}
            aria-expanded={dropdownIsOpen}
            aria-controls="list"
            value={value}
            placeholder="Enter a name"
          ></input>
          <Icon
            className={iconClassNames}
            icon="Arrow"
            onClick={handleIconClick}
          />
        </div>
        {dropdownIsOpen && (
          <div className={styles.filter__dropdown}>
            {filterNames.map((item) => (
              <label className={styles.filter__item} key={item.id}>
                <span
                  className={styles.filter__checkboxField}
                  tabIndex={0}
                  role="checkbox"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCheckboxChange(item.name)
                    }
                  }}
                >
                  {checked[item.name] && <Icon icon="Checkbox" />}
                </span>
                <input
                  className={styles.filter__checkboxInput}
                  type="checkbox"
                  aria-hidden="true"
                  tabIndex={-1}
                  checked={checked[item.name]}
                  onChange={() => handleCheckboxChange(item.name)}
                />

                <span>{item.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className={styles.filter__wrapper}>
        <span className={styles.filter__count}>Filter: {filters.length}</span>
        {filters.length > 0 && (
          <button
            className={styles.filter__clearBtn}
            type="button"
            onClick={handleClearFilters}
            disabled={filters.length < 1}
          >
            Clear all
          </button>
        )}
      </div>
      {filters.length > 0 && (
        <div>
          Name :{' '}
          <span className={styles.filter__name}>{filters.join(', ')}</span>
        </div>
      )}
    </div>
  )
}
