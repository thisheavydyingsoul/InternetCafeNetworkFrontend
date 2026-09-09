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

echo "Frontend deploy complete"
