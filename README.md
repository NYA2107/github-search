
# Github User and Repository Searcher

A brief description of what this project does and who it's for


## Features

- Up to 5 Github Users Every Search
- User Github Repository List


## Demo

### Github User Search
<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanhyeHJ0NWhhMXk4dmlsMnBlMmxoenkyMDV6MG91dDZ3amR3ZndtbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O1Sp5iEnTHDNKY1qkU/giphy.gif" width=400>
- Search up to 5 users
- On Enter key search

### User Repository List
<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXc4ZG40eGUxZjF2YjAzdXMxc29pdnRsOWp1N3g1cTljdDJyYXByNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T2hxdB9OOzPimjsg7f/giphy.gif" width=400>
- Get list user's repositories
- Sort by pushed date
- On open accordion fetch (memoize fetched value)


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


