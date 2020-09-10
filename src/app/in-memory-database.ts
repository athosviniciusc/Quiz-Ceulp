import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from "./pages/entries/shared/entry.model";
export class InMemoryDataBase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Pagamentos', description: 'Pagamentos de contas' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, Parques, praia e etc' },
      { id: 4, name: 'Salária', description: 'Recebimento de salário' },
      { id: 5, name: 'Freelas', description: 'Trabalho como freelancer' },
      { id: 6, name: 'Despesas', description: 'Despesas gerais de uma casa' },
      ];
    const entries: Entry []= [
      { id: 1, name: 'Cartão Itau', description: 'Pagamentos de cartão', types: 'revenue', categoryId: categories[1].id, category: categories[1], paid: true, date: '08/05/2020', amount: '116,03'} as Entry,
      { id: 2, name: 'Faculdade', description: 'Pagamento da faculdade', types: 'revenue', categoryId: categories[1].id, category: categories[1], paid: true, date: '08/05/2020', amount: '264,12'  } as Entry,
      { id: 3, name: 'Aluguel', description: 'Pagamento do aluguel', types: 'revenue', categoryId: categories[3].id, category: categories[3], paid: true, date: '07/05/2020', amount: '450,00' } as Entry,
      { id: 4, name: 'Energia', description: 'Pagamento da energia', types: 'revenue', categoryId: categories[2].id, category: categories[2], paid: true, date: '04/05/2020', amount: '160,00'} as Entry,
      { id: 5, name: 'Telefone', description: 'Pagamento de telefone', types: 'revenue', categoryId: categories[4].id, category: categories[4], paid: true, date: '14/05/2020', amount: '35,00' } as Entry,
      { id: 6, name: 'Internet', description: 'Pagamento de internet', types: 'expense', categoryId: categories[0].id, category: categories[0], paid: false, date: '20/05/2020',  amount: '145,00' } as Entry,
      { id: 7, name: 'Cartão BB', description: 'Pagamentos de cartão', types: 'expense', categoryId: categories[5].id, category: categories[5], paid: false, date: '20/05/2020', amount: '705,68'} as Entry,

    ];
    return { categories, entries };
  }
}

