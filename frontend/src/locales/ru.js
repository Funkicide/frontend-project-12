const ru = {
  translation: {
    modals: {
      add: {
        header: 'Добавить канал',
        confirmButton: 'Отправить',
        cancelButton: 'Отмена',
        loadingStatus: 'Отправка...',
        formLabel: 'Имя канала',
        toast: 'Канал создан',
      },
      remove: {
        header: 'Удалить канал',
        body: 'Уверены?',
        confirmButton: 'Удалить',
        cancelButton: 'Отмена',
        loadingStatus: 'Удаление...',
        toast: 'Канал удалён',
      },
      rename: {
        header: 'Переименовать канал',
        confirmButton: 'Отправить',
        cancelButton: 'Отмена',
        loadingStatus: 'Отправка...',
        formLabel: 'Имя канала',
        toast: 'Канал переименован',
      },
      validation: {
        requiredField: 'Обязательное поле',
        channelNameLength: 'От 3 до 20 символов',
        notUnique: 'Название канала должно быть уникальным',
      },
    },
    pages: {
      login: {
        header: 'Войти',
        confirmButton: 'Войти',
        usernameLabel: 'Ваш ник',
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
        footer: {
          loginHeader: 'Уже есть аккаунт?',
          loginLink: 'Войти',
        },
        validation: {
          requiredField: 'Обязательное поле',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'Не менее 6 символов',
          confirmPassword: 'Пароли должны совпадать',
          userExists: 'Такой пользователь уже существует',
        },
      },
      error: {
        errorMessage: 'Упс, произошла ошибка!',
        notExist: 'Такой страницы не существует.',
      },
    },
    components: {
      channelButton: {
        renameButton: 'Переименовать',
        deleteButton: 'Удалить',
        dropdownToggleLabel: 'Управление каналом',
      },
      chat: {
        header: 'Каналы',
        messages: {
          message_zero: '{{count}} сообщений',
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        addChannelButton: '+',
        messageFormPlaceholder: 'Ваше сообщение...',
        messageFormAriaLabel: 'Новое сообщение',
        confirmButton: 'Отправить',
        toast: 'Ошибка соединения.',
        spinner: 'Идёт загрузка...',
      },
      header: {
        brandLink: 'Hexlet Chat',
        logOutButton: 'Выйти',
      },
    },
  },
};

export default ru;
