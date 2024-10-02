export const jwtConstants = {
  secret: 'yourSecretKey',
  expiredTime: '60m',
};

export const zodiacSigns = [
  { name: '♒ Aquarius', start: '01-20', end: '02-18' },
  { name: '♓ Pisces', start: '02-19', end: '03-20' },
  { name: '♈ Aries', start: '03-21', end: '04-19' },
  { name: '♉ Taurus', start: '04-20', end: '05-20' },
  { name: '♊ Gemini', start: '05-21', end: '06-21' },
  { name: '♋ Cancer', start: '06-22', end: '07-22' },
  { name: '♌ Leo', start: '07-23', end: '08-22' },
  { name: '♍ Virgo', start: '08-23', end: '09-22' },
  { name: '♎ Libra', start: '09-23', end: '10-23' },
  { name: '♏ Scorpio', start: '10-24', end: '11-21' },
  { name: '♐ Sagittarius', start: '11-22', end: '12-21' },
  { name: '♑ Capricorn', start: '12-22', end: '01-19' },
];

export const horoscopeYears = [
  { year: 'Rabbit', start: '2023-01-22', end: '2024-02-09' },
  { year: 'Tiger', start: '2022-02-01', end: '2023-01-21' },
  { year: 'Ox', start: '2021-02-12', end: '2022-01-31' },
  { year: 'Rat', start: '2020-01-25', end: '2021-02-11' },
  { year: 'Pig', start: '2019-02-05', end: '2020-01-24' },
  { year: 'Dog', start: '2018-02-16', end: '2019-02-04' },
  { year: 'Rooster', start: '2017-01-28', end: '2018-02-15' },
  { year: 'Monkey', start: '2016-02-08', end: '2017-01-27' },
  { year: 'Goat', start: '2015-02-19', end: '2016-02-07' },
  { year: 'Horse', start: '2014-01-31', end: '2015-02-18' },
  { year: 'Snake', start: '2013-02-10', end: '2014-01-30' },
  { year: 'Dragon', start: '2012-01-23', end: '2013-02-09' },
  { year: 'Rabbit', start: '2011-02-03', end: '2012-01-22' },
  { year: 'Tiger', start: '2010-02-14', end: '2011-02-02' },
  { year: 'Ox', start: '2009-01-26', end: '2010-02-13' },
  { year: 'Rat', start: '2008-02-07', end: '2009-01-25' },
  { year: 'Pig', start: '2007-02-18', end: '2008-02-06' },
  { year: 'Dog', start: '2006-01-29', end: '2007-02-17' },
  { year: 'Rooster', start: '2005-02-09', end: '2006-01-28' },
  { year: 'Monkey', start: '2004-01-22', end: '2005-02-08' },
  { year: 'Goat', start: '2003-02-01', end: '2004-01-21' },
  { year: 'Horse', start: '2002-02-12', end: '2003-01-31' },
  { year: 'Snake', start: '2001-01-24', end: '2002-02-11' },
  { year: 'Dragon', start: '2000-02-05', end: '2001-01-23' },
];

export const RABBITMQ_CONFIG = {
  URLS: 'amqp://guest:guest@rabbitmq:5672',
  MESSAGE_SENT: 'message_sent',
  CHAT_SERVICE: 'CHAT_SERVICE',
  CHAT_QUEUE: 'chat_queue',
  CHAT_MESSAGE: 'chat_message',
  NOTIFICATION_SERVICE: 'NOTIFICATION_SERVICE',
  NOTIFICATION_QUEUE: 'notification_queue',
  SEND_NOTIFICATION: 'send_notification',
};

export const NOTIFICAITON_TYPE = {
  RECEIVE_MESSAGE: 'RECEIVED_MESSAGE',
  REQUEST_FRIEND: 'REQUEST_FRIEND',
};
