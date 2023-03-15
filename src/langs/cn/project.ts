export default {
  lqr: {
    check: {
      tips: "您还未领取任务，请领取任务之后才能查看LQR"
    },
  },
  file: {
    download: {
      target: "您还未领取任务，请领取任务之后才能查看当前目标文件",
      xliff: "您还未领取任务，请领取任务之后才能查看当前xliff文件",
    }
  },
  status: {
    pending: "待确认",
    inProgress: "进行中",  // 资源确认接受任务，正在完成
    inInterrupt: "中断中",   // PM 发出中断，任务处于中断中
    submitted: "审核中",   // 资源完成任务后提交，待PM审核
    submittedInterrupt: "中断审核中", // 任务中断后，资源提交，待PM审核
    confirmed: "确认中",   // 资源完成任务后提交，PM确认
    confirmedInterrupt: "中断确认中", // 任务中断后，资源提交，PM确认
  }
};