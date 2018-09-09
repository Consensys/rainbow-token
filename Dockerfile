FROM node:9.3

# RUN apk --no-cache add curl git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

# Build and optimize
ARG GENERATE_SOURCEMAP
ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP
RUN yarn build
RUN rm -r src

# Healthcheck
HEALTHCHECK CMD curl -f http://localhost:3000/healthcheck || exit 1

# Add labels
ARG BUILD_DATE
ARG NAME
ARG DESCRIPTION
ARG VCS_REF
ARG VERSION
LABEL org.label-schema.schema-version="1.0" \
      org.label-schema.build-date="${BUILD_DATE}" \
      org.label-schema.name="${NAME}" \
      org.label-schema.description="${DESCRIPTION}" \
      org.label-schema.vcs-ref="${VCS_REF}" \
      org.label-schema.vendor="ConsenSys France" \    
      org.label-schema.version="${VERSION}" \
      org.label-schema.docker.cmd="NODE_ENV=production docker run --rm -p 80:3000 rainbowtoken" \
      org.label-schema.docker.cmd.devel="NODE_ENV=development docker run --rm -p 80:3000 -v $(pwd):/usr/src/app rainbowtoken" \
      org.label-schema.docker.cmd.test="NODE_ENV=development docker run -it --rm -v $(pwd):/usr/src/app rainbowtoken yarn test"

# Runtime
USER node
CMD [ "node", "server" ]
