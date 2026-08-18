FROM node:22-alpine

ARG APP

RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json .npmrc ./
COPY packages/shared-types ./packages/shared-types
COPY apps/${APP} ./apps/${APP}

RUN pnpm install --frozen-lockfile --config.confirmModulesPureness=false

WORKDIR /app/apps/${APP}

CMD ["pnpm", "dev"]
