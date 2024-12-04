export const privatepage = (req, res, next) => {
  if (!req.user?.id) {
    return res.status(301).redirect('/login')
  } else {
    next()
  }
}

export const privateAPI = (req, res, next) => {
  if (!req.user?.id) {
    return res.status(301).json({ error: 'user not found' })
  } else {
    next()
  }
}

export const redirectToDashboard = (req, res, next) => {
  if (req.user?.id) {
    console.log('there is a login session already ')
    return res.status(301).redirect('/dashboard')
  } else {
    next()
  }
}
