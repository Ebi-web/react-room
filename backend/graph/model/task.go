package model

import "github.com/oklog/ulid/v2"

type Task struct {
	TaskID   ulid.ULID `json:"taskID"`
	TaskName string `json:"taskName"`
	Status   bool   `json:"status"`
	DueDate  string `json:"dueDate"`
}
