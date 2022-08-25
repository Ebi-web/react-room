# generate resolvers and models based on schema.graphqls
.PHONY: gen
gen:
	go run github.com/99designs/gqlgen generate && echo "generated"
.PHONY: dev
dev:
	go run server.go