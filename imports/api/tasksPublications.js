import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../api/TasksCollection'

Meteor.publish('tasks', function publishTasks() {
    console.log(TasksCollection.find({ }),TasksCollection.find({ }).fetch())
    console.log('hey')
    return TasksCollection.find({ });
});