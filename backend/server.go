package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Ebi-web/react-room/domain/db"
	"github.com/Ebi-web/react-room/graph"
	"github.com/Ebi-web/react-room/graph/generated"
)

const defaultPort = "1027"

func main() {
	log.SetFlags(log.Ldate + log.Ltime + log.Lshortfile)
	log.SetOutput(os.Stdout)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	newDB := db.NewMySQL(os.Getenv("DATABASE_DATASOURCE"))
	con, err := newDB.Open()
	if err != nil {
		return
	}
	if con == nil {
		panic(err)
	}
	defer func() {
		//refactor this
		if con != nil {
			dbInstance, err := con.DB()
			if err != nil {
				if err := dbInstance.Close(); err != nil {
					panic(err)
				}
			}
		}
	}()
	con.Logger.LogMode(4)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: con,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
