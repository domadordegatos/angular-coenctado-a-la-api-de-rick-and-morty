import { CharacterComponent } from './character.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const myComponents = [CharacterDetailsComponent, CharacterListComponent, CharacterComponent]

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  exports: [...myComponents]
})
export class CharactersModule { }
