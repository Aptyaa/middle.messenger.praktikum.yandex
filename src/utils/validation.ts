/* eslint-disable no-extra-semi */
import store from './Store'

export function validation(name: string, value: string) {
  let regexp
  switch (name) {
    case 'first_name':
    case 'second_name': {
      regexp = /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/
      break
    }

    case 'login': {
      regexp = /^[a-zA-Z0-9_-]{3,20}$/
      break
    }
    case 'email': {
      regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      break
    }
    case 'password':
    case 'old_password': {
      regexp = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/
      break
    }
    case 'phone': {
      regexp = /^\+?\d{10,15}$/
      break
    }
    case 'message': {
      regexp = /.+/
      break
    }
    default:
      return true
  }
  return regexp?.test(value)
}

export function blurValidation(e: any) {
  if (e.target.tagName === 'INPUT') {
    if (validation(e.target.name, e.target.value)) {
      e.target.classList.remove('not_valid')
      if (e.target.parentNode.querySelector('.error_message'))
        e.target.parentNode.querySelector('.error_message').remove()

      e.target.classList.add('valid')
    } else {
      const span = document.createElement('span')
      span.className = 'error_message'
      span.textContent = 'Некорректное значение'
      if (!e.target.parentNode.querySelector('.error_message'))
        e.target.after(span)

      e.target.classList.add('not_valid')
    }
  }
}

export function submitValidation(e: any) {
  if (e.target.tagName === 'FORM') {
    e.preventDefault()
    const formData = new FormData(e.target)
    let flag: boolean = true
    for (let [name, value] of formData) {
      if (!validation(name, value.toString())) flag = false
    }
    if (flag) {
      const passwords = document.querySelectorAll('[name=password]')
      if (
        passwords.length > 1 &&
        (passwords[0] as HTMLInputElement).value !=
          (passwords[1] as HTMLInputElement).value
      ) {
        ;(passwords[1] as HTMLInputElement).classList.add('not_valid')
        console.log('Пароли не совпадают!')
        return
      }
      let objResult = {}
      for (let [name, value] of formData) {
        objResult = { ...objResult, [name]: value }
      }
      e.target.reset()
      store.set('info', objResult)
      console.log(objResult)
      return flag
    } else console.log('Данные не корректны')
  }
}
