<template>
  <div class="tasksList">
    <h2>タスク一覧</h2>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="description">タスク</th>
          <th class="edit">編集</th>
          <th class="delete">削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id , description, completed} in tasks" :key="id">
          <td class="description" v-bind:class="{completed: completed}"
          @click='updateTaskCompletion(id)'>
            {{ description}}
          </td>
          <td>
            <router-link :to="'/editTask?taskID=' + id " class='btn btn-primary'>
            編集
            </router-link>
          </td>
          <td>
            <button @click="deleteTask(id)" class="btn btn-danger">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { db } from '../firebase'
  export default {
    setup() {
      const tasksCollection = db.collection('tasks')
      const tasks = ref([]);

      const getTasks = tasksCollection.orderBy('creationTime', 'asc').onSnapshot(
        snapshot => {
          // console.log(snapshot.docs)

          tasks.value = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
      }
      )
      onUnmounted(getTasks);

      const updateTaskCompletion = (taskID) => {
        tasksCollection.doc(taskID).get().then(
          doc => {
            if (doc.exists) {
              doc.ref.update({
                completed: !doc.data().completed,
              }).then(() => {
                console.log("正常に更新されました")
              }).catch(error => {
                console.log(error)
              })
            }else {
              console.log("存在しないタスクです")
            }
          }
        ).catch(error => {
          console.log(error)
        })
      }

      const deleteTask = (taskID) => {
        tasksCollection.doc(taskID).get().then(
          doc => {
            if (doc.exists) {
              doc.ref.delete().then(() => {
                console.log("正常に削除されました")
              }).catch(error => {
                console.log(error)
              })
            } else {
              console.log("存在しないタスクです")
            }
          }
        ).catch(error => {
          console.log(error)
        }) 
      }

      return{
        tasks,
        updateTaskCompletion,
        deleteTask
      }
    }
  }
</script>

<style>
.tasksList table th.edit,
.tasksList table th.delete {
  width: 100px;
}
.tasksList tbody td.description {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
}

</style>