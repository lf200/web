//获取验证码登录和密码登录和注册
const change = document.querySelector('.change')
const changediv = change.querySelectorAll('div')
const mimalogin = changediv[0].querySelector('a')
//获取输入框
const ID = document.querySelector('#Id')
const passwords = document.querySelector('#password')
//获取登录按钮
const login = document.querySelector('#login')
//获取响应更改样式
const noemail = document.querySelector('.noemail')
const nophone = document.querySelector('.nophone')
const nomima = document.querySelector('.nomima')
login.addEventListener('click', (e) => {
  e.preventDefault()
  // 获取内容
  const Id = ID.value.trim()
  const password = passwords.value.trim()
  let reg = /@qq.com$/
  console.log(reg.test(Id))
  //邮箱
  if (reg.test(Id)) {
    const email = Id
    let formdata = new FormData()
    formdata.append('email', email)
    formdata.append('password', password)
    fetch('http://43.136.232.175:3920/api/emaillogin', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.username)
          window.location.href = 'home.html'
        } else {
          if (res.message == "Email doesn't exists") {
            noemail.style.display = 'block'
            ID.addEventListener('focus', () => {
              noemail.style.display = 'none'
            })
          } else {
            nomima.style.display = 'block'
            passwords.addEventListener('focus', () => {
              nomima.style.display = 'none'
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    //手机号
  } else {
    const phonenumber = parseInt(Id)
    let formdata = new FormData()
    formdata.append('phonenumber', phonenumber)
    formdata.append('password', password)
    fetch('http://43.136.232.175:3920/api/phonepasswordlogin', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.username)
          window.location.href = 'home.html'
        } else {
          if (res.message == "PhoneNumber doesn't exists~") {
            nophone.style.display = 'block'
            ID.addEventListener('focus', () => {
              nophone.style.display = 'none'
            })
          } else {
            nomima.style.display = 'block'
            passwords.addEventListener('focus', () => {
              nomima.style.display = 'none'
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
