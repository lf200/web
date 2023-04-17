//获取验证码登录和密码登录和注册
const change = document.querySelector('.change')
const changediv = change.querySelectorAll('div')
const register = changediv[0].querySelector('a')
//获取输入框
const registerphone = document.querySelector('.registerphone')
const registerphoneinput = document.querySelector('#registerphone')
const registeremail = document.querySelector('#email')
const username = document.querySelector('.username')
const usernameinput = document.querySelector('#username')
const registerpassword = document.querySelector('#registerpassword')
// 获取注册按钮
const registerbtn = document.querySelector('#register')
//获取响应更改样式
const alreadyphone = document.querySelector('.alreadyphone')
const noemail = document.querySelector('.noemail')
const nophone = document.querySelector('.nophone')
const nomima = document.querySelector('.nomima')
const alreadyusername = document.querySelector('.alreadyusername')

let currentduanxin = 0
let duanxinflag = 1
//注册按钮
registerbtn.addEventListener('click', (e) => {
  const phonenumber = parseInt(registerphoneinput.value.trim())
  if (duanxinflag) {
    duanxinflag = 0
    let timer = 180
    let formdata = new FormData()
    formdata.append('phonenumber', phonenumber)
    fetch('http://43.136.232.175:3920/api/getcode', {
      method: 'post',
      body: formdata,
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setTimeout(function duanxinfn() {
            timer--
            duanxin.innerHTML = timer + '秒后可重发'
            if (timer == 0) {
              duanxin.innerHTML = '发送短信验证码'
              duanxinflag = 1
              return
            }
            setTimeout(duanxinfn, 1000)
          }, 1000)
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
    e.preventDefault()
    //获取用户名
    const username = usernameinput.value.trim()
    //获取邮箱
    const email = registeremail.value.trim()
    //获取密码
    const password = registerpassword.value.trim()
    //获取验证码
    const code = registerma.value
    console.log(phonenumber, username, email, password, code)
    let formdata = new FormData()
    formdata.append('code', code)
    formdata.append('email', email)
    formdata.append('phonenumber', phonenumber)
    formdata.append('username', username)
    formdata.append('password', password)
    fetch('http://43.136.232.175:3920/api/register', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          alert('注册成功')
        } else {
          //手机号已存在
          if (res.message == 'phonenumber already exist~') {
            alreadyphone.style.display = 'block'
            registerphoneinput.addEventListener('focus', () => {
              alreadyphone.style.display = 'none'
            })
          } else if (res.message == 'user already exist~') {
            alreadyusername.style.display = 'block'
            usernameinput.addEventListener('focus', () => {
              alreadyusername.style.display = 'none'
            })
          }
          //验证码错误
          else {
            falseyanzhengma.style.display = 'block'
            registerma.addEventListener('focus', () => {
              falseyanzhengma.style.display = 'none'
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })

if (localStorage.getItem('token')) {
  window.location.href = 'home.html'
} 