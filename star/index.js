const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function [star] processed a request.");

  const veriToken = req.query.veriToken;
  const authToken = req.query.authToken;
  const sessionID = req.query.sessionID;
  const status = req.query.status;
  const bid = req.query.bid; // bid refers to board id
  const pid = req.query.pid; // pid refers to post id

  if (!veriToken || !authToken || !sessionID || !pid || !bid || !status) {
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

  const postData = `status=${
    status === "true" ? 1 : 0
  }&boardId=${bid}&topicid=${pid}`;
  const response = await fetch("https://iemb.hci.edu.sg/Board/ProcessFav", {
    method: "POST",
    headers: {
      host: "iemb.hci.edu.sg",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      referer: `https://iemb.hci.edu.sg/Board/content/${pid}?board=${pid}&isArchived=False`,
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      cookie: `__RequestVerificationToken=${veriToken};ASP.NET_SessionId=${sessionID}; AuthenticationToken=${authToken}`,
    },
    redirect: "manual",
    body: postData,
  });

  switch (response.status) {
    case 302:
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
    case 200:
      if ((await response.json()).IsSuccess) {
        return {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          status: 200,
          body: JSON.stringify({
            success: true,
            message: `Succesfully ${
              !!status ? "starred" : "unstarred"
            } message`,
          }),
        };
      }
    default:
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
        body: JSON.stringify({
          success: false,
          message: "An unknown error occured",
        }),
      };
  }
};
