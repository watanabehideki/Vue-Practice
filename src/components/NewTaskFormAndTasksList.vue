<template>
<div class='newTaskFormAndTasksList'>
  <NewTaskForm />
  <TasksList />
</div>
</template>

<script>
import NewTaskForm from '../components/NewTaskFrom.vue'
import TasksList from '../components/TasksList.vue'

export default {
  name: 'App',
  components: {
    NewTaskForm,
    TasksList
  }
}
</script>

<style>

</style>