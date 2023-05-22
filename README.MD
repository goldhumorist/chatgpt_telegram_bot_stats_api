# ChatGPT Telegram BOT API

## Description

---

Backend service: ChatGPT-Telegram-Bot statistic API.

---

## ENV Variables

| Name                   | is required | description                              | example                       |
| ---------------------- | ----------- | ---------------------------------------- | ----------------------------- |
| #SYSTEM                |             |                                          |                               |
| NODE_ENV               | YES         | Specifies environment of application     | development, test, production |
|                        |             |                                          |                               |
| #SERVER                |             |                                          |                               |
| HOST                   | YES         | Host of server                           | localhost                     |
| PORT                   | YES         | Port of server                           | 3005                          |
|                        |             |                                          |                               |
| #Elasticsearch         |             |                                          |                               |
| ELASTICSEARCH_URL      | YES         | Connection url to Elasticsearch          | http://localhost:9200         |
| ELASTICSEARCH_APIKEY   | YES         | API key for connection to Elasticsearch  | API_KEY                       |
| ELASTICSEARCH_USERNAME | YES         | Username for connection to Elasticsearch | USERNAME                      |
| ELASTICSEARCH_PASSWORD | YES         | Password for connection to Elasticsearch | PASSWORD                      |
