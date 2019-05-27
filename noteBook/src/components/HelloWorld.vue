<template>
  <div class="noteBook">
    <div style="margin-bottom:20px;">
      <h1>{{ msg }}</h1>
      <h1>{{ getDate() }}</h1>
      <div>费用记事本</div>
    </div>
    <div>
      费用：<input style="width:400px;height:50px;" type="text" v-model="money">
      费用解释：<input style="width:400px;height:50px;" type="text" v-model="moneyGoto">
      <button style="background:#0f0;height:50px;width:100px;" @click="addEvent()">添加费用</button>
      <button style="background:#0f0;height:50px;width:100px;" @click="DetailEvent()">{{flagText}}费用详情</button>
    </div>
    <h3 style="margin-bottom:30px;">共花费{{num}}钱</h3>
    <div v-show="flag">
      <h4>费用详情</h4>
      <table border="1px;width:100%">
        <thead>
          <tr>  
            <th>费用</th>
            <th>花费时间</th>
            <th>花费用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>333</td>
            <td>4444</td>
            <td>222</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      moneyGoto: '',
      money: '',
      msg: 'vue记事本案例（类todoList）',
      num: 0,
      flag: false,
      flagText: '显示'
    }
  },
  methods: {
    getDate(type = '-') {
      let Time = new Date()
      function istenNum(DateNum) {
        return DateNum >= 10 ? DateNum : '0' + DateNum
      }
      return Time.getFullYear() + type + istenNum(Time.getMonth()) + type + Time.getDate() + ' ' + istenNum(Time.getHours()) + type + istenNum(Time.getMinutes()) + type + istenNum(Time.getSeconds())
    },
    addEvent() {},
    DetailEvent() {
      this.flag = !this.flag
      this.flagText = this.flag ? '隐藏' : '显示'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: yellowgreen;
}
.noteBook {
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
}
table
{
    border-collapse:collapse;
    width: 100%;
}
table,th, td
{
    border: 1px solid black;
}
td {
  text-align: center;
  background-color: yellowgreen;
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
