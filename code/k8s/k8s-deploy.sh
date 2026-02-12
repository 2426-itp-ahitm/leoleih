#!/usr/bin/env bash
set -e

# Configuration
K8S_DIR="."
NAMESPACE="student-it210195"

echo "----------------------------------"
echo "🚀 STARTING KUBERNETES DEPLOYMENT"
echo "----------------------------------"

# 1. Context Check
CURRENT_CONTEXT=$(kubectl config current-context)
echo "Current Context: $CURRENT_CONTEXT"
read -p "Deploy to this context? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment aborted."
    exit 1
fi

# 2. Apply Kubernetes configurations
echo "Applying manifests from $K8S_DIR..."

# Check if any yaml files exist to avoid "path not found" errors
if ls $K8S_DIR/*.yaml >/dev/null 2>&1; then
    kubectl apply -f $K8S_DIR/ --namespace=$NAMESPACE
else
    echo "❌ Error: No .yaml files found in $K8S_DIR"
    exit 1
fi

# 3. Force a rollout restart
echo "Restarting deployments..."
# Using '|| true' so the script doesn't crash if these aren't named exactly right yet
kubectl rollout restart deployment appsrv || true
kubectl rollout restart deployment postgres || true
kubectl rollout restart deployment nginx || true

echo "----------------------------------"
echo "✅ DEPLOYMENT COMPLETED"
echo "----------------------------------"
