module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function [ping] processed a request.");

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
    body: JSON.stringify({
      message: "wtp im alive",
      request: req,
    }),
  };
};
