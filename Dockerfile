FROM node:20-alpine

LABEL org.opencontainers.image.source="https://github.com/PolataMai/hello-world" \
      org.opencontainers.image.description="Hello World service deployed through Devtron" \
      org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY --chown=node:node package.json app.js ./

ENV NODE_ENV=production \
    PORT=8080

USER node

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "app.js"]
