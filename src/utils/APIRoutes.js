const api_url = process.env.REACT_APP_API;
export const loginRoute = `${api_url}/api/auth/login`;
export const registerRoute = `${api_url}/api/auth/register`;
export const logoutRoute = `${api_url}/api/auth/logout`;
export const allUsersRoute = `${api_url}/api/auth/allusers`;
export const sendMessageRoute = `${api_url}/api/messages/addmsg`;
export const recieveMessageRoute = `${api_url}/api/messages/getmsg`;