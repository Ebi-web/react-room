package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/Ebi-web/react-room/domain/repository"
	"github.com/Ebi-web/react-room/graph/generated"
	"github.com/Ebi-web/react-room/graph/model"
	ulid "github.com/oklog/ulid/v2"
)

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.NewTask) (*model.Task, error) {
	task := &model.Task{
		TaskID:   ulid.Make().String(),
		TaskName: input.TaskName,
		Status:   false,
		DueDate:  input.DueDate,
	}
	newTask, err := repository.CreateTask(r.DB, task)
	if err != nil {
		return nil, err
	}

	return newTask, nil
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTask) (*model.Task, error) {
	task := &model.Task{
		TaskID:   input.TaskID,
		TaskName: input.TaskName,
		Status:   input.Status,
		DueDate:  input.DueDate,
	}
	updatedTask, err := repository.UpdateTask(r.DB, task)
	if err != nil {
		return nil, err
	}
	return updatedTask, nil
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, input model.DeleteTask) (*model.Task, error) {
	err := repository.DeleteTask(r.DB, input.TaskID)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

// ListTask is the resolver for the ListTask field.
func (r *queryResolver) ListTask(ctx context.Context, taskIDs []string) ([]*model.Task, error) {
	tasks, err := repository.ListTasks(r.DB, taskIDs)
	if err != nil {
		return nil, err
	}
	return tasks, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
