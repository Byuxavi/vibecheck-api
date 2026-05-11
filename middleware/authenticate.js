const isAuthenticated = (req, res, next) => {
  // Passport añade automáticamente la función req.isAuthenticated()
  // También revisamos req.session.user por si acaso lo manejas así
  if (req.isAuthenticated() || req.session.user !== undefined) {
    return next();
  }
  
  // Si no hay ninguna forma de validar al usuario, lanzamos el 401
  return res.status(401).json("No tienes permiso. Por favor, inicia sesión.");
};

module.exports = { isAuthenticated };