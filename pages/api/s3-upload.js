import { APIRoute } from "next-s3-upload";
import { getSession } from "next-auth/react";

export default APIRoute.configure({
  async key(req, filename) {
    const session = await getSession();

    console.log(session);

    return `rin_assets/${filename}`;
  },
});
