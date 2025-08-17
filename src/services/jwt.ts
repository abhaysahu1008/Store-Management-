import jwt from "jsonwebtoken";

type Payload = {
  id: string
}

export function signToken(data: Payload) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });
  return token;
}

export function verifyToken(token: string) {

  try {

    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data as Payload;

  } catch (error) {
    return null;
  }
}
