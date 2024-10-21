export interface MonthlyDashboardTransaction {
  date: string;
  payment: number;
  expanses: number;
}

export interface PieChartOne {
  top_up: number;
  expanses: number;
  subscriptionincome: number;
  subscriptionpayment: number;
}
