import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, 
  IonButton, IonList, IonLabel, IonItemSliding, IonItemOptions, 
  IonItemOption, IonToast, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonSelect, IonSelectOption, IonAlert, IonText, IonBadge
} from '@ionic/angular/standalone';

interface Expense {
  name: string;
  amount: number;
  category: string;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, FormsModule, IonToast, IonItemOption, IonItemOptions, 
    IonItemSliding, IonLabel, IonList, IonButton, IonItem, IonInput, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonAlert, IonText, IonBadge
  ],
})
export class HomePage implements OnInit {
  expenseName: string = '';
  expenseAmount: number | null = null;
  expenseCategory: string = '';
  
  expenses: Expense[] = [];
  totalExpense: number = 0;
  
  isToastOpen: boolean = false;
  toastMessage: string = '';

  isAlertOpen: boolean = false;
  deleteIndex: number = 0;


  public alertButtons = [
    {
      text: 'İptal',
      role: 'cancel'
    },
    {
      text: 'Sil',
      role: 'confirm',
      handler: () => {

        this.deleteExpense(this.deleteIndex);
      }
    }
  ];

  constructor() {}

  ngOnInit(): void {
    const data = localStorage.getItem('expenses');
    if(data !== null) {
      this.expenses = JSON.parse(data);
      this.calculateTotal();
    }
  }


  calculateTotal() {
    this.totalExpense = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      this.totalExpense += this.expenses[i].amount;
    }
  }

  addExpense() {
    if (this.expenseName === '' || this.expenseAmount === null || this.expenseCategory === '') {
      this.showToast('Lütfen tüm alanları doldurun');
      return;
    }

    const newExpense: Expense = {
      name: this.expenseName,
      amount: this.expenseAmount,
      category: this.expenseCategory,
      date: new Date().toLocaleDateString('tr-TR')
    };

    this.expenses.push(newExpense);
    
  
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.calculateTotal();

    this.expenseName = '';
    this.expenseAmount = null;
    this.expenseCategory = '';
    
    this.showToast('Harcama başarıyla eklendi');
  }

  confirmDelete(index: number) {
    this.deleteIndex = index;
    this.isAlertOpen = true; 
  }

  
  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.calculateTotal();
    this.showToast('Harcama silindi');
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

 
  getCategoryColor(category: string): string {
    switch(category) {
      case 'Market': 
        return 'success';
      case 'Ulaşım': 
        return 'tertiary';
      case 'Fatura': 
        return 'danger';
      case 'Eğlence': 
        return 'warning';
      default: 
        return 'medium';
    }
  }
}