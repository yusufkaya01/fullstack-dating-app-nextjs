import "server-only";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "@/utils/db";

const SECRET = process.env.SECRET as string;

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET);
  return token;
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string };

  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });

  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!match) throw new Error("invalid user");

  const correctPW = await comparePW(password, match.password);

  if (!correctPW) {
    throw new Error("invalid credentials");
  }

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;

  return { user, token };
};

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const hashedPW = await hashPW(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPW,
      firstName,
      lastName,
    },
  });

  const token = createTokenForUser(user.id);

  await prisma.member.create({
    data: {
      userId: user.id,
      firstName,
      lastName,
    },
  });

  return { user, token };
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};
