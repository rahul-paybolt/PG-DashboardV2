import { BalanceOverviewProps as BalanceOverviewProps, CountCardProps } from "@/lib/interfaces/balance-overview";

export const BalanceOverViewData: BalanceOverviewProps[] = [
  {
    heading: "Total Initiated Volume",
    amount: 1000000,
    updated: "Last updated 1m ago",
  },
  {
    heading: "Total Success Volume",
    amount: 125030,
    updated: "Last updated 1m ago",
  },
  {
    heading: "Total Failed Volume",
    amount: 2000,
    updated: "Last updated 1m ago",
  },
  // {
  //   heading: "Bank Charge",
  //   amount: 1200,
  //   updated: "Last updated 1m ago",
  // },
];

export const CountOverViewData: CountCardProps[] = [
{
  heading: "Total Initiated Count",
  count: 100,
  updated: "Last updated 1m ago",
},
{
  heading: "Total Success Count",
  count: 120,
  updated: "Last updated 1m ago",
},
{
  heading: "Total Failed Count",
  count: 12,
  updated: "Last updated 1m ago",
},
// {
//   heading: "Bank Charges Count",
//   count: 1,
//   updated: "Last updated 1m ago",
// },
]
