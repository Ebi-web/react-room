package model

type Task struct {
	TaskID   string `json:"taskID"`
	TaskName string    `json:"taskName"`
	Status   bool      `json:"status"`
	DueDate  string    `json:"dueDate"`
}
