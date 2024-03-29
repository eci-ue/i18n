export default {
  lqr: {
    check: {
      tips: "You have not yet claimed the task, please collect the task before viewing the LQR.",
    },
  },
  file: {
    check: {
      tips: "You have not yet claimed the task, please collect the task before viewing the File.",
    },
    download: {
      target: "You have not yet claimed the task, please collect the task before viewing the target files.",
      xliff: "You have not yet claimed the task, please collect the task before viewing the XLIFF files.",
    },
    source: "Source File",
    delivery: "Delivery File",
  },
  status: {
    pending: "Pending",
    inProgress: "In Progress",  // 资源确认接受任务，正在完成
    inInterrupt: "In Interrupt",   // PM 发出中断，任务处于中断中
    submitted: "Submitted",   // 资源完成任务后提交，待PM审核
    submittedInterrupt: "Submitted Interrupt", // 任务中断后，资源提交，待PM审核
    confirmed: "Confirmed",   // 资源完成任务后提交，PM确认
    confirmedInterrupt: "Confirmed Interrupt", // 任务中断后，资源提交，PM确认
  },
  detail: {
    mtFactor: "MT Factor",
    type: "Service Type",
    workLoad: "Workload",
    initialWords: "Initial Words",
    workLoadMT: "Workload (MT factor)",
    unitPrice: "Unit Price",
    discount: "Discount",
    subtotal: "Subtotal"
  },
  label: {
    cat: "CAT tools"
  },
};