FROM python:3-bullseye as shurl-baseos

RUN pip install -U pip && \
    apt-get -y update && \
    apt-get -y install --no-install-recommends nginx gosu vim sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f /var/log/dpkg.log && \
    rm -rf /var/log/apt && \
    rm -rf /var/cache/apt && \
    adduser --system --no-create-home --disabled-login --disabled-password --gecos '' -q --group appuser

FROM shurl-baseos as shurl-baseimage

WORKDIR /app

VOLUME ["/data"]
VOLUME ["/log"]

COPY ./src /app
COPY ./docker /container
COPY ./requirements.txt /container/requirements.txt

RUN pip install -r /container/requirements.txt && \
    chown -R appuser:appuser /app && \
    chown -R appuser:appuser /container && \
    rm -f /app/database.db && \
    ln -s /data/database.db /app/database.db && \
    rm -f /etc/nginx/nginx.conf && \
    ln -s /container/nginx.conf /etc/nginx/nginx.conf && \
    chmod 777 /var/lib/nginx && \
    chmod 777 /var/run && \
    rm -rf /var/log/nginx && \
    ln -s /log/nginx /var/log/nginx

EXPOSE 8000

CMD ["/container/start.sh"]

FROM shurl-baseimage
ARG APPTYPE

ARG VCS_REF=working-copy
ARG BUILD_DATE=now
ARG VERSION=dev

LABEL \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.authors="gissehel" \
      org.opencontainers.image.url="https://github.com/gissehel/shurl" \
      org.opencontainers.image.source="https://github.com/gissehel/shurl" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.vendor="gissehel" \
      org.opencontainers.image.ref.name="ghcr.io/gissehel/shurl-${APPTYPE}" \
      org.opencontainers.image.title="shurl-${APPTYPE}" \
      org.opencontainers.image.description="Image for shurl-${APPTYPE}" \
      org.label-schema.build-date="${BUILD_DATE}" \
      org.label-schema.vcs-ref="${VCS_REF}" \
      org.label-schema.name="shurl-${APPTYPE}" \
      org.label-schema.version="${VERSION}" \
      org.label-schema.vendor="gissehel" \
      org.label-schema.vcs-url="https://github.com/gissehel/shurl" \
      org.label-schema.schema-version="1.0" \
      maintainer="Gissehel <public-maintainer-docker-shurl@gissehel.org>"

COPY ./ui/${APPTYPE}/dist /static

ENV APPTYPE=${APPTYPE}
