create table tasks
(
    task_id    char(26) PRIMARY KEY,
    task_name  text     not null,
    due_date   date     not null,
    status     boolean  not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp
);

create table task_paths
(
    parent_task_id char(26) not null,
    child_task_id  char(26) not null,
    created_at     datetime not null default current_timestamp,
    updated_at     datetime not null default current_timestamp on update current_timestamp,
    FOREIGN KEY (parent_task_id) REFERENCES tasks (task_id),
    FOREIGN KEY (child_task_id) REFERENCES tasks (task_id),
    unique (child_task_id)
);

create table labels
(
    id char(26) PRIMARY KEY,
    name text not null,
    color text not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp
);

create table task_label
(
    task_id char(26) not null,
    label_id char(26) not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id),
    FOREIGN KEY (label_id) REFERENCES labels (id),
    unique (task_id, label_id)
);
