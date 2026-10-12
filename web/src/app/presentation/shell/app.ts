import { Component } from '@angular/core';
import { Toast } from 'primeng/toast';
import { Body } from '../body/body';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Body, Footer, Toast],
  templateUrl: './app.html',
  host: { class: 'flex min-h-dvh flex-col bg-slate-50 text-slate-900' },
})
export class App {}
