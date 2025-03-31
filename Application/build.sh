#!/usr/bin/env bash
pushd Backend
./mvnw clean package
docker compose up -d --build
popd
echo "Finished building with running container."
