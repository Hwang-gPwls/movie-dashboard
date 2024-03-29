import { fetchAccessToken, getReauestToken } from "../../api/movie";

const pollingAccessToken = (reqToken: string) => {
  return new Promise((resolve, reject) => {
    window.open(
      `https://www.themoviedb.org/auth/access?request_token=${reqToken}`,
      "_blank",
    );

    let accessToken;
    const interval = setInterval(async () => {
      accessToken = await fetchAccessToken(reqToken);

      if (accessToken) {
        resolve(accessToken);
        clearInterval(interval);
      }
    }, 6000);
  });
};

export async function getAccessToken() {
  debugger;
  try {
    const reqToken = await getReauestToken().catch((err: Error) => {
      throw new Error(`fetchAccessToken call failed. error: ${err}`);
    });

    if (reqToken) {
      return await pollingAccessToken(reqToken);
    }
  } catch (err: unknown) {
    console.error(err);
    alert("error 발생 :D");
  }
}
