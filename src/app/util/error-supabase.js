const error = (message) => {
  console.log("message", message);
  switch (message) {
    case "User already registered":
      return "El email ya esta en uso";
    case 'duplicate key value violates unique constraint "users_user_key"':
      return "El nombre de usuario ya existe";
    case "Email not confirmed":
      return "Debe confirmar el email";
    default:
      return "Hubo un error";
  }
};

export default error;
