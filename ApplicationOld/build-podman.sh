#!/usr/bin/env bash
pushd Backend
./mvnw clean package
popd
podman compose -f docker-compose.yml up -d --build --force-recreate
echo "Finished building with running container."
