export default {
  lqr: {
    check: {
      tips: "You have not yet claimed the task, please collect the task before viewing the LQR."
    },
  },
  file: {
    download: {
      target: "You have not yet claimed the task, please collect the task before viewing the target files.",
      xliff: "You have not yet claimed the task, please collect the task before viewing the XLIFF files.",
    }
  },
  status: {
    pending: "Pending",
    inProgress: "InProgress",  // 资源确认接受任务，正在完成
    inInterrupt: "InInterrupt",   // PM 发出中断，任务处于中断中
    submitted: "Submitted",   // 资源完成任务后提交，待PM审核
    submittedInterrupt: "SubmittedInterrupt", // 任务中断后，资源提交，待PM审核
    confirmed: "Confirmed",   // 资源完成任务后提交，PM确认
    confirmedInterrupt: "ConfirmedInterrupt", // 任务中断后，资源提交，PM确认
  }
};