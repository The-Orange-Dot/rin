import { APIRoute } from "next-s3-upload";
import { getSession } from "next-auth/react";

export default APIRoute.configure({
  key(req, filename) {
    return `rin_assets/${filename}`;
  },
});
