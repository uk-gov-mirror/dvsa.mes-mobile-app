import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from '../store/journal/journal.actions';
import { JournalProvider } from '../providers/journal/journal';

@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider) {}

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    switchMap(() => {
      console.log('load journal effect');
      return this.journalProvider
        .getJournal()
        .pipe(
          map(data => this.journalProvider.extractJournalData(data)),
          map(testSlot => new journalActions.LoadJournalSuccess(testSlot)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
        // todo - remove delay pipe after testing
        .pipe(
          delay(5000)
        )
    })
  )
}
