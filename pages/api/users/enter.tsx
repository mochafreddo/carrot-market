import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const user = email ? { email } : { phone: +phone };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
            name: "Anonymous",
          },
        },
      },
    },
  });
  console.log(token);
  /* if (email) {
    user = await client.user.findUnique({ where: { email } });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({ data: { email, name: "Anonymous" } });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({ where: { phone: +phone } });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: { name: "Anonymous", phone: +phone },
      });
    }
    console.log(user);
  } */
  return res.status(200).end();
}

export default withHandler("POST", handler);
