const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { parse } = require("node-html-parser");

module.exports = async function (context, req) {
  context.log(
    "Node.js HTTP trigger function processed a request. RequestUri=%s",
    req.originalUrl
  );

  if (req.method !== "POST") {
    context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      status: 200,
      body: JSON.stringify({
        success: false,
        message: "Please use POST method",
      }),
    };
    return;
  }

  const { veriTokenCookie, authToken, sessionID, attachment } = { ...req.body };

  if (!veriTokenCookie || !authToken || !sessionID || !attachment) {
    return (context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing parameters",
      }),
    });
  }

  const response = await fetch(`https://iemb.hci.edu.sg/${attachment.url}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      host: "iemb.hci.edu.sg",
      referer: `https://iemb.hci.edu.sg/Board/content/${attachment.fileID}?board=${attachment.boardID}&isArchived=False`,
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      cookie: `__RequestVerificationToken=${veriTokenCookie};.Mozilla%2f4.0+(compatible%3b+MSIE+6.1%3b+Windows+XP);ASP.NET_SessionId=${sessionID}; AuthenticationToken=${authToken};`,
    },
  });

  if (response.status != 200 || !response.headers.get("content-disposition")) {
    // parse the html
    const iembHTML = parse(await response.text());

    // check if we are stuck on the sign in page (i.e. needs a token refresh)
    const needsTokenRefresh = iembHTML.querySelector(".login-page");
    if (needsTokenRefresh) {
      return (context.res = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        status: 401,
        body: JSON.stringify({
          success: false,
          message: "Needs to refresh token",
        }),
      });
    } else {
      return (context.res = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
        body: JSON.stringify({
          success: false,
          message: "Failed to download file",
        }),
      });
    }
  }

  const blob = await response.blob();
  // https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer
  const blobArrayBuffer = await blob.arrayBuffer();
  const fileBuffer = Buffer.from(blobArrayBuffer);

  // https://stackoverflow.com/questions/56430526/best-way-to-send-zip-file-as-response-in-azure-functions-using-node
  context.res = {
    body: fileBuffer,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Disposition": response.headers.get("content-disposition"),
      "Content-Type": response.headers.get("content-type"),
    },
    status: 200,
  };
};
