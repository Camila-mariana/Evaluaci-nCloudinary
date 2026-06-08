const Controllerlogout = {};

Controllerlogout.logout = async (req, res) => {
  res.clearCookie = "authCookie";
  return res.status(200).json("sesion cerrada");
};

export default Controllerlogout;
