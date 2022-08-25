package graph

import (
	"github.com/Ebi-web/react-room/graph/model"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	tasks []*model.Task
	DB    *gorm.DB
}
