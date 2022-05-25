# harmony-module-catalog

## Details

This is an catalog module to be used with Harmony.

## Prerequisites

The only tool required is [Docker Desktop](https://www.docker.com/products/docker-desktop).

## Usage

```yaml
# docker-compose.yaml
---

services:
  proxy:
    image: ghcr.io/applicreation/harmony-proxy:latest
    ports:
      - 80:80
  core:
    image: ghcr.io/applicreation/harmony-core:latest
    volumes:
      - ./.harmony/core:/root/.harmony:ro
  catalog:
    image: ghcr.io/applicreation/harmony-module-catalog:latest
```

```yaml
# ./.harmony/core/config.yaml
---

name: Catalog
modules:
  - name: Catalog
    url: /catalog
```

## Development

```shell
docker compose up
```
