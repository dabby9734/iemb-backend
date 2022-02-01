# [iemb-backend](https://iemb-backend.azurewebsites.net) · [![Build and deploy Node.js project to Azure Function App - iemb-backend](https://github.com/dabby9734/iemb-backend/actions/workflows/master_iemb-backend.yml/badge.svg)](https://github.com/dabby9734/iemb-backend/actions/workflows/master_iemb-backend.yml)

This respository includes the [Azure Cloud Functions](https://azure.microsoft.com/en-us/services/functions) for the [intelligent-EMB](https://github.com/dabby9734/intelligent-EMB) website.

## Endpoints

All endpoints are prefixed with `/api`

- login: `/login`
- getPost: `/getPost`
- getBoard: `/getBoard`
- getBoardStarred: `getBoardStarred`
- getBoardArchived: `getBoardArchived`
- download: `/download`
- reply: `/reply`

## Other Notes

- You are recommended to use Visual Studio Code to code to work on this project.
- The cloud functions are Azure Cloud Functions V3, Node v14 is the recommended runtime. [Learn more](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2#node-version).
- [Learn more about Azure Cloud Functions](https://docs.microsoft.com/en-us/azure/azure-functions/)

