global.API_URL = 'http://localhost:8888'
global.APP_ID = 'FFnN2hso42Wego3pWq4X5qlu'
global.APP_KEY = 'UtOCzqb67d3sN12Kts4URwy8'

const api_url = 'http://localhost:8888/'
const app_id = 'FFnN2hso42Wego3pWq4X5qlu'
const app_key = 'UtOCzqb67d3sN12Kts4URwy8'
const app_sign = 'd5bcbb897e19b2f6633c716dfdfaf9be,1453014943466'

const api_users = api_url + 'users'
const api_tags = api_url + 'tags'
const api_links = api_url + 'links'

// 用户登录 POST
const api_user_login = api_url + 'login'


export default {
    api_url,
    app_id,
    app_key,
    app_sign,

    api_users,
    api_links,
    api_user_login
}
