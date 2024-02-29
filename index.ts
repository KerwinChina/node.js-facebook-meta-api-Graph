import * as dotenv from "dotenv";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const baseUrl = "https://graph.facebook.com/v19.0/me";

const params = {
  fields: "id,name,email",
};
dotenv.config();

interface FacebookUserData {
  id: string;
  name: string;
  last_name: string;
}

console.info(process.env.FACEBOOK_ACCESS_TOKEN);
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

let retryAfter = 0; // Stores the retry delay from the last error

async function makeApiCall(endpoint: string, params: object): Promise<any> {
  let retryCount = 0;
  const maxRetries = 5;
  const backoffFactor = 2;

  try {
    const response = await axios.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    retryAfter = 0;
    return response.data;
  } catch (error) {
    let itemData = error.response.data;
    console.info(itemData.error);
    if (
      itemData.error &&
      (itemData.error.code === 190 ||
        itemData.error.code === 4 ||
        itemData.error.code === 17 ||
        itemData.error.code === 613 ||
        error.response.status === 429)
    ) {
      // Handle rate limiting or other relevant errors (e.g., 429)
      console.log("\u26A1 API Meet " + itemData.error.message);
      retryCount++;
      if (retryCount <= maxRetries) {
        retryAfter = Math.pow(backoffFactor, retryCount - 1) * 1000;
        console.log(
          `API rate limit reached. Retrying after ${retryAfter} seconds...`
        );
      } else {
        console.error("Maximum number of retries exceeded");
      }
    } else {
      // Log other errors and consider handling them differently
      console.error(error.response);
    }
  }

  return new Promise((resolve) => setTimeout(resolve, retryAfter));
}

async function run() {
  while (true) {
    const responsePromise = makeApiCall(baseUrl, params);

    await responsePromise;

    if (responsePromise.then) {
      const data = await responsePromise;
      if (data) {
        console.log(data);
      }
    }

    await delay(2000);
  }
}

run();
