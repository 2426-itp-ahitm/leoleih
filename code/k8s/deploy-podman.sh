#!/usr/bin/env bash
set -e

TAG=$(date +"%d-%m-%y_%H-%M")

echo DELETING OLD BUILDS.....

cd ../frontend/docker
sudo rm -f -r dist || true

cd ../../backend/omnial/src/main/docker

rm -r leoleih-1.0-SNAPSHOT-runner.jar  || true

echo "----------------------------------"
echo SUCCESSFULLY DELETED
echo "----------------------------------"
echo CREATING AND MOVING BUILDS....

cd ../../../

mvn -Dnet.bytebuddy.experimental=true -DskipTests=true clean package
sudo mv ./target/leoleih-1.0-SNAPSHOT-runner.jar ./src/main/docker/

cd ../../frontend
ng build
sudo mv dist ./docker/

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND MOVED BUILDS
echo "----------------------------------"


echo BUILDING AND PUSHING FRONTEND...

cd ../frontend/docker

#docker build --no-cache . -t ghcr.io/s-stoeger/shop-frontend:latest
#docker push ghcr.io/s-stoeger/shop-frontend:latest

podman build --no-cache . -t ghcr.io/s-stoeger/shop-frontend:$TAG -t ghcr.io/s-stoeger/shop-frontend:latest
podman push ghcr.io/s-stoeger/shop-frontend:$TAG
podman push ghcr.io/s-stoeger/shop-frontend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED FRONTEND
echo "----------------------------------"

echo BUILDING AND PUSHING BACKEND....
cd ../../backend/omnial/src/main/docker

#docker build --no-cache . -t ghcr.io/s-stoeger/backend:latest
#docker push ghcr.io/s-stoeger/backend:latest
podman build --no-cache . -t ghcr.io/s-stoeger/backend:$TAG -t ghcr.io/s-stoeger/backend:latest
podman push ghcr.io/s-stoeger/backend:$TAG
podman push ghcr.io/s-stoeger/backend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED BACKEND
echo "----------------------------------"


cd ../../../../..

kubectl delete configmap nginx-config || echo "nginx-config does not yet exist"
kubectl create configmap nginx-config --from-file ./frontend/docker/default.conf

kubectl rollout restart deployment/appsrv -n "$NAMESPACE"
kubectl rollout restart deployment/nginx -n "$NAMESPACE"
kubectl rollout restart deployment/postgres -n "$NAMESPACE"
kubectl get pods
