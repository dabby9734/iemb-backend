const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { parse } = require("node-html-parser");

module.exports = async function (context, req) {
  context.log(
    "JavaScript HTTP trigger function [getBoardArchived] processed a request."
  );

  const veriToken = req.query.veriToken;
  const authToken = req.query.authToken;
  const sessionID = req.query.sessionID;
  const boardID = req.query.boardID;
  const page = req.query.page ? req.query.page : 1;
  const sender = req.query.sender ? req.query.sender : "";
  const subject = req.query.subject ? req.query.subject : "";
  const content = req.query.content ? req.query.content : "";

  if (!veriToken || !authToken || !sessionID || !boardID) {
    context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing parameters",
      }),
    };
    return;
  }

  const postData = `id=${boardID}&page=${page}&postBy=${sender}&title=${subject}&content=${content}`;
  const response = await fetch(`https://iemb.hci.edu.sg/Board/ArchiveList`, {
    method: "POST",
    headers: {
      host: "iemb.hci.edu.sg",
      referer: "https://iemb.hci.edu.sg/",
      origin: "https://iemb.hci.edu.sg",
      "content-type": "application/x-www-form-urlencoded",
      "content-length": postData.length,
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      cookie: `__RequestVerificationToken=${veriToken};.Mozilla%2f4.0+(compatible%3b+MSIE+6.1%3b+Windows+XP);ASP.NET_SessionId=${sessionID}; AuthenticationToken=${authToken};`,
    },
    body: postData,
  }).catch((err) => {
    context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
      body: JSON.stringify({
        success: false,
        message: "Failed to fetch data",
      }),
    };
    return;
  });

  if (response.status != 200) {
    const iembHTML = parse(await response.text());

    // check if we are stuck on the sign in page (i.e. needs a token refresh)
    const needsTokenRefresh = iembHTML.querySelector(".login-page");
    if (needsTokenRefresh) {
      return (context.res = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
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
        status: 200,
        body: JSON.stringify({
          success: false,
          message: "An error occured while processing your request",
        }),
      });
    }
  }

  const data = await response.json();

  const parsedData = data.data.map((item) => {
    return {
      date: item.posttime,
      sender: item.postby,
      username: null,
      subject: item.title,
      url: `/Board/Content/${item.id}?board=${item.boardId}&isArchived=${item.isArchived}`,
      boardID: item.boardId,
      pid: item.id,
      urgency: null,
      recipient: item.groupName,
      viewCount: item.viewerCount,
      replyCount: item.responseCount,
      read: null,
    };
  });

  context.res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
    body: JSON.stringify({
      success: true,
      message: "Successfully fetched messages",
      messages: parsedData,
      totalPages: data.paging.TotalPage,
      currentPage: data.paging.CurrentPage,
    }),
  };
};
