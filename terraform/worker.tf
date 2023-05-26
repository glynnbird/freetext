# API key needed to access the API
resource "random_string" "apiKey" {
  length           = 20
  special          = false
  upper            = false
  lower            = true
}
output apiKey {
  value = random_string.apiKey.id
}

// index a document
resource "cloudflare_worker_script" "post_docs_worker" {
  account_id = var.cloudflare_account_id
  name       = "freetext_post_docs_${terraform.workspace}"
  content    = file("../code/dist/post_docs.js")
  module     = true

  // bind the KV service to this worker
  kv_namespace_binding {
    name         = "FREETEXT_KV"
    namespace_id = cloudflare_workers_kv_namespace.freetext_kv.id
  }
}

// search
resource "cloudflare_worker_script" "search_worker" {
  account_id = var.cloudflare_account_id
  name       = "freetext_search_${terraform.workspace}"
  content    = file("../code/dist/search.js")
  module     = true

  // bind the KV service to this worker
  kv_namespace_binding {
    name         = "FREETEXT_KV"
    namespace_id = cloudflare_workers_kv_namespace.freetext_kv.id
  }
}
