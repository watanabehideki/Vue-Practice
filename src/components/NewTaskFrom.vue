<template>
  <div>
    <h1>新しいタスクを作成する</h1>
    <form @submit.prevent="createNewTask">
      <div class="form-group">
        <label for="newTaskDescription"> 新しいタスクを入力</label>
        <input type="text" class="form-control" 
        v-model='newTask.description' placeholder="新しいタスクを追加" required>
      </div>
      <button type="submit" class="btn btn-success"> 作成</button> 
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { db } from '../firebase'

  export default {
    setup(){
      const newTask = reactive({ //newTaskにオブジェクトを追加 value: input
        creationTime: null,
        description: '',
        completed: false,
      })
      const tasksCollection = db.collection('tasks') //tasksテーブルをfirestoreで作成
      const createNewTask = () => {
        tasksCollection.add({ //tasksテーブルにnewTask,creationTimeを追加
          ...newTask,
          creationTime: Date.now()
        }) 

        newTask.description = '' //入力フィームをリセットして空欄にする
      }

      return {
        newTask,
        createNewTask
      }
    }
    
  }
</script>

<style>

</style>