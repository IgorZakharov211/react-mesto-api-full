const authRequired = 'Необходима авторизация';
const serverError = 'На сервере произошла ошибка';
const invalidId = 'Невалидний id';

const minAbout = 'Минимальная длина поля "about" - 2';
const maxAbout = 'Максимальная длина поля "about" - 30';
const requiredAbout = 'Поле "about" обязательно для заполнения';

const minName = 'Минимальная длина поля "name" - 2';
const maxName = 'Максимальная длина поля "name" - 30';
const requiredName = 'Поле "name" обязательно для заполнения';

const invalidLink = 'Невалидная ссылка';

const invalidLength = 'Id неправильной длины';
const invalidHex = 'Id должен быть форматом Hex';
const incorrectUserId = 'Нет пользователя с таким id';
const incorrectCardId = 'Карточка с таким id не найдена';

const notFoundError = 'Запрашиваемый ресурс не найден';

const requiredEmail = 'Поле "Email" обязательно для заполнения';
const emptyEmail = 'Поле "email" не должно быть пустым';

const requiredPassword = 'Поле "password" обязательно для заполнения';
const emptyPassword = 'Поле "password" не должно быть пустым';

const conflictEmail = 'Такой Email уже существует';

const cantDeleteCard = 'Невозможно удалить чужую карточку';

const incorrectAuth = 'Неправильные почта или пароль';

module.exports = {
  authRequired,
  serverError,
  invalidId,
  minAbout,
  maxAbout,
  requiredAbout,
  minName,
  maxName,
  requiredName,
  invalidLink,
  invalidLength,
  invalidHex,
  notFoundError,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
  conflictEmail,
  incorrectUserId,
  incorrectCardId,
  cantDeleteCard,
  incorrectAuth,
};
