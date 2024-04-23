# Docker Network Implementation

## Implementation using Bridge Network

The Docker Compose configuration establishes two custom bridge networks: `backend-bridge` and `frontend-bridge`, each with its unique subnet. Three services are defined: `db`, `app`, and `frontend`. The `db` service employs the MongoDB image, opens port 27017, and connects to the `backend-bridge` network. The `app` service constructs an image from the local context, exposes port 3000, and relies on the `db` service. The `frontend` service constructs an image from the `../frontend` context, exposes port 8080, and associates with the `frontend-bridge` network.

### Deployment

To deploy the Docker Compose configuration:

```
docker-compose build
docker-compose up
```

## Implementation using Overlay Network

The Docker Compose configuration specifies two overlay networks: `backend-overlay` and `frontend-overlay`, each with a unique subnet range. Three services are identified: `db`, `app`, and `frontend`. The `db` service utilizes the MongoDB image, exposes port 27017, and is connected to the `backend-overlay` network. The `app` service utilizes a custom backend application image, exposes port 3000, and depends on the `db` service. The `frontend` service utilizes a custom `frontend` application image, exposes port 8080, and is connected to the `frontend-overlay` network.

### Deployment

Building Frontend Image

```
cd frontend
docker build -t frontend-app .
```

Building Backend Image

```
cd backend
docker build -t backend-app .
```

Deploying Stack

```
docker stack deploy --compose-file docker-compose-overlay.yml task-manager-stack

```

List the docker swarm services

```
docker service ls
ID             NAME                          MODE         REPLICAS   IMAGE                 PORTS
xxx   task-manager-stack_app        replicated   1/1        backend-app:latest    *:3000->3000/tcp
xxx   task-manager-stack_db         replicated   1/1        mongo:latest          *:27017->27017/tcp
xxx   task-manager-stack_frontend   replicated   1/1        frontend-app:latest   *:8080->8080/tcp
```

Overlay Network 

```
docker network ls
NETWORK ID     NAME                                  DRIVER    SCOPE
xxx   bridge                                bridge    local
xxx   docker_gwbridge                       bridge    local
xxx   host                                  host      local
xxx   ingress                               overlay   swarm
xxx   none                                  null      local
xxx   task-manager-stack_backend-overlay    overlay   swarm
xxx   task-manager-stack_frontend-overlay   overlay   swarm
```

