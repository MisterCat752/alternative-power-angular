import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { STOCK_MOVES_MOCK } from '../../mock/stock-moves.mock';
import { StockMove } from '../../models/stock-move';

@Injectable({
  providedIn: 'root',
})
export class StockMovesService {
  private moves: StockMove[] = [...STOCK_MOVES_MOCK];

  getMoves() {
    return of(this.moves);
  }

  getMovesByInvoice(invoiceId: number) {
    return of(this.moves.filter((m) => m.sourceId === invoiceId));
  }
  removeMovesByInvoice(invoiceId: number) {
    this.moves = this.moves.filter((m) => m.sourceId !== invoiceId);
  }
  createMove(move: Omit<StockMove, 'id' | 'createdAt'>): StockMove {
    const newMove: StockMove = {
      ...move,
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString(),
    };

    this.moves.unshift(newMove);

    return newMove;
  }
}
