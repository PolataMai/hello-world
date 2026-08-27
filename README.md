# Hello World CI/CD

A deliberately small Node.js HTTP service used to demonstrate a complete delivery flow:

1. develop on a feature branch;
2. test the pull request with GitHub Actions;
3. merge the reviewed change into `main`;
4. build and publish the container with Devtron CI;
5. deploy it to Kubernetes with Devtron CD.

## Run locally

```bash
npm test
npm start
```

The service listens on port `8080` by default.

Every push to `main` publishes `ghcr.io/polatamai/hello-world:latest`. Devtron
uses that public image for the deployment pipeline.

| Endpoint | Purpose | Example response |
| --- | --- | --- |
| `GET /` | Application response | `{"message":"Hello World!", ...}` |
| `GET /healthz` | Liveness and readiness check | `{"status":"ok"}` |

## Build the container

```bash
docker build -t hello-world:local .
docker run --rm -p 8080:8080 hello-world:local
```
