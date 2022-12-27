<template>
  <div class="excel">
<!--    <button @click="exportExcel">下载数据</button>-->
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  name: 'Intro',
  data () {
    return {
      exportData1: [
        {
          id: '韩版设计时尚风衣大',
          name: 'MPM00112',
          phone: '￥999.00',
          scanTime: 3423
        }
      ],
      exportData2: [
        {
          id: '22222',
          name: 'MPM00222',
          phone: '￥2999.00',
          scanTime: 6589
        }
      ],
      exportData: [
        [
          {
            '车架号': '888888888888888888888888888888',
            '账号': '代办',
            '订单完成时间': null,
            '费用编号': 'FEE220812184443103',
            '中标价与订单金额差': null,
            '备注': '会员提车',
            '中标价': null,
            '中标地址': null,
            '报价人员': null,
            '拖车时间': null,
            '订单金额': null,
            '类目': '中标车辆保全费',
            '中标时间': null,
            '支付情况': '未支付',
            '分公司': '内蒙古分公司',
            '拖车人': null,
            '拖车省市县': '',
            '拖车地址': null,
            '中标省市县': '',
            '保险公司': '',
            '车型': '',
            '交接方式': null,
            '申请金额': '150.00',
            '保全时长': '18:46:17',
            '车牌号': null,
            '交接时间': null,
            '发票': '无',
            '交接汇报提交时间': null
          },
          {
            '车架号': '99999999999999999999999999999999888',
            '账号': '代办',
            '订单完成时间': null,
            '费用编号': 'FEE220812184443103',
            '中标价与订单金额差': null,
            '备注': '会员提车',
            '中标价': null,
            '中标地址': null,
            '报价人员': null,
            '拖车时间': null,
            '订单金额': null,
            '类目': '中标车辆保全费',
            '中标时间': null,
            '支付情况': '未支付',
            '分公司': '内蒙古分公司',
            '拖车人': null,
            '拖车省市县': '',
            '拖车地址': null,
            '中标省市县': '',
            '保险公司': '',
            '车型': '',
            '交接方式': null,
            '申请金额': '150.00',
            '保全时长': '18:46:17',
            '车牌号': null,
            '交接时间': null,
            '发票': '无',
            '交接汇报提交时间': null
          }
        ],
        [
          {
            '车架号': null,
            '账号': '葛宝震',
            '订单完成时间': null,
            '费用编号': 'FEE220812214605100',
            '中标价与订单金额差': null,
            '备注': '',
            '中标价': null,
            '中标地址': null,
            '整备项目': '清洗外观整理内饰',
            '报价人员': null,
            '拖车时间': null,
            '订单金额': null,
            '类目': '中标车辆整备费',
            '中标时间': null,
            '支付情况': '未支付',
            '分公司': '河北分公司',
            '拖车人': null,
            '拖车省市县': '',
            '拖车地址': null,
            '中标省市县': '',
            '保险公司': '',
            '车型': '',
            '交接方式': null,
            '申请金额': '50.00',
            '车牌号': null,
            '交接时间': null,
            '发票': '无',
            '交接汇报提交时间': null
          }
        ]
      ]
    }
  },
  methods: {
    download () {
      // sheet1数据
      const sheetData1 = this.exportData1.map(item => ({
        ID: item.id,
        收件人: item.name,
        手机号: item.phone,
        扫描时间: item.scanTime
      }))
      // 支持多 sheet
      // sheet2数据
      const sheetData2 = this.exportData2.map(item => ({
        ID: item.id,
        收件人: item.name,
        手机号: item.phone,
        扫描时间: item.scanTime
      }))

      const sheet1 = XLSX.utils.json_to_sheet(sheetData1)
      // 支持多 sheet
      const sheet2 = XLSX.utils.json_to_sheet(sheetData2)

      const wb = XLSX.utils.book_new()

      // 为sheet1命名
      XLSX.utils.book_append_sheet(wb, sheet1, '收件人列表')
      // 支持多 sheet
      // wei sheet2命名
      XLSX.utils.book_append_sheet(wb, sheet2, '收件人列表2')
      // 生成Excel的配置项
      const workbookBlob = this.workbook2blob(wb)
      // 导出最后的总表
      this.openDownloadDialog(workbookBlob, '收件人列表.xlsx')
    },

    exportExcel () {
      // 创建空表格格式
      const wb = XLSX.utils.book_new()
      console.log(wb)
      this.exportData.forEach((item, index) => {
        // 转换数据格式
        const sheet = XLSX.utils.json_to_sheet(item)

        let colWidths = []
        let colNames = [] // 所有列的名称数组
        for (let i = 0; i < Object.keys(item[0]).length; i++) {
          colNames.push(Object.keys(item[0])[i])
        }

        // 计算每一列的所有单元格宽度
        item.forEach(row => { // 先遍历行
          // 列序号
          let index = 0
          // 遍历列
          for (const key in row) {
            if (colWidths[index] == null) colWidths[index] = []

            switch (typeof row[key]) {
              case 'string':
              case 'number':
              case 'boolean':
                colWidths[index].push(this.getCellWidth(row[key]))
                break
              case 'object':
              case 'function':
                colWidths[index].push(0)
                break
            }
            index++
          }
        })
        sheet['!cols'] = []
        // 每一列取最大值最为列宽
        colWidths.forEach((widths, index) => {
          // 计算列头的宽度
          widths.push(this.getCellWidth(colNames[index]))
          // 设置最大值为列宽
          sheet['!cols'].push({ wch: Math.max(...widths) })
        })

        console.log(sheet)
        // 为sheet命名
        XLSX.utils.book_append_sheet(wb, sheet, `sheet${index}`)
      })

      // 生成Excel的配置项
      const workbookBlob = this.workbook2blob(wb)
      // 导出最后的总表
      this.openDownloadDialog(workbookBlob, '费用导出text.xlsx')
    },
    getCellWidth (value) {
      // 判断是否为null或undefined
      if (value == null) {
        return 10
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        // 判断是否包含中文
        return value.toString().length * 2.1
      } else {
        return value.toString().length * 1.1
        /* 另一种方案
        value = value.toString()
        return value.replace(/[\u0391-\uFFE5]/g, 'aa').length
        */
      }
    },

    workbook2blob (workbook) {
      // 生成excel的配置项
      const wopts = {
        // 要生成的文件类型
        bookType: 'xlsx',
        // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: 'binary'
      }
      const wbout = XLSX.write(workbook, wopts)

      const blob = new Blob([this.s2ab(wbout)], {
        type: 'application/octet-stream'
      })
      return blob
    },
    // 将字符串转ArrayBuffer
    s2ab (s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    },

    openDownloadDialog (blob, fileName) {
      if (typeof blob === 'object' && blob instanceof Blob) {
        blob = URL.createObjectURL(blob) // 创建blob地址
      }
      const aLink = document.createElement('a')
      aLink.href = blob
      // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
      aLink.download = fileName || ''
      let event
      if (window.MouseEvent) event = new MouseEvent('click')
      //   移动端
      else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      }
      aLink.dispatchEvent(event)
    }
  }
}
</script>

<style scoped>

</style>
