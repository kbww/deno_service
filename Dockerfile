FROM frolvlad/alpine-glibc:alpine-3.11_glibc-2.31

WORKDIR /

RUN apk update && \
    apk upgrade

RUN apk add curl

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL="/root/.deno"

ENV PATH="${DENO_INSTALL}/bin:${PATH}"

RUN deno --help