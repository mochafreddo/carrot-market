import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = email ? { email } : { phone: +phone };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      ...payload,
      name: "Anonymous",
    },
    update: {},
  });
  console.log(user);
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
