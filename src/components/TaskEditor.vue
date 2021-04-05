<template>
  <div class="taskEditor">
    <h1>タスク編集</h1>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <label for="taskDescription">タスク説明</label>
        <input type="text" id="taskDiscription" class="form-control"
        placeholder="タスク説明を入力" v-model="taskDescription" required>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" v-model="taskCompleted" id="taskCompletionStatus" 
        class="form-check-input">
        <label for="taskCompletionStatus" class="form-check-label">完了済</label>
      </div>
      <div class="form-group">
        <label for="">タスク作成日: {{ taskCreationDateAndTimeOfDay}}</label>
      </div>
      <router-link :to="'/'" class="btn btn-primary">戻る</router-link>
      <button type="submit" class="btn btn-success">更新</button>
    </form>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import router from '../router'

  export default {
    setup() {
      const tasksCollection = db.collection('tasks')
      const route = useRoute()
      const taskID = route.query.taskID
      const taskDescription = ref('')
      const taskCompleted = ref(null)
      const taskCreationDateAndTimeOfDay = ref(0)

      // console.log(taskID)

      const getTask = tasksCollection.doc(taskID).get().then(doc => {
        if (doc.exists) { 
          console.log(doc.data())

          taskDescription.value = doc.data().description
          taskCompleted.value = doc.data().completed
          taskCreationDateAndTimeOfDay.value = new Date(doc.data().creationTime).toLocaleTimeString('en-US', {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
          })
        } else {
          console.log("存在しないタスクです")
        }
      }).catch(error => {
        console.log(error)
      })

      onUnmounted(getTask)

      const updateTask = () => {
        tasksCollection.doc(taskID).get().then(doc => {
          if (doc.exists) {
            doc.ref.update({
              description: taskDescription.value,
              completed: taskCompleted.value
            }).then(() => {
              console.log('正常に更新しました')
              router.push('/')
            }).catch(error => {
              console.log(error)
            })
          }else {
            console.log("存在しないタスクです")
          }
        })
      }

      return {
        taskDescription,
        taskCompleted,
        taskCreationDateAndTimeOfDay,
        updateTask
      }
    }
    
  }
</script>

<style >

</style>