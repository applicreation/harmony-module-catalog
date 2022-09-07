# harmony-module-catalog

## Details

This is a catalog module to be used with Harmony.

## Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [git-secret](https://git-secret.io/installation)

## Usage

```yaml
# docker-compose.yaml
---

services:
  proxy:
    image: ghcr.io/applicreation/harmony-proxy:v0
    ports:
      - 80:80
  core:
    image: ghcr.io/applicreation/harmony-core:v0
    volumes:
      - ./.harmony/core:/root/.harmony:ro
  catalog:
    image: ghcr.io/applicreation/harmony-module-catalog:v0
```

```yaml
# ./.harmony/core/config.yaml
---

modules:
  - id: catalog
```

## Development

```shell
git secret init
git secret reveal
```

```shell
docker compose run --rm catalog npm install
docker compose up
```
