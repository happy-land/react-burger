export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const checkSuccess = (data) => {
  return data.success ? data.data : Promise.reject('Error data');
}