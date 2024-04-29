# users

### Ссылка на прототип:

[train-characteristics-vobiryukov12.vercel.app](https://users-vobiryukov12.vercel.app/)

```
node: 20.x
npm: 10.x
```

Установите зависимости:

```
npm install
```

Запуск:

```
npm run dev
```

## Описание

Мини-приложение на React для отображения и фильтрации пользователей на странице

### Технологии используемые на проекте:

[![Skills](https://skillicons.dev/icons?i=react,ts,redux,scss,vite)](https://skillicons.dev)

### В проекте используется:

- Данные пользователей из API
- Redux Toolkit для хранения состояния
- Vite для сборки
- Typescript
- JSDoc для документирования кода
- SCSS modules
- Линтеры ESLint, Stylelint и Prettier для форматирования кода
- Алиасы для более коротких и читаемых импортов

### Возможности приложения:

- При клике на выпадающий список select появляется список пользователей, а также становится активным поле для поиска
- Поиск и фильтрация работают по имени пользователя
- Можно выбрать несколько пользователей для фильтрации
- При клике на карточку пользователя отображается подробная информация о нем
- В списке пользователей выводятся только те, которые соответствуют параметрам фильтрации
- Кнопка "Clear all" позволяет очистить выбранные фильтры в select
- В интерфейсе отображается количество выбранных фильтров и имена пользователей