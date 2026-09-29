# Чат для MAX на GREEN-API

Тестовое задание на позицию «Фронтенд-разработчик React» в GREEN-API: минимальный веб-чат для отправки и получения текстовых сообщений в мессенджере [MAX](https://green-api.com/max) через [HTTP API GREEN-API](https://green-api.com/v3/docs/).

## Демо

Видео демонстрация работы приложения: [docs/demo.mov](docs/demo.mov)

## Как пользоваться

1. Введите `apiUrl`, `idInstance` и `apiTokenInstance` своего инстанса GREEN-API
2. Введите номер получателя и нажмите «Создать чат»
3. Напишите сообщение и нажмите Enter (Shift+Enter — перенос строки)
4. Когда получатель ответит в MAX, ответ появится в этом же чате

## Запуск

Нужен любой из вариантов, каждый — одна команда.

### 1. Docker

```bash
docker compose up --build
```

Откройте [http://localhost:8080](http://localhost:8080/). Если порт занят: `PORT=3000 docker compose up --build`.

### 2. Node.js (22+)

```bash
npm install
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173/).

### 3. Сборка для продакшена

```bash
npm run build
```

Для продакшена используйте Docker с nginx.

## Где взять idInstance и apiTokenInstance

1. Зарегистрируйтесь в [личном кабинете GREEN-API](https://console.green-api.com/)
2. Создайте инстанс с тарифом MAX: Developer (бесплатный)
3. Авторизуйте инстанс: в приложении MAX откройте «Профиль → Устройства → Войти по QR-коду» и отсканируйте QR со страницы инстанса
4. Скопируйте со страницы инстанса `idInstance`, `apiTokenInstance` и `apiUrl`

## Что реализовано по пунктам задания

| Пункт задания | Где в коде |
|---------------|------------|
| Ввод `apiUrl`, `idInstance` и `apiTokenInstance` | [AuthForm.tsx](src/components/AuthForm/AuthForm.tsx) — проверка через `getStateInstance` |
| Ввод номера получателя и создание чата | [CreateChat.tsx](src/components/CreateChat/CreateChat.tsx) |
| Отправка текста — `SendMessage` | [Chat.tsx](src/components/Chat/Chat.tsx), [api.ts](src/api/api.ts), [MessageInput.tsx](src/components/MessageInput/MessageInput.tsx) |
| Получение — `ReceiveNotification` + `DeleteNotification` | [useChat.ts](src/hooks/useChat.ts) |
| Ответ собеседника виден в чате | [MessagesList.tsx](src/components/MessagesList/MessagesList.tsx) |
| React | React 19 + TypeScript + Vite + Mantine |

## Технологии

- React 19
- TypeScript
- Vite
- Mantine UI
- Docker + nginx для продакшена

## Дополнительные возможности

- Сохранение кредов в `localStorage`
- Автоскролл к новым сообщениям
- Адаптивная вёрстка
- Кнопка «Выйти»
- Docker-контейнер для продакшена
