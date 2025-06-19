
# Github User and Repository Searcher

A brief description of what this project does and who it's for


## Features

- Up to 5 Github Users Every Search
- User Github Repository List


## Demo

Insert gif or link to demo
![gambar](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjZseGFvM24zdXVzM25yM3F5a2l0NGliYjVteGxpbzdvdDNsaGw3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oC0OTMfHN3wkRKHJk0/giphy.gif)


## Installation

Install github-search with yarn

```bash
  cd github-search
  yarn
```

Run in development server

```bash
  yarn run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_URL`


## Used API Reference

#### Search github users

```http
  GET /search/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `per_page` | `number` | Page size limit |
| `q` | `string` | Name search query |

#### Get repository list by user

```http
  GET /users/{login_name}/repos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `login_name` | `string` | Github user login name |
| `per_page` | `number` | Page size limit |
| `sort` | `"created"`, `"updated"`, `"pushed"`, `"full_name"` | The property to sort the results by |


