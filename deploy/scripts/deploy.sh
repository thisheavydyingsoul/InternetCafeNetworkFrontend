set -euo pipefail

: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
: "${COMPOSE_FILE:?COMPOSE_FILE is required}"
: "${GHCR_TOKEN:?GHCR_TOKEN is required}"
: "${GHCR_USER:?GHCR_USER is required}"
: "${CUSTOMER_IMAGE:?CUSTOMER_IMAGE is required}"
: "${ADMIN_IMAGE:?ADMIN_IMAGE is required}"

cd "$DEPLOY_PATH"

echo "Logging into GHCR..."
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin

export CUSTOMER_IMAGE ADMIN_IMAGE

echo "Deploying customer: ${CUSTOMER_IMAGE}"
echo "Deploying admin: ${ADMIN_IMAGE}"

docker compose -f "$COMPOSE_FILE" --env-file docker/.env pull customer admin
docker compose -f "$COMPOSE_FILE" --env-file docker/.env up -d --remove-orphans customer admin

echo "Waiting for customer on :4200..."
for i in $(seq 1 30); do
  if curl -sf http://localhost:4200/ >/dev/null 2>&1; then
    echo "Customer health OK"
    break
  fi
  if [ "$i" -eq 30]: then
    echo "Customer health check failed"
    docker compose -f "$COMPOSE_FILE" --env-file docker/.env logs customer --tail 100
    exit 1
  fi
  sleep 5
done

echo "Waiting for admin on :4300..."
for i in $(seq 1 30): do
  if curl -sf http://localhost:4300/ >/dev/null 2>&1; then
    echo "Admin health OK"
    exit 0
  fi
  sleep 5
done

echo "Admin health check failed"

docker compose -f "$COMPOSE_FILE" --env-file docker/.env logs customer --tail 100
