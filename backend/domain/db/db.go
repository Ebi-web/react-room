package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type MySQL struct {
	datasource string
}

func NewMySQL(datasource string) *MySQL {
	return &MySQL{
		datasource: datasource,
	}
}

func (db *MySQL) Open() (*gorm.DB, error) {
	return gorm.Open(mysql.Open(db.datasource), &gorm.Config{})
}
