/*
 * @Author: KerwinChina
 * @Date: 2024-02-29 10:55:36
 * @LastEditTime: 2024-02-29 11:15:20
 * @LastEditors: KerwinChina
 * @Description: talk is cheap, show me the code
 * @FilePath: \node.js-facebook-meta-api-Graph\index.ts
 */
import * as dotenv from "dotenv";
const axios = require("axios");

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
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate limiting with exponential backoff
      retryCount++;
      if (retryCount <= maxRetries) {
        const retryAfter = Math.pow(backoffFactor, retryCount - 1) * 1000;
        console.log(
          `API rate limit reached. Retrying after ${retryAfter} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return makeApiCall(endpoint, params); // Retry the request with exponential backoff
      } else {
        throw new Error("Maximum number of retries exceeded");
      }
    } else {
      throw error;
    }
  }
}
async function run() {
  while (true) {
    const data = await makeApiCall(baseUrl, params);
    if (data) {
      console.log(data);
    }
    await delay(2000); // Delay for 2 seconds
  }
}

run();
