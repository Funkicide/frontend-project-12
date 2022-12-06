const ru = {
  translation: {
    modals: {
      add: {
        header: 'Добавить канал',
        confirmButton: 'Отправить',
        cancelButton: 'Отмена',
      },
      remove: {
        header: 'Удалить канал',
        body: 'Уверены?',
        confirmButton: 'Удалить',
        cancelButton: 'Отмена',
      },
      rename: {
        header: 'Переименовать канал',
        confirmButton: 'Отправить',
        cancelButton: 'Отмена',
      },
      validation: {
        requiredField: 'Обязательное поле',
        notUnique: 'Название канала должно быть уникальным',
      },
    },
    pages: {
      login: {
        header: 'Войти',
        confirmButton: 'Отправить',
        usernameLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        footer: {
          signUpHeader: 'Нет аккаунта?',
          signUpLink: 'Регистрация',
        },
        validation: {
          requiredField: 'Обязательное поле',
          wrongCredentials: 'Неверные имя пользователя или пароль',
        },
      },
      signUp: {
        header: 'Регистрация',
        confirmButton: 'Зарегистрироваться',
        usernameLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        validation: {
          requiredField: 'Обязательное поле',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'От 6 символов',
          confirmPassword: 'Пароли должны совпадать',
          userExists: 'Такой пользователь уже существует',
        },
      },
    },
    components: {
      channelButton: {
        renameButton: 'Переименовать',
        deleteButton: 'Удалить',
      },
      chat: {
        header: 'Каналы',
        messages: {
          message_zero: '{{count}} сообщений',
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        confirmButton: 'Отправить',
      },
      header: {
        brandLink: 'Hexlet Chat',
        logOutButton: 'Выйти',
      },
    },
  },
};

export default ru;
