import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    //console.log("Headers:", request.headers); // Log para verificar se o token está sendo enviado
    await request.jwtVerify();
    //console.log("JWT verificado com sucesso:", request.user); // Log para verificar o payload do usuário
  } catch (err) {
    //console.error("Erro ao verificar JWT:", err);
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
