resource "cloudflare_workers_kv_namespace" "freetext_kv" {
  account_id = var.cloudflare_account_id
  title      = "freetext-${terraform.workspace}"
}

output "kv_id" {
  value = cloudflare_workers_kv_namespace.freetext_kv.id
}