export function validation(name: string, value: string) {
  let regexp;
  switch (name) {
    case 'first_name':
    case 'second_name': {
      regexp = /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/;
      break;
    }

    case 'login': {
      regexp = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
      break;
    }
    case 'email': {
      regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      break;
    }
    case 'password':
    case 'repeatPassword':
    case 'oldPassword': {
      regexp = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
      break;
    }
    case 'phone': {
      regexp = /^\+?\d{10,15}$/;
      break;
    }
    case 'message': {
      regexp = /.+/;
      break;
    }
    default:
      return true;
  }
  return regexp?.test(value);
}

export function blurValidation(e: any) {
  if (validation(e.target.name, e.target.value)) {
    if (e.target.parentNode.querySelector('.error_message'))
      e.target.parentNode.querySelector('.error_message').remove();
  } else {
    const span = document.createElement('span');
    span.className = 'error_message';
    span.textContent = 'Некорректное значение';
    if (!e.target.parentNode.querySelector('.error_message'))
      e.target.after(span);
  }
}

export function submitValidation(data: Record<string, any>) {
  const dataToArr = Object.entries(data);
  let isValid = true;
  for (const [name, value] of dataToArr) {
    const input = document.querySelector(`[name='${name}']`);
    if (!validation(name, value)) {
      isValid = false;
      if (input?.nextElementSibling?.tagName !== 'SPAN') {
        const span = document.createElement('span');
        span.className = 'error_message';
        span.textContent = 'Некорректное значение';
        input?.after(span);
      }
    }
  }
  const inputRePass = document.querySelector(`[name='repeatPassword']`);
  if (
    inputRePass &&
    data.password !== data.repeatPassword &&
    inputRePass?.nextElementSibling?.tagName !== 'SPAN'
  ) {
    const span = document.createElement('span');
    span.className = 'error_message';
    span.textContent = 'Пароли не совпадают';
    inputRePass?.after(span);
    return false;
  }

  return isValid;
}
