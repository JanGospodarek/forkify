import { async } from 'regenerator-runtime';
import { TIMEOUT } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, dataUpload = undefined) {
  try {
    const promise = dataUpload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUpload),
        })
      : fetch(url);
    // console.log(fetch(url));
    const res = await Promise.race([promise, timeout(TIMEOUT)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
