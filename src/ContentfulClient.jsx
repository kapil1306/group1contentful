
import { createClient } from "contentful";

export default class ContentfulClient {
  getClient = async () => {
    const client = await createClient({
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiId = process.env.REACT_APP_API_SPACE_ID;
  });
  return client;
}
};
