package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/Ebi-web/react-room/graph/generated"
	"github.com/Ebi-web/react-room/graph/model"
	ulid "github.com/oklog/ulid/v2"
)

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.NewTask) (*model.Task, error) {
	task := &model.Task{
		TaskID:   ulid.Make(),
		TaskName: input.TaskName,
		Status:   false,
		DueDate:  input.DueDate,
	}
	r.tasks = append(r.tasks, task)
	return task, nil
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTask) (*model.Task, error) {
	panic(fmt.Errorf("not implemented"))
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, input model.DeleteTask) (*model.Task, error) {
	panic(fmt.Errorf("not implemented"))
}

// AllTasks is the resolver for the allTasks field.
func (r *queryResolver) AllTasks(ctx context.Context) ([]*model.Task, error) {
	return r.tasks, nil
}

// TaskID is the resolver for the taskID field.
func (r *taskResolver) TaskID(ctx context.Context, obj *model.Task) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Task returns generated.TaskResolver implementation.
func (r *Resolver) Task() generated.TaskResolver { return &taskResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type taskResolver struct{ *Resolver }
