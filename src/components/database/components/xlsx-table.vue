<template>
  <div class="vue-xlsx-container">
    <div class="xlsx-div" @click="handleUploadBtnClick">
      <div style="margin:0 auto; width:210px; height:60px;">
        <Icon  type="ios-undo-outline" size="65"></Icon>
      </div>
      <div style="font-size: 18px">
        数据库<=Excel
      </div>
    </div>
    <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handkeFileChange">
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'xlsx-table',
  data () {
    return {
      rawFile: null,
      workbook: null,
      tableData: {
        header: [],
        body: []
      }
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls'
    }
  },
  computed: {
    rABS () {
      return false;
    }
  },
  methods: {
    handkeFileChange (e) {
      if (this.rawFile !== null) {
        return
      }
      this.rawFile = e.target.files[0]
      let fileTyle = this.rawFile.name.substr(this.rawFile.name.indexOf('.')+1,this.rawFile.name.length);
      if(fileTyle != 'xls' && fileTyle != 'xlsx'){
          this.$Message.error('文件格式校验错误，请选择.xls或.xlsx后缀的文件');
          return ;
      }
      this.fileConvertToWorkbook(this.rawFile)
        .then((workbook) => {
          let xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          this.workbook = workbook
          this.initTable(
            this.xlsxArrToTableArr(xlsxArr)
          )
        })
        .catch((err) => {
          this.$Message.error('文件解析失败，请检查文件格式');
          console.error(err)
        })
    },
    fileConvertToWorkbook (file) {
      let reader = new FileReader()
      let fixdata = (data) => {
        let o = "", l = 0, w = 10240
        for( ; l<data.byteLength/w ; ++l) {
          o += String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)))
        return o
      }
      return new Promise((resolve, reject) => {
        try {
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if(this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(XLSX.read(data, {type: 'binary'}))
            } else {
              /* if array buffer, convert to base64 */
              let arr = fixdata(data)
              resolve(XLSX.read(btoa(arr), {type: 'base64'}))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    xlsxArrToTableArr (xlsxArr) {
      let tableArr = []
      let length = 0
      let maxLength = 0
      let maxLengthIndex = 0
      xlsxArr.forEach((item, index) => {
        length = Object.keys(item).length
        if (maxLength < length) {
          maxLength = length
          maxLengthIndex = index
        }
      })
      let tableHeader = Object.keys(xlsxArr[maxLengthIndex])
      let rowItem = {}
      xlsxArr.forEach((item) => {
        rowItem = {}
        for (let i = 0; i < maxLength; i++) {
          rowItem[tableHeader[i]] = item[tableHeader[i]] || ''
        }
        tableArr.push(rowItem)
      })
      return {
        header: tableHeader,
        data: tableArr
      }
    },
    tableArrToXlsxArr ({data, header}) {
      let xlsxArr = []
      let tempObj = {}
      data.forEach((rowItem) => {
        tempObj = {}
        rowItem.forEach((item, index) => {
          tempObj[header[index]] = item
        })
        xlsxArr.push(tempObj)
      })
      return xlsxArr
    },
    initTable ( {data, header} ) {
      this.tableData.header = header;
      this.tableData.body = data;
      this.$emit('on-select-file',this.tableData,this.rawFile);
    },
    handleUploadBtnClick () {
      this.clearAllData()
      document.getElementById('upload-input').click()
    },
    clearAllData () {
      document.getElementById('upload-input').value = null
      this.tableData = {
        header: [],
        body: []
      }
      this.rawFile = null
      this.workbook = null
    }
  }
}
</script>

<style lang="less">
.vue-xlsx-container{
  display: inline-block;
  height: 150px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .c-hide{
    display: none;
  }
}
.xlsx-div {
  width:100%;
  height:120px;
  cursor: pointer;
  color: #dddee1;
  border: 1px dashed  #dddee1;
  text-align:center;
}
.xlsx-div:hover{
  color: #20a0ff;
  border: 1px dashed  #20a0ff;
}
</style>
