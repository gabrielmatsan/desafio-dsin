import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "admin" | "customer") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    console.log("Verificando role:", roleToVerify);
    console.log("User object:", request.user);

    const { role } = request.user;
    console.log("Role do usuário:", role);

    if (role !== roleToVerify) {
      console.log("Role inválida:", role, "esperado:", roleToVerify);
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
