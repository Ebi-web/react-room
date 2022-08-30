package repository

import (
	"github.com/Ebi-web/react-room/graph/model"
	"gorm.io/gorm"
)

// CreateTask creates a new task
func CreateTask(db *gorm.DB, task *model.Task) (*model.Task, error) {
	result := db.Select("task_id", "task_name", "status", "due_date").Create(task)
	if result.Error != nil {
		return nil, result.Error
	}

	return task, nil
}

// UpdateTask updates a task
func UpdateTask(db *gorm.DB, task *model.Task) (*model.Task, error) {
	result := db.Model(task).Where("task_id=?", task.TaskID).Updates(task)
	if result.Error != nil {
		return nil, result.Error
	}

	return task, nil
}

// DeleteTask deletes a task
func DeleteTask(db *gorm.DB, id string) error {
	var task model.Task
	db.Where("task_id=?", id).Delete(&task)
	return nil
}

// ListTasks returns a tasks by taskIDs
// TODO: authentication
func ListTasks(db *gorm.DB, taskIDs []string) ([]*model.Task, error) {
	var tasks []*model.Task
	err := db.Find(&tasks, taskIDs).Error
	if err != nil {
		return nil, err
	}
	return tasks, nil
}
