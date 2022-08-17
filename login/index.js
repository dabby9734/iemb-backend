const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function [login] processed a request.");

  const username = req.query.username;
  const password = req.query.password;
  if (!username || !password) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing username and/or password",
      }),
    };
  }

  const response = await fetch("https://iemb.hci.edu.sg", {
    method: "GET",
  }).catch((err) => {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to fetch iemb.hci.edu.sg",
      }),
    };
  });

  if (response.status != 200)
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to fetch iemb.hci.edu.sg",
      }),
    };

  const VERI_TOKEN_COOKIE = response.headers
    .get("set-cookie")
    .match(/__RequestVerificationToken=(.+?);/)[1];

  const VERI_TOKEN = response.body
    .read()
    .toString()
    .match(/<input name=\"__RequestVerificationToken\" .+? value=\"(.+?)\"/)[1];

  const encoded_username = encodeURIComponent(username);
  const encoded_password = encodeURIComponent(password);
  const veriToken = encodeURIComponent(VERI_TOKEN);

  const postData = `UserName=${encoded_username}&Password=${encoded_password}&__RequestVerificationToken=${veriToken}&submitbut=Submit`;
  const loginResponse = await fetch("https://iemb.hci.edu.sg/home/logincheck", {
    method: "POST",
    headers: {
      host: "iemb.hci.edu.sg",
      referer: "https://iemb.hci.edu.sg/",
      origin: "https://iemb.hci.edu.sg",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      "content-length": postData.length,
      cookie: `__RequestVerificationToken=${VERI_TOKEN_COOKIE};.ASPXBrowserOverride=;`,
    },
    body: postData,
    redirect: "manual",
  }).catch((err) => {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to fetch iemb.hci.edu.sg",
      }),
    };
  });

  if (loginResponse.status != 302)
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to login",
      }),
    };

  if (
    !loginResponse.headers
      .get("set-cookie")
      .match(/ASP.NET_SessionId=(.+?);/) ||
    !loginResponse.headers.get("set-cookie").match(/AuthenticationToken=(.+?);/)
  ) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "Invalid username or password",
      }),
    };
  }

  const SESSION_ID = loginResponse.headers
    .get("set-cookie")
    .match(/ASP.NET_SessionId=(.+?);/)[1];
  const AUTH_TOKEN = loginResponse.headers
    .get("set-cookie")
    .match(/AuthenticationToken=(.+?);/)[1];

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
    body: JSON.stringify({
      success: true,
      VERI_TOKEN_COOKIE,
      SESSION_ID,
      AUTH_TOKEN,
    }),
  };
};
