const notFoundMiddleware = (req, res) => {
  res.status(404).send("route does not exists");
};

export default notFoundMiddleware;
