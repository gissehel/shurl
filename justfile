docker := "docker"
extra := if docker == "docker" { "-e PUID=$(id -u) -e PGID=$(id -g)" } else { "" }

default:
    echo "Hello, Justfile!"
    echo "[{{extra}}]"

build-admin:
    {{docker}} build . -t shurl-admin --build-arg APPTYPE=admin

build-client:
    {{docker}} build . -t shurl-client --build-arg APPTYPE=client

build: build-admin build-client

client:
    mkdir -p run/log-client
    {{docker}} rm -f shurl-client || true
    {{docker}} run -d -p 8012:8000 -v "$(pwd)/database.db:/data/database.db:rw" -v "$(pwd)/run/log-client:/log:rw" {{extra}} --name shurl-client shurl-client

admin:
    mkdir -p run/log-admin
    {{docker}} rm -f shurl-admin || true
    {{docker}} run -d -p 8013:8000 -v "$(pwd)/database.db:/data/database.db:rw" -v "$(pwd)/run/log-admin:/log:rw" {{extra}} --name shurl-admin shurl-admin


local-client:
    python src/client.py

local-admin:
    python src/admin.py

run: client admin

build-all: build
    {{docker}} build . -t shurl-baseos --target shurl-baseos
    {{docker}} build . -t shurl-baseimage --target shurl-baseimage

clean: clean-cont

clean-cont:
    {{docker}} rm -f shurl-client shurl-admin || true

clean-img:
    {{docker}} rmi -f shurl-client shurl-admin shurl-baseos shurl-baseimage || true

clean-all: clean-cont clean-img
    {{docker}} container prune -f
    {{docker}} image prune -f
    {{docker}} volume prune -f
    {{docker}} network prune -f
    bash -c '[ "{{docker}}" == "docker" ] && {{docker}} buildx prune -f' || true

reset-rights:
    sudo chown -R $(id -u):$(id -g) database.db run
