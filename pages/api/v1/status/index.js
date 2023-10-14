function status(request, response) {
  response.status(200).json({status: "A API está rodando..."});

}

export default status