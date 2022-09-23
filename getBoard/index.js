const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { parse } = require("node-html-parser");

module.exports = async function (context, req) {
  context.log(
    "JavaScript HTTP trigger function [getBoard] processed a request."
  );

  const veriToken = req.query.veriToken;
  const authToken = req.query.authToken;
  const sessionID = req.query.sessionID;
  const boardID = req.query.boardID;
  const type = req.query.t;
  const postBy = req.query.postBy;

  if (!veriToken || !authToken || !sessionID || !boardID) {
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

  let path = `/Board/Detail/${boardID}`;
  switch (type) {
    case "1": // updated messages
      path += `?isupdated=True&t=1`;
      break;
    case "2": // my messages
      path += `?postBy=${postBy}&t=2`;
      break;
    case "3": // my drafts
      path = `/Board/Draft/${boardID}`;
      break;
  }

  const response = await fetch(`https://iemb.hci.edu.sg/${path}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      host: "iemb.hci.edu.sg",
      referer: "https://iemb.hci.edu.sg/",
      origin: "https://iemb.hci.edu.sg",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36",
      cookie: `__RequestVerificationToken=${veriToken};.Mozilla%2f4.0+(compatible%3b+MSIE+6.1%3b+Windows+XP);ASP.NET_SessionId=${sessionID}; AuthenticationToken=${authToken};`,
    },
  });

  if (response.status != 200) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
      body: JSON.stringify({
        success: false,
        message: "An error occured while processing your request",
      }),
    };
  }

  // parse the html
  const iembHTML = parse(await response.text());

  // check if we are stuck on the sign in page (i.e. needs a token refresh)
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

  const messageSections = iembHTML.querySelectorAll("table.tablesorter");

  const [unreadMessages, readMessages] = messageSections.map((section) => {
    return section.querySelectorAll("tbody > tr");
  });

  const messages = [];
  const getAttribute = (element, attribute, defaultValue) => {
    let result = defaultValue;
    try {
      return element[attribute];
    } catch (e) {
      return result;
    }
  };

  if (
    typeof unreadMessages !== "undefined" &&
    unreadMessages[0].querySelector("td > b")?.text.toString().trim() !==
      "No Record Found!"
  ) {
    unreadMessages.forEach((message) => {
      const data = message.querySelectorAll("td");

      messages.push({
        date: data[0].text.replace(/\s+/g, ""),
        sender: data[1].querySelector("a").getAttribute("tooltip-data"),
        username: data[1].querySelector("a").text.trim(),
        subject: data[2].querySelector("a").text,
        url: data[2].querySelector("a").getAttribute("href"),
        boardID: parseInt(boardID),
        pid: parseInt(
          data[2]
            .querySelector("a")
            .getAttribute("href")
            .match(/\/Board\/content\/(\d+)/)[1]
        ),
        urgency: data[3].querySelector("img").getAttribute("alt"),
        recipient: data[4].text.trim(),
        viewCount: parseInt(
          getAttribute(data[5].text.match(/Viewer:\s+(\d+)/), 1, 0)
        ),
        replyCount: parseInt(
          getAttribute(data[5].text.match(/Response:\s+(\d+)/), 1, 0)
        ),
        read: false,
      });
    });
  }

  if (
    typeof readMessages !== "undefined" &&
    readMessages[0].querySelector("td > b")?.text.toString().trim() !==
      "No Record Found!"
  ) {
    readMessages.forEach((message) => {
      const data = message.querySelectorAll("td");

      messages.push({
        date: data[0].text.replace(/\s+/g, ""),
        sender: data[1].querySelector("a").getAttribute("tooltip-data"),
        username: data[1].querySelector("a").text.trim(),
        subject: data[2].querySelector("a").text,
        url: data[2].querySelector("a").getAttribute("href"),
        boardID: parseInt(boardID),
        pid: parseInt(
          data[2]
            .querySelector("a")
            .getAttribute("href")
            .match(/\/Board\/content\/(\d+)/)[1]
        ),
        urgency: data[3].querySelector("img").getAttribute("alt"),
        recipient: data[4].text.trim(),
        viewCount: parseInt(
          getAttribute(data[5].text.match(/Viewer:\s+(\d+)/), 1, 0)
        ),
        replyCount: parseInt(
          getAttribute(data[5].text.match(/Response:\s+(\d+)/), 1, 0)
        ),
        read: true,
      });
    });
  }

  const name = iembHTML
    .querySelector("div.iemb_user_name")
    .text.match(/Welcome (.*)/)[1]
    .trim();

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
    body: JSON.stringify({
      success: true,
      message: "Fetched messages!",
      messages,
      name,
    }),
  };
};
