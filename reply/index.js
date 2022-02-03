const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { parse } = require("node-html-parser");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function [reply] processed a request.");

  const veriToken = req.query.veriToken;
  const authToken = req.query.authToken;
  const sessionID = req.query.sessionID;
  const boardID = req.query.boardID;
  const pid = req.query.pid;
  const replyContent = req.query.replyContent;
  const selection = req.query.selection;

  if (!veriToken || !authToken || !sessionID || !boardID || !pid) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing parameters",
      }),
    };
  }

  const postData = `boardid=${boardID}&topic=${pid}&replyto=0&isArchived=0&UserRating=${selection}&replyContent=${replyContent}&PostMessage=Post+Reply`;
  const response = await fetch(
    "https://iemb.hci.edu.sg/board/ProcessResponse",
    {
      method: "POST",
      body: postData,
      headers: {
        host: "iemb.hci.edu.sg",
        referer: `https://iemb.hci.edu.sg/Board/content/${pid}?board=${boardID}&isArchived=False`,
        origin: "https://iemb.hci.edu.sg",
        "content-type": "application/x-www-form-urlencoded",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
        "content-length": postData.length,
        cookie: `__RequestVerificationToken=${veriToken};ASP.NET_SessionId=${sessionID}; AuthenticationToken=${authToken};`,
      },
    }
  ).catch((err) => {
    context.log(err);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 501,
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
        message: "Failed to reply",
      }),
    };

  const iembHTML = parse(await response.text());
  //   check if we are stuck on the sign in page (i.e. needs a token refresh)
  const needsTokenRefresh = iembHTML.querySelector(".login-page");
  if (needsTokenRefresh) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 401,
      body: JSON.stringify({
        success: false,
        message: "Needs to refresh token",
      }),
    };
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
    body: JSON.stringify({
      success: true,
      message: "Successfully replied",
    }),
  };
};
