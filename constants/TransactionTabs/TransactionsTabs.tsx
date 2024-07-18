

export interface tabsProps {
  id: string;
  label: string;
  value: string;
}
 const TransactionsTabs:tabsProps[]= [
  {
    id:'trans',
    label:"Transactions",
    value:"/transactions"
  },
  {
    id:'recent-trans',
    label:"Recent Transactions",
    value:"/recent-transactions"
  },
  {
    id:"update-trans",
    label:"Update Transactions",
    value:"/update-transactions"
  },
  {
    id:"search",
    label:"Search",
    value:"/search"
  },
  {
    id:'download',
    label:"Transaction Download",
    value:"/transaction-download"
  }
];

export default TransactionsTabs;
