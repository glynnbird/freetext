# freetext

A layer sitting above Cloudflare KV that provides an API allowing data to be searched and indexed easily.

Here's how it works

## Deploy

Install [Terraform](https://www.terraform.io/).

Add a file called `terraform.tfvars` into the `terraform` folder:

```
cloudflare_api_token="sometoken"
cloudflare_account_id="an_account_id"
cloudflare_zone_id="a_zone_id"
cloudflare_domain="db.mydomain.com"
```

Then deploy your infrastructure:

```sh
terraform init
terraform apply
```

Make a note of your API key.

## Document format:

```js
{
  "id": "someid", // if not supplied, one will be created for you
  "index" : {
    "name": "glynn",
    "date": "2023-04-28",
  },
  "freetext": "the quick brown fox jumped over the lazy dog",
  "doc": {
    "some": "data",
    "more": "data",
    "name": "glynn",
    "date": "2023-04-28",
  },
  "metadata": {
    "yet": "more data",
    "x": 1
  }
}
```

When adding data you supply:

- `id` - an string identifier. Used as the key field. If omitted, one will be created for you.
- `index` - an object whose key/values will be indexed and will be queryable later. (optional)
- `freetext` - a string which will be indexed for freetext search (optional)
- `doc` - an object which is stored against the `id`.
- `metadata` - a small object (<1kB) which is returned with the search results

## API

### POST /docs

```sh
curl -X POST -H'Content-type:application/json' \
-d'{"id":"x","index":{"name":"glynn","date":"2020-04-28"},"freetext":"sausages fox donkey","doc":{"y":1,"name":"glynn"},"metadata":{"z":2,"name":"glynn"}}' \
https://freetext_post_docs_dev.glynnbird.workers.dev
```

### GET /docs/id

### GET /docs/_all_docs

### GET /docs/_query

### DELETE /doc/id