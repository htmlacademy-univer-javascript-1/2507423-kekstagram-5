/* eslint-disable no-useless-catch */
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

/**
 * @returns {Promise<any>} Промис с данными.
 */
const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Отправка данных на сервер.
 * @param {Object} data - Данные для отправки.
 * @returns {Promise<Response>} Промис с ответом сервера.
 */
const sendData = async (data) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export { fetchData, sendData };
