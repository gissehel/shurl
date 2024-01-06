#!/usr/bin/env bash

database_path="/data/database.db"
log_dir="/log"

USER_ID=$(id -u)

if [ "${USER_ID}" == "0" ]
then
    if [ "${PUID}" == "" ]
    then
        export PUID="0"
    fi
    if [ "${PGID}" == "" ]
    then
        export PGID="0"
    fi
    PASSWD=$(sed -E 's/(appuser:[^:]*):[0-9]+:[0-9]+:(.*)/\1:'"${PUID}:${PGID}"':\2/' /etc/passwd)
    GROUP=$(sed -E 's/(appuser:[^:]*):[0-9]+:(.*)/\1:'"${PGID}"':\2/' /etc/group)
    echo "${PASSWD}" > /etc/passwd
    echo "${GROUP}" > /etc/group

    [ -f "${database_path}" ] && chown appuser:appuser "${database_path}"
    mkdir -p /log/nginx
    chown -R appuser:appuser "${log_dir}"
    chown -R appuser:appuser "/app" "/container" "/data"
    exec gosu appuser:appuser /container/run.sh
else
    test -r "${database_path}" || echo "Database file is not readable." && exit 1
    mkdir -p /log/nginx
    exec /container/run.sh
fi
