import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const list = [...this.transactions];
    // const reducerIncome = (prev: number, cur: Transaction): number => {
    //   return prev + (cur.type === 'income' ? cur.value : 0);
    // };
    // const income = list.reduce(reducerIncome, 0);
    // const reducerOutcome = (prev: number, cur: Transaction): number => {
    //   return prev + (cur.type === 'outcome' ? cur.value : 0);
    // };
    // const outcome = list.reduce(reducerOutcome, 0);

    // const balance = {
    //   income,
    //   outcome,
    //   total: income - outcome,
    // };

    const { income, outcome } = this.transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
