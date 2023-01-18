export const sendNotification = async (data: string) =>
  fetch('/api/notification', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
