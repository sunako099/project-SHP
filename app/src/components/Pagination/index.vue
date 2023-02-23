<template>
    <div class="pagination">
      <!-- 上面部分 -->
      <button :disabled="pageNo == 1" @click="$dispatch('getPageNo', pageNo - 1)">
        上一页
      </button>
      <button
        v-show="startNumAndEndNumber.start > 1"
        @click="$dispatch('getPageNo', 1)"
        :class="{ active: pageNo == 1 }"
      >
        1
      </button>
      <button v-show="startNumAndEndNumber.start > 2">···</button>
      <!-- 中间部分 -->
      <button
        v-for="(page, index) in startNumAndEndNumber.end"
        :key="index"
        v-show="page >= startNumAndEndNumber.start"
        @click="$dispatch('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
      <!-- 下面部分 -->
      <button v-show="startNumAndEndNumber.end < totalPage - 1">···</button>
      <button
        v-show="startNumAndEndNumber.end < totalPage"
            @click="$dispatch('getPageNo', totalPage)"
        :class="{ active: pageNo == totalPage }"
      >
        {{ totalPage }}
      </button>
      <button @click="$dispatch('getPageNo', pageNo + 1)">下一页</button>
      <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    
  };
  </script>
  
  <style scoped lang="less">
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
  
      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
  
      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active {
    background-color: skyblue;
  }
  </style>