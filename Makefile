DBUSER:=root
DBPASSWORD:=p@ssw0rd
DBPORT:=3306
DBNAME:=jaguar
# https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds
DOCKER_DNS:=db
FLYWAY_CONF?=-url=jdbc:mysql://$(DOCKER_DNS):$(DBPORT)/$(DBNAME) -user=$(DBUSER) -password=$(DBPASSWORD)
DOCKER_COMPOSE_VERSION_CHECKER := $(shell docker compose > /dev/null 2>&1 ; echo $$?)
ifeq ($(DOCKER_COMPOSE_VERSION_CHECKER), 0)
	DOCKER_COMPOSE_IMPL=docker compose
else
	DOCKER_COMPOSE_IMPL=docker-compose
endif

MIGRATION_SERVICE:=migration
.PHONY: flyway/info
flyway/info:
	$(DOCKER_COMPOSE_IMPL) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) info

.PHONY: flyway/migrate
flyway/migrate:
	$(DOCKER_COMPOSE_IMPL) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) migrate